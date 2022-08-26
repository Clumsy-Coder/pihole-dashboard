import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import PiholeLogo from '@svg/pihole-logo.svg';
import LoginForm from '@components/LoginForm';

const PaperStyled = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  // width: '90%',
}));

/**
 * Functional component for login page
 * @returns Functional Component for Login page
 */
const PageLogin = () => (
  // <PaperStyled>
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
  // </PaperStyled>
);

export default PageLogin;
