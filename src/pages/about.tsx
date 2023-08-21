import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';

const About: NextPage = () => {
  return (
    <Box sx={{ paddingLeft: '5vw' }}>
      <Head>
        <title>Pi-hole - About</title>
        <meta name='description' content='Pi-hole About page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h1'>About</Typography>
        </Grid>
        <Grid>
          <br />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4' color='textSecondary'>
            Build version: {process.env.NEXT_PUBLIC_BUILD_VERSION}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4' color='textSecondary'>
            Build ID: {process.env.NEXT_PUBLIC_BUILD_ID}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4' color='textSecondary'>
            Build date: {moment.unix(process.env.NEXT_PUBLIC_BUILD_TIME).format('LLL [GMT] Z')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
