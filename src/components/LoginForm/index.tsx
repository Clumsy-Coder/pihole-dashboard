import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import crypto from 'crypto';
import { Address4 } from 'ip-address';
import { useRouter } from 'next/router';

import { SessionState, usePostAuthSessionMutation } from '@redux/AuthSession';

/**
 * Render Login component
 */
const LoginForm: React.FC = () => {
  const [isIpValid, setIpValid] = useState(true);
  const [isPortValid, setPortValid] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('80');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState<SessionState['message']>('');
  const [postAuthSession, { isLoading }] = usePostAuthSessionMutation();
  const router = useRouter();

  /**
   * Check if IPv4 address is valid.
   * If it's valid, set isIpValid to true.
   * If it's NOT valid, set isIpValid to false
   *
   * Run when there's a change in IP address textfiled
   */
  const validateIp = () => {
    if (Address4.isValid(ipAddress)) {
      setIpValid(true);
    } else {
      setIpValid(false);
    }
  };

  /**
   * Check port number is valid
   * If it's valid, set isPortValid to true
   * If it's NOT valid, set isPortValid to false
   *
   * Run when there's a change in port number textfield
   */
  const validatePort = () => {
    if (port === '') {
      setPortValid(false);
    } else if (Number.isInteger(+port) && +port > 0) {
      setPortValid(true);
    } else {
      setPortValid(false);
    }
  };

  /**
   * Set 'ipAddress', 'port', 'password' when their respective textfields change.
   *
   * Call 'validateIp' when setting ipAddress
   * Call 'validatePort' when setting port
   */
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'ipAddress') {
      setIpAddress(value);
      validateIp();
    } else if (name === 'password') {
      // store password as a hash. NEVER in plain text
      const hash = value.length > 0 ? crypto.createHash('sha256').update(value).digest('hex') : '';
      setPassword(hash);
    } else if (name === 'port') {
      setPort(value);
      validatePort();
    }
  };

  /**
   * Check which key is pressed when typing in port number textfield.
   * Allow numbers, block anything else
   */
  const portOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { which } = event;

    // check the ascii value
    // Decimal 0 = 48 ascii
    // Decimal 9 = 57 ascii
    // obtained from
    //    https://thewebdev.info/2022/06/15/how-to-prevent-typing-non-numeric-characters-in-input-type-number-with-javascript/
    //
    // check if character is a non-numeric
    if (which < 48 || which > 57) {
      // stop character from appending
      event.preventDefault();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthMessage('');

    try {
      await postAuthSession({ ipAddress, password, port }).unwrap();
      // replaced `router.push('/').catch(console.error);` because it would not navigate to another page.
      // not sure why this is happening.
      router.reload()
    } catch (err: unknown) {
      setAuthMessage((err as { data: { message: string } }).data.message);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form method='POST' action='/api/auth/login' onSubmit={handleSubmit}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                autoFocus
                type='text'
                id='pihole-server-ip'
                name='ipAddress'
                placeholder='192.168.1.22'
                label='Pi-Hole IPv4 address'
                error={!isIpValid}
                {...(!isIpValid ? { helperText: 'Invalid IPv4 Address' } : {})}
                onBlur={validateIp}
                onChange={onChange}
                autoComplete='off'
                fullWidth
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                type='text'
                id='pihole-server-port'
                name='port'
                placeholder='80'
                label='Pi-Hole port number'
                onChange={onChange}
                autoComplete='off'
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '\\d*' }}
                error={!isPortValid}
                {...(!isPortValid ? { helperText: 'Must be a number' } : {})}
                value={port}
                onBlur={validatePort}
                onKeyPress={portOnKeyPress}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            required
            type='password'
            id='pihole-password'
            name='password'
            label='Password'
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <LoadingButton
            fullWidth
            variant='contained'
            type='submit'
            disabled={!ipAddress.length || !isIpValid || password.length === 0 || !isPortValid}
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
