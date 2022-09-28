import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import type { NextPage } from 'next';
import Head from 'next/head';

import ForwardedDestinations from '@components/Charts/ForwardDestinations';
import Summary from '@components/Summary';
import { useGetForwardedDestinationsQuery } from '@redux/ForwardedDestinations';
import { useGetSummaryQuery } from '@redux/Summary';

const Home: NextPage = () => {
  const { data: summaryData, isLoading: summaryIsLoading } = useGetSummaryQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_SUMMARY,
  });
  const { data: forwardedDestinationData, isLoading: forwardedDestinationsIsLoading } =
    useGetForwardedDestinationsQuery(undefined, {
      pollingInterval: process.env.NEXT_PUBLIC_POLLING_FORWARDED_DESTINATIONS,
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Pi-hole - Dashboard</title>
        <meta name='description' content='Pi-hole Dashboard page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid container spacing={2}>
        <Grid xs={12}>
          <Summary data={summaryData} isLoading={summaryIsLoading} />
        </Grid>
        <Grid xs={12} md={6}>
          <ForwardedDestinations
            data={forwardedDestinationData}
            isLoading={forwardedDestinationsIsLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
