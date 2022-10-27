import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import type { NextPage } from 'next';
import Head from 'next/head';

import ForwardedDestinationsChart from '@components/Charts/ForwardDestinations';
import QueryTypesChart from '@components/Charts/QueryTypes';
import QueriesOvertimeChart from '@components/Charts/Bar/QueriesOvertime';
import Summary from '@components/Summary';
import TopAllowedDomainsTable from '@components/Tables/Domains/TopAllowedDomains';
import TopBlockedDomainsTable from '@components/Tables/Domains/TopBlockedDomains';
import TopAllowedClientsTable from '@components/Tables/Clients/TopAllowedClients';
import TopBlockedClientsTable from '@components/Tables/Clients/TopBlockedClients';
import { useGetForwardedDestinationsQuery } from '@redux/ForwardedDestinations';
import { useGetQueryTypesQuery } from '@redux/QueryTypes';
import { useGetSummaryQuery } from '@redux/Summary';
import {
  useGetTopPermittedQueriesQuery,
  useGetTopBlockedQueriesQuery,
} from '@redux/Queries/TopQueries';
import { useGetTopAllowedClientsQuery, useGetTopBlockedClientsQuery } from '@redux/Queries/Clients';
import { useGetQueriesOvertimeFormattedQuery } from '@redux/Queries/Overtime';

const Home: NextPage = () => {
  const summaryQuery = useGetSummaryQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_SUMMARY || 2000,
  });
  const forwardedDestinations = useGetForwardedDestinationsQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_FORWARDED_DESTINATIONS || 60000,
  });
  const queryTypes = useGetQueryTypesQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_QUERY_TYPES || 60000,
  });
  const topPermittedQueries = useGetTopPermittedQueriesQuery(
    process.env.NEXT_PUBLIC_NUM_ENTRIES_TOP_PERMITTED_QUERIES || 10,
    { pollingInterval: process.env.NEXT_PUBLIC_POLLING_TOP_PERMITTED_QUERIES || 10000 },
  );
  const topBlockedQueries = useGetTopBlockedQueriesQuery(
    process.env.NEXT_PUBLIC_NUM_ENTRIES_TOP_BLOCKED_QUERIES || 10,
    { pollingInterval: process.env.NEXT_PUBLIC_POLLING_TOP_BLOCKED_QUERIES || 10000 },
  );
  const topAllowedClientQueries = useGetTopAllowedClientsQuery(
    process.env.NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_ALLOWED_QUERIES || 10,
    { pollingInterval: process.env.NEXT_PUBLIC_POLLING_TOP_CLIENTS_ALLOWED_QUERIES || 10000 },
  );
  const topBlockedClientQueries = useGetTopBlockedClientsQuery(
    process.env.NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_BLOCKED_QUERIES || 10,
    { pollingInterval: process.env.NEXT_PUBLIC_POLLING_TOP_CLIENTS_BLOCKED_QUERIES || 10000 },
  );
  const queriesOvertime = useGetQueriesOvertimeFormattedQuery(undefined, {
    pollingInterval: process.env.NEXT_PUBLIC_POLLING_QUERIES_OVERTIME || 600000,
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
        <Grid xs={12}>
          <QueriesOvertimeChart data={queriesOvertime.data} isLoading={queriesOvertime.isLoading} />
        </Grid>
        <Grid xs={12} md={6}>
          <QueryTypesChart data={queryTypes.data} isLoading={queryTypes.isLoading} />
        </Grid>
        <Grid xs={12} md={6}>
          <ForwardedDestinationsChart
            data={forwardedDestinations.data}
            isLoading={forwardedDestinations.isLoading}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TopAllowedDomainsTable
            data={topPermittedQueries.data}
            isLoading={topPermittedQueries.isLoading}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TopBlockedDomainsTable
            data={topBlockedQueries.data}
            isLoading={topBlockedQueries.isLoading}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TopAllowedClientsTable
            data={topAllowedClientQueries.data}
            isLoading={topAllowedClientQueries.isLoading}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TopBlockedClientsTable
            data={topBlockedClientQueries.data}
            isLoading={topBlockedClientQueries.isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
