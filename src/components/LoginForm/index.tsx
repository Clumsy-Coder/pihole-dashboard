import { ChangeEvent, Component, FormEvent, KeyboardEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios, { AxiosError } from 'axios';
import crypto from 'crypto';
import { Address4 } from 'ip-address';

import { PostRequestData, PostResponseData } from '@pages/api/auth/login';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

/**
 * Login Component state props
 */
interface IState extends PostRequestData {
  /**
   * Whether the Ipv4 address provided is valid.
   * Using npm package 'ip-address' to verify
   *
   * @see {@link https://github.com/beaugunderson/ip-address}
   */
  isIpValid: boolean;
  isPortValid: boolean;
  authError: string;
  authLoading: boolean;
}

/**
 * Render Login component
 */
class LoginForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ipAddress: '',
      password: '',
      port: '80',
      isIpValid: true,
      isPortValid: true,
      authError: '',
      authLoading: false,
    };
  }

  /**
   * Check if Component state property 'ipAddress' is a valid IPv4 address.
   * If it's valid, then set Component state property 'isIpValid' to true,
   * If it's not valid, then set Component state property 'isIpValid' to false,
   *
   * Uses npm package 'ip-address to check it's a property IPv4 address
   * @see {@link https://github.com/beaugunderson/ip-address}
   */
  validateIp = () => {
    const { ipAddress } = this.state;

    if (Address4.isValid(ipAddress)) {
      this.setState({ isIpValid: true });
    } else {
      this.setState({ isIpValid: false });
    }
  };

  /**
   * Check if component state property 'port' is a valid number
   *
   * If it's valid, then set Component state property 'isPortValid' to true
   * If it's not valid, then set Component state property 'isPortValid' to false
   *
   */
  validatePort = () => {
    const { port } = this.state;

    if (port === '') {
      this.setState({ isPortValid: false });
    } else if (Number.isInteger(+port) && +port > 0) {
      this.setState({ isPortValid: true });
    } else {
      this.setState({ isPortValid: false });
    }
  };

  /**
   * Set Component state values when input text changes.
   * Sets Component state property 'ipAddress'
   * Sets Component state property 'password'
   *
   * @param event - Event when changing input value
   */
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'ipAddress') {
      this.setState({ ipAddress: value }, this.validateIp);
    } else if (name === 'password') {
      // store password as a hash. NEVER in plain text
      const hash = value.length > 0 ? crypto.createHash('sha256').update(value).digest('hex') : '';
      this.setState({ password: hash });
    } else if (name === 'port') {
      this.setState({ port: value }, this.validatePort);
    }
  };

  /**
   * Check if the key pressed is a number. Block everything else.
   * To be used ONLY on Textfield for 'port'
   *
   * @param event - Event when key is pressed
   */
  // eslint-disable-next-line class-methods-use-this
  portOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
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

  /**
   * Call api '/api/auth/login' to authenticate
   * If the authentication was successful, then redirect page to 'dashboard' (home page)
   * If the authentication has failed, display an error message
   *
   * @param event - Event when submitting form
   */
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { ipAddress, password, port } = this.state;

    event.preventDefault();

    this.setState({ authLoading: true, authError: '' });

    axios
      .post('/api/auth/login', {
        ipAddress,
        password,
        port,
      })
      .then((res) => {
        console.log(res);
        this.setState({ authLoading: false, authError: '' });
      })
      .catch((err: AxiosError<PostResponseData>) => {
        console.log(err);
        this.setState({
          authLoading: false,
          authError: err.response?.data.message ?? '',
        });
      });
  };

  render() {
    const { authLoading, authError, isPortValid, isIpValid, password, port } = this.state;

    return (
      <form method='POST' action='/api/auth/login' onSubmit={this.handleSubmit}>
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
                  onBlur={this.validateIp}
                  onChange={this.onChange}
                  autoComplete='off'
                  fullWidth
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
                  onChange={this.onChange}
                  autoComplete='off'
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '\\d*' }}
                  error={!isPortValid}
                  {...(!isPortValid ? { helperText: 'Must be a number' } : {})}
                  value={port}
                  onBlur={this.validatePort}
                  onKeyPress={this.portOnKeyPress}
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
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <LoadingButton
              fullWidth
              variant='contained'
              type='submit'
              disabled={!isIpValid || password.length === 0 || !isPortValid}
              loading={authLoading}
            >
              Log in
            </LoadingButton>
          </Grid>
          <Grid item alignSelf='center' sx={{ display: authError.length ? 12 : 'none' }}>
            <Grid>
              <Typography color='error'>{authError}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default LoginForm;
