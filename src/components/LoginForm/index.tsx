/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import crypto from 'crypto';
import { Address4 } from 'ip-address';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { SessionState, usePostAuthSessionMutation } from '@redux/AuthSession';

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
  // const [isIpValid, setIpValid] = useState(true);
  // const [isPortValid, setPortValid] = useState(true);
  // const [ipAddress, setIpAddress] = useState('');
  // const [port, setPort] = useState('80');
  // const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState<SessionState['message']>('');
  const [postAuthSession, { isLoading }] = usePostAuthSessionMutation();
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

  /**
   * Check if IPv4 address is valid.
   * If it's valid, set isIpValid to true.
   * If it's NOT valid, set isIpValid to false
   *
   * Run when there's a change in IP address textfiled
   */
  // const validateIp = () => {
  //   if (Address4.isValid(ipAddress)) {
  //     setIpValid(true);
  //   } else {
  //     setIpValid(false);
  //   }
  // };

  /**
   * Check port number is valid
   * If it's valid, set isPortValid to true
   * If it's NOT valid, set isPortValid to false
   *
   * Run when there's a change in port number textfield
   */
  // const validatePort = () => {
  //   if (port === '') {
  //     setPortValid(false);
  //   } else if (Number.isInteger(+port) && +port > 0) {
  //     setPortValid(true);
  //   } else {
  //     setPortValid(false);
  //   }
  // };

  /**
   * Set 'ipAddress', 'port', 'password' when their respective textfields change.
   *
   * Call 'validateIp' when setting ipAddress
   * Call 'validatePort' when setting port
   */
  // const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //
  //   if (name === 'ipAddress') {
  //     setIpAddress(value);
  //     validateIp();
  //   } else if (name === 'password') {
  //     // store password as a hash. NEVER in plain text
  //     const hash = value.length > 0 ? crypto.createHash('sha256').update(value).digest('hex') : '';
  //     setPassword(hash);
  //   } else if (name === 'port') {
  //     setPort(value);
  //     validatePort();
  //   }
  // };

  /**
   * Check which key is pressed when typing in port number textfield.
   * Allow numbers, block anything else
   */
  // const portOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
  //   const { which } = event;
  //
  //   // check the ascii value
  //   // Decimal 0 = 48 ascii
  //   // Decimal 9 = 57 ascii
  //   // obtained from
  //   //    https://thewebdev.info/2022/06/15/how-to-prevent-typing-non-numeric-characters-in-input-type-number-with-javascript/
  //   //
  //   // check if character is a non-numeric
  //   if (which < 48 || which > 57) {
  //     // stop character from appending
  //     event.preventDefault();
  //   }
  // };

  // const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setAuthMessage('');
  //
  //   try {
  //     await postAuthSession({ ipAddress, password, port }).unwrap();
  //     // replaced `router.push('/').catch(console.error);` because it would not navigate to another page.
  //     // not sure why this is happening.
  //     router.reload()
  //   } catch (err: unknown) {
  //     setAuthMessage((err as { data: { message: string } }).data.message);
  //   }
  // };

  const onSubmit = async (data: FormValues) => {
    const { ipAddress, port, password } = data;
    console.log(data);

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    console.log('hashedPassword', hashedPassword);

    try {
      await postAuthSession({ ipAddress, password: hashedPassword, port: `${port}` }).unwrap();
      // replaced `router.push('/').catch(console.error);` because it would not navigate to another page.
      // not sure why this is happening.
      // router.push('/').catch(console.error);
      router.reload();
    } catch (err: unknown) {
      setAuthMessage((err as { data: { message: string } }).data.message);
    }
  };

  console.log(`isDirty: ${isDirty}`, `isValid: ${isValid}`);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form method='POST' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                // required
                // autoFocus
                // type='text'
                // id='pihole-server-ip'
                // name='ipAddress'
                // placeholder='192.168.1.22'
                // label='Pi-Hole IPv4 address'
                // error={!isIpValid}
                // {...(!isIpValid ? { helperText: 'Invalid IPv4 Address' } : {})}
                // onBlur={validateIp}
                // onChange={onChange}
                // autoComplete='off'
                // fullWidth
                // inputProps={{ inputMode: 'numeric' }}

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
                // required
                // type='text'
                // id='pihole-server-port'
                // name='port'
                // placeholder='80'
                // label='Pi-Hole port number'
                // onChange={onChange}
                // autoComplete='off'
                // fullWidth
                // inputProps={{ inputMode: 'numeric', pattern: '\\d*' }}
                // error={!isPortValid}
                // {...(!isPortValid ? { helperText: 'Must be a number' } : {})}
                // value={port}
                // onBlur={validatePort}
                // onKeyPress={portOnKeyPress}

                label='Pi-Hole port number'
                type='text'
                {...register('port', {
                  required: 'Port number is required',
                  // validate: {
                  //   isRequired: (fieldValue) => {
                  //     return fieldValue.length === 0;
                  //   },
                  // },
                })}
                error={!!errors.port}
                helperText={errors.port?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            // required
            // type='password'
            // id='pihole-password'
            // name='password'
            // label='Password'
            // onChange={onChange}
            // fullWidth

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
            loading={isLoading}
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
