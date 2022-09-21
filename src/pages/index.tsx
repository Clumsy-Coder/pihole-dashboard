import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import type { NextPage } from 'next';
import Head from 'next/head';

import Summary from '@components/Summary';
import { useGetSummaryQuery } from '@redux/Summary';

const Home: NextPage = () => {
  const { data: summaryData } = useGetSummaryQuery(undefined, { pollingInterval: 2 * 1000 });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Pi-hole - Dashboard</title>
        <meta name='description' content='Pi-hole Dashboard page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid container spacing={2}>
        <Grid xs={12}>
          <Summary data={summaryData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
