import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetAllQueriesQuery } from '@redux/Queries';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const QueriesPage: NextPage = () => {
  const router = useRouter();

  const query = router.query || {};
  console.log(router.query);
  const {
    numEntries = undefined,
    from = undefined,
    until = undefined,
    client = undefined,
    domain = undefined,
    queryType = undefined,
    forwardDest = undefined,
    type = undefined,
  } = router.query;
  let showingQueries: string; // text that contains which queries are being displayed

  console.log({
    numEntries,
    from,
    until,
    client,
    domain,
    queryType,
    forwardDest,
    type,
  });

  // page params
  // type: blocked or allowed queries
  // client: client's ip address
  // forwarddest: destination forwarded to
  // queryType: query types. Ex: A, AAAA, HTTPS
  // domain: URL of the query
  // from: filter queries from a specific time
  // to: filter queries to a specific time
  //

  // return (
  //   <div>
  //     <h1>queries page</h1>
  //     {Object.entries(router.query).map(([key, value], i) => (
  //       <div key={`query-${i}`}>
  //         <h2>
  //           {key}: {value}
  //         </h2>
  //         {/* <br /> */}
  //       </div>
  //     ))}
  //   </div>
  // );

  if (client) {
    if (type && type === 'blocked') {
      showingQueries = `blocked queries for client ${client}`;
    } else {
      showingQueries = `all queries for client ${client}`;
    }
  } else if (forwardDest) {
    if (forwardDest === 'blocked') {
      showingQueries = `queries blocked by Pi-hole`;
    } else if (forwardDest === 'cached') {
      showingQueries = `queries answered from cache`;
    } else {
      showingQueries = `queries for upstream destination ${forwardDest}`;
    }
  } else if (queryType) {
    showingQueries = `type ${queryType} queries`;
  } else if (domain) {
    showingQueries = `queries from domain ${domain}`;
  } else if (from || until) {
    showingQueries = `queries within specified time interval`;
  } else {
    showingQueries = `all queries within the Pi-hole log`;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Pi-hole - Queries</title>
        <meta name='description' content='Pi-hole Queries page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Card sx={{ padding: 2 }}>
            <Typography variant='h4'>Recent Queries ({showingQueries})</Typography>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card sx={{ padding: 2 }}>
            <kbd>testing</kbd>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QueriesPage;
