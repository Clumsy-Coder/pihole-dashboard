import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { green, blue, red, orange } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ISummary } from '@utils/url/upstream.types';

interface Props {
  data: ISummary | undefined;
  isLoading: boolean;
}

const Summary: React.FC<Props> = (props: Props) => {
  const defaultData: Pick<
    ISummary,
    | 'dns_queries_today'
    | 'ads_blocked_today'
    | 'ads_percentage_today'
    | 'domains_being_blocked'
    | 'unique_clients'
  > = {
    dns_queries_today: '--',
    ads_blocked_today: '--',
    ads_percentage_today: '--',
    domains_being_blocked: '--',
    unique_clients: '--',
  };
  const { data = defaultData, isLoading = true } = props;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    dns_queries_today: dnsQueriesToday,
    ads_blocked_today: adsBlockedToday,
    ads_percentage_today: adsBlockedPercentageToday,
    domains_being_blocked: domainsBeingBlocked,
    unique_clients: uniqueClients,
  } = data;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: green[900] }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>Total Queries ({uniqueClients} clients)</Typography>
            <Typography variant='h3'>{dnsQueriesToday}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: blue[900] }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>Queries blocked</Typography>
            <Typography variant='h3'>{adsBlockedToday}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: orange.A400 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>Percentage blocked</Typography>
            <Typography variant='h3'>{adsBlockedPercentageToday}%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: red[900] }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>Domains on AdLists</Typography>
            <Typography variant='h3'>{domainsBeingBlocked}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Summary;
