import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import type { NextPage } from 'next';
import Head from 'next/head';

import ForwardedDestinations from '@components/Charts/ForwardDestinations';
import QueryTypes from '@components/Charts/QueryTypes';
import Summary from '@components/Summary';
import { useGetForwardedDestinationsQuery } from '@redux/ForwardedDestinations';
import { useGetQueryTypesQuery } from '@redux/QueryTypes';
import { useGetSummaryQuery } from '@redux/Summary';

const Home: NextPage = () => {
  const summaryQuery = useGetSummaryQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_SUMMARY,
  });
  const forwardedDestinations = useGetForwardedDestinationsQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_FORWARDED_DESTINATIONS,
  });
  const queryTypes = useGetQueryTypesQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_QUERY_TYPES,
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
          <Summary data={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        </Grid>
        <Grid xs={12} md={6}>
          <QueryTypes data={queryTypes.data} isLoading={queryTypes.isLoading} />
        </Grid>
        <Grid xs={12} md={6}>
          <ForwardedDestinations
            data={forwardedDestinations.data}
            isLoading={forwardedDestinations.isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
