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
import {
  ITopPermittedQueries,
  ITopBlockedQueries,
  ITopClientsData,
  ITopBlockedClientsData,
} from '@utils/url/upstream.types';

/**
 * Types of queries information to display
 */
export enum QueryType {
  /**
   * Domain name Queries
   *
   * @example google.com
   * @example apple.com
   */
  DOMAIN_QUERIES = 'Domain',
  /**
   * Client name queries
   *
   * @example desktop.local|192.168.1.2
   */
  CLIENT_QUERIES = 'Client',
  /**
   * Query types
   *
   * @example A
   * @example AAAA
   * @example HTTPS
   */
  QUERY_ID = 'QueryId',
}

/**
 * Props this component receives to generate the entire table
 */
interface Props {
  /**
   * Data type the component can receive
   */
  data:
    | ITopPermittedQueries
    | ITopBlockedQueries
    | ITopClientsData
    | ITopBlockedClientsData
    | undefined;
  /**
   * Is component loading
   */
  isLoading: boolean;
  /**
   * Type of queries to display
   */
  queryType: QueryType;
  /**
   * show table as blocked queries
   */
  showBlockedQueries?: boolean;
  /**
   * title of the Material-UI Card
   */
  title: string;
}

/**
 * Interface for a table row
 */
interface ITableRowEntryProps {
  /**
   * This can be a domain or IP address
   *
   * @example reddit.com
   * @example iPad-Air.local|192.168.1.84
   */
  target: string;
  /**
   * Number of queries for this domain or IP address
   */
  hits: number;
  /**
   * Total number of queries
   */
  totalQueries: number;
  /**
   * Query type being displayed
   */
  queryType: QueryType;
  /**
   * Display the loading bar in green colour or red colour.
   * Green colour represents allowed queries.
   * Red colour represents blocked queries.
   *
   * @example showBlockedQueries = true will show in 'red' colour
   * @example showBlockedQueries = false will show in 'false' colour
   */
  showBlockedQueries: boolean;
}

// ///////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Table Row element.
 *
 * Used for generating a table row for Top Queries
 */
const TableRowEntry: React.FC<ITableRowEntryProps> = (props: ITableRowEntryProps) => {
  const { target, hits, totalQueries, showBlockedQueries, queryType } = props;
  const totalQueriesPretty = new Intl.NumberFormat().format(totalQueries);
  const hitsPretty = new Intl.NumberFormat().format(hits);
  const percentage = (hits / totalQueries) * 100;
  const percentageTooltip = `${percentage.toFixed(2)}% of ${totalQueriesPretty} top ${
    showBlockedQueries ? 'blocked' : 'permitted'
  } ${queryType} queries`;

  // if the target contains only the URL domain name, then the `targetName` will only be set.
  // if the target name is a client that contains client name and IP address, then
  //    targetName will be set as the client name
  //    ipAddress will be set as the client's ip address
  //
  // ex: target name is a URL domain
  // 'reddit.com' would be split to ['reddit.com', undefined]
  //
  // ex: target name is a client
  // 'iPad-Air.local|192.168.1.84' would be split to ['iPad-Air.local', '192.168.1.84']
  const [targetName, ipAddress] = target.split('|');

  let targetUrl;
  if (ipAddress) {
    targetUrl = `/queries?client=${ipAddress}`;
  } else {
    targetUrl = `/queries?domain=${targetName}`;
  }
  targetUrl += showBlockedQueries ? '&type=blocked' : '';

  return (
    <TableRow>
      <TableCell>
        <Link href={targetUrl}>{targetName}</Link>
      </TableCell>
      <TableCell>{hitsPretty}</TableCell>
      <TableCell>
        <Tooltip title={percentageTooltip}>
          <LinearProgress
            sx={{ height: 10, borderRadius: 0.35 }}
            variant='determinate'
            color={showBlockedQueries ? 'error' : 'success'}
            value={percentage}
          />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const defaultData:
  | ITopPermittedQueries
  | ITopBlockedQueries
  | ITopClientsData
  | ITopBlockedClientsData = {};

const TopQueriesTable: React.FC<Props> = (props: Props) => {
  const { data = defaultData, isLoading, queryType, showBlockedQueries = false, title } = props;
  const cardHeight = 440;

  if (isLoading) {
    return (
      <Box sx={{ height: cardHeight }}>
        <Skeleton variant='rounded' height='inherit' />
      </Box>
    );
  }

  const totalQueries = Object.values(data).reduce((prev, cur) => prev + cur, 0);
  let tableKey = `${queryType}`;
  tableKey += showBlockedQueries ? '-blocked' : '-permitted';

  return (
    <Grid item sx={{ height: cardHeight }}>
      <Card sx={{ height: 'inherit' }}>
        <CardContent sx={{ height: 'inherit' }}>
          <Typography variant='h5'>{title}</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>{queryType}</TableCell>
                  <TableCell>Hits</TableCell>
                  <TableCell>Frequency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([target, hits]) => (
                  <TableRowEntry
                    key={`table-row-${tableKey}-${target}`}
                    target={target}
                    hits={hits}
                    totalQueries={totalQueries}
                    showBlockedQueries={showBlockedQueries}
                    queryType={queryType}
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

TopQueriesTable.defaultProps = {
  showBlockedQueries: false,
};

export default TopQueriesTable;
