import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Link from '@components/Link';
import { ITopPermittedQueries } from '@utils/url/upstream.types';

interface Props {
  data: ITopPermittedQueries | undefined;
  isLoading: boolean;
}

interface ITableRowEntryProps {
  domain: string;
  hits: number;
  totalPermittedQueries: number;
}

const TableRowEntry: React.FC<ITableRowEntryProps> = (props: ITableRowEntryProps) => {
  const { domain, hits, totalPermittedQueries } = props;
  const totalQueriesPretty = new Intl.NumberFormat().format(totalPermittedQueries);
  const hitsPretty = new Intl.NumberFormat().format(hits);
  const percentage = (hits / totalPermittedQueries) * 100;
  const percentageTooltip = `${percentage.toFixed(
    2,
  )}% of ${totalQueriesPretty} top permitted queries`;
  const domainUrl = `/queries?domain=${domain}`;

  return (
    <TableRow>
      <TableCell>
        <Link href={domainUrl}>{domain}</Link>
      </TableCell>
      <TableCell>{hitsPretty}</TableCell>
      <TableCell>
        <Tooltip title={percentageTooltip}>
          <LinearProgress
            sx={{ height: 10, borderRadius: 0.35 }}
            variant='determinate'
            color='success'
            value={percentage}
          />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const defaultData: ITopPermittedQueries = {};

const TopPermittedQueriesTable: React.FC<Props> = (props: Props) => {
  const { data = defaultData, isLoading } = props;

  if (isLoading) {
    return (
      <Box sx={{ height: 440 }}>
        <Skeleton variant='rounded' height='inherit' />
      </Box>
    );
  }

  const totalPermittedQueries = Object.values(data).reduce((prev, cur) => prev + cur, 0);

  return (
    <Grid item sx={{ height: 440 }}>
      <Card sx={{ height: 'inherit' }}>
        <CardContent sx={{ height: 'inherit' }}>
          <Typography variant='h5'>Top Permitted Domains</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Domain</TableCell>
                  <TableCell>Hits</TableCell>
                  <TableCell>Frequency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([domain, hits]) => (
                  <TableRowEntry
                    key={`table-row-permitted-${domain}`}
                    domain={domain}
                    hits={hits}
                    totalPermittedQueries={totalPermittedQueries}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TopPermittedQueriesTable;
