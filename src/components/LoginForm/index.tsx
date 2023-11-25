import { useState } from 'react';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import crypto from 'crypto';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { SessionState, usePostAuthSessionMutation } from '@redux/AuthSession';
import { providerName } from '@pages/api/auth/[...nextauth]';
import { useAppDispatch } from '@redux/store';
import api, { TagTypes } from '@redux/apiSlice';

type FormValues = {
  ipAddress: string;
  password: string;
  port: number;
};

/**
 * Schema used for validating the login form using `zod`
 *
 * @see {@link https://www.youtube.com/watch?v=RdnJ5UP3HhY&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=30&pp=iAQB}
 */
const schema = z.object({
  ipAddress: z
    .string()
    .min(1, 'IPv4 address is required')
    .ip({ version: 'v4', message: 'Invalid IPv4' }),
  port: z
    .number({ invalid_type_error: 'Must be a number', coerce: true })
    .positive('Port must be greater than 0'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Render Login component
 */
const LoginForm: React.FC = () => {
  const [authMessage, setAuthMessage] = useState<SessionState['message']>('');
  // const [postAuthSession, { isLoading }] = usePostAuthSessionMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<FormValues>({
    // https://react-hook-form.com/docs/useform#defaultValues
    defaultValues: {
      port: 80,
    },
    // using zod as a validator
    // https://www.youtube.com/watch?v=RdnJ5UP3HhY&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=30&pp=iAQB
    resolver: zodResolver(schema),
    // when to validate
    // https://react-hook-form.com/docs/useform#mode
    mode: 'all',
  });

  const { handleSubmit, register, formState } = form;
  const {
    errors, // validations errors returned. Used to display error messages
    isDirty, // true if data has changed.
    isValid, // true if all validations has passed
  } = formState;

  const onSubmit = async (data: FormValues) => {
    const { ipAddress, port, password } = data;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
      // await postAuthSession({ ipAddress, password: hashedPassword, port: `${port}` }).unwrap();
      // replaced `router.push('/').catch(console.error);` because it would not navigate to another page.
      // not sure why this is happening.
      // router.push('/').catch(console.error);
      // router.reload();

      const res = await signIn(providerName, {
        ipAddress,
        port,
        password: hashedPassword,
        redirect: false,
      });

      console.log('signIn result: ', res);
      // if auth fail
      if (res && !res.ok) {
        setAuthMessage(res.error as string);
      } else {
        setAuthMessage('');

        // this is needed to update the RTK query cache when logging out.
        // since logging out is now handled by NextAuth, RTK query needs to invalidate the cached tag `AUTH`.
        // This will cause RTK query hook for getting session to refetch from the api
        //
        // obtained from
        // https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#general-updates
        dispatch(api.util.invalidateTags([TagTypes.AUTH]));

        await router.push('/').catch(console.error);
      }
    } catch (err: unknown) {
      setAuthMessage((err as { data: { message: string } }).data.message);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form method='POST' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                label='Pi-Hole IPv4 address'
                type='text'
                {...register('ipAddress', { required: 'IPv4 address is required' })}
                error={!!errors.ipAddress}
                helperText={errors.ipAddress?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Pi-Hole port number'
                type='text'
                {...register('port', { required: 'Port number is required' })}
                error={!!errors.port}
                helperText={errors.port?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            label='Password'
            type='password'
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
        </Grid>
        <Grid item>
          <LoadingButton
            fullWidth
            variant='contained'
            type='submit'
            disabled={!isDirty || !isValid}
            // loading={isLoading}
          >
            Log in
          </LoadingButton>
        </Grid>
        <Grid item alignSelf='center' sx={{ display: authMessage.length ? 12 : 'none' }}>
          <Grid>
            <Typography color='error'>{authMessage}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
