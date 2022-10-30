/* eslint-disable no-underscore-dangle */
import { useRef, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  TimeScale,
  TooltipItem,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
// import { useRouter } from 'next/router';

import { IGetClientsOvertimeFormatted } from '@pages/api/queries/clients/overtime';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, TimeScale);

interface Props {
  data: IGetClientsOvertimeFormatted | undefined;
  isLoading: boolean;
}

const defaultData: IGetClientsOvertimeFormatted = {
  labels: [],
  datasets: [],
};

/**
 * Add padding to time number
 *
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js#L71-L73}
 */
const padNumber = (num: number) => {
  return `00${num}`.slice(-2);
};

/**
 * ChartJS Bar chart configs
 *
 * @remarks code inspired by Pi-hole
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L953-L1047}
 */
const options: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      intersect: false,
      mode: 'x',
      // yAlign: 'bottom',
      xAlign: 'right',
      itemSort: (a: TooltipItem<'bar'>, b: TooltipItem<'bar'>) => {
        return (b.raw as number) - (a.raw as number);
      },
      filter: (element: TooltipItem<'bar'>) => (element.raw as number) > 0,
      callbacks: {
        title: (tooltipTitle) => {
          const { label } = tooltipTitle[0];
          const time = label.split(':');
          const h = parseInt(time[0], 10);
          const m = parseInt(time[1], 10) || 0;
          const from = `${padNumber(h)}:${padNumber(m - 5)}:00`;
          const to = `${padNumber(h)}:${padNumber(m + 4)}:59`;
          return `Client from ${from} to ${to}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'HH:mm',
        },
        tooltipFormat: 'HH:mm',
      },
      grid: {
        color: '#36393a',
        offset: false,
        drawBorder: false,
      },
      ticks: {
        color: '#e8e6e3',
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        color: '#e8e6e3',
        precision: 0,
      },
      grid: {
        color: '#36393a',
        drawBorder: false,
      },
    },
  },
  elements: {
    line: {
      borderWidth: 0,
      spanGaps: false,
      fill: true,
    },
    point: {
      radius: 0,
      hoverRadius: 5,
      hitRadius: 5,
    },
  },
  animation: false,
  // animation: {
  //   duration: 0,
  // },
};

const QueriesOvertime: React.FC<Props> = (props: Props) => {
  const { data = defaultData, isLoading } = props;
  const chartRef = useRef();
  // const router = useRouter();
  const cardHeight = 240;
  /**
   * handle stacked bar chart onclick event.
   * Navigate to queries page to display queries of that time period
   *
   * @remarks obtained from Pi-hole
   * @see {@link https://github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L1081-L1102}
   */
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!chart) return;

    const activePoints = getElementsAtEvent(chart, event);

    if (activePoints.length > 0) {
      const { labels = [] } = data;

      // get the internal index
      const clickedElementindex = activePoints[0].index;
      // get specific label by index
      const label = labels[clickedElementindex];

      // get value by index
      const from = label / 1000 - 300;
      const until = label / 1000 + 300;
      const url = `/queries?from=${from}&until=${until}`;
      console.log(url);
      // router.push(url)
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ height: cardHeight }}>
        <Skeleton variant='rounded' height='inherit' />
      </Box>
    );
  }

  return (
    <Grid item sx={{ height: cardHeight, maxHeight: cardHeight }}>
      <Card>
        <CardContent sx={{ height: 'inherit', maxHeight: cardHeight }}>
          <Typography variant='h5'>Client activity over last 24 hours</Typography>
          <Bar
            data={data}
            options={options}
            style={{ marginBottom: 20 }}
            onClick={onClick}
            ref={chartRef}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QueriesOvertime;
