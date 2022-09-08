import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { withIronSessionSsr } from 'iron-session/next';

import PiholeLogo from '@svg/pihole-logo.svg';
import LoginForm from '@components/LoginForm';
import { sessionOptions } from '@lib/AuthSession/index';
import { GetServerSidePropsContext } from 'next';

/**
 * Functional component for login page
 * @returns Functional Component for Login page
 */
const PageLogin = () => (
  <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
    <Grid item>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SvgIcon component={PiholeLogo} sx={{ fontSize: 200 }} inheritViewBox />
    </Grid>
    <Grid item>
      <Typography variant='h3'>Pi-Hole</Typography>
    </Grid>
    <Grid item>
      <LoginForm />
    </Grid>
  </Grid>
);

export default PageLogin;
