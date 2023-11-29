import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth';

import PiholeLogo from '@svg/pihole-logo.svg';
import LoginForm from '@components/LoginForm';
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { withSessionSsr } from '@lib/AuthSession/index';

/**
 * Functional component for login page
 * @returns Functional Component for Login page
 */
const PageLogin: NextPage = () => (
  <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
    <Head>
      <title>Pi-hole - Login</title>
      <meta name='description' content='Pi-hole Login page' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

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

/**
 * Server side rendering function.
 *
 * If the user is logged in, it will redirect to the home page
 */
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // redirect to home page if the user is logged in
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default PageLogin;
