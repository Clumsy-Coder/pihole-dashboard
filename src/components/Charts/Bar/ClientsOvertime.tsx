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
  TimeSeriesScale,
  TooltipItem,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
// import { useRouter } from 'next/router';

import { IGetClientsOvertimeFormatted } from '@pages/api/queries/clients/overtime';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, TimeScale, TimeSeriesScale);

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
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      enabled: false,
      position: 'nearest',
      // intersect: false,
      // mode: 'x',
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
      external: (context) => {
        // code used to render tooltip differently.
        // by default the tooltip was rendered in HTML canvas.
        // since this chart has lots of users for on stacked chart element, the tooltip gets cutoff.
        // So the tooltip needs to be rendered differently. In this case, using custom tooltip
        // code obtained from
        // https://github.com/pi-hole/AdminLTE/blob/41682f17b72d3fb83837a7a08fa68b3e37cd35b7/scripts/pi-hole/js/index.js#L33-L214

        // Tooltip Element
        const { chart, tooltip } = context;
        let tooltipEl = chart.canvas.parentNode?.querySelector('div');
        // console.log(tooltip.options);

        // adding type because `tooltip.options` doesn't seem to have a type for
        // tooltip.options.bodyFont.family and tooltip.options.bodyFont.style.
        interface ITooltip {
          options: {
            bodyFont: {
              family: string;
              style: string;
            };
          };
        }

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'clients-overtime-customTooltip';
          // console.log('tooltip ID', tooltipEl.id);
          tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
          tooltipEl.style.borderRadius = `${tooltip.options.cornerRadius as number}px`;
          // tooltipEl.style.color = 'white';
          // tooltipEl.style.opacity = 1;
          tooltipEl.style.padding = `${tooltip.options.padding as string}px `;
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all .1s ease';
          // tooltipEl.style.font = tooltip.options.bodyFont.string;
          tooltipEl.style.fontFamily = (tooltip as ITooltip).options.bodyFont.family;
          tooltipEl.style.fontStyle = (tooltip as ITooltip).options.bodyFont.style;
          // tooltipEl.style.fontSize = '0.8125rem'
          tooltipEl.style.fontSize = '12px';
          // this is needed because the tooltip is showing under the pie chart
          tooltipEl.style.zIndex = '1';
          // console.log(tooltip.options.bodyFont);

          const table = document.createElement('table');
          // table.style.margin = '0px';

          tooltipEl.appendChild(table);
          chart.canvas.parentNode?.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = `0`;
          return;
        }

        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || [];
          const bodyLines = tooltip.body.map((b) => b.lines);

          const tableHead = document.createElement('thead');

          titleLines.forEach((title) => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = `0`;

            const th = document.createElement('th');
            th.style.borderWidth = `0`;
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          });

          const tableBody = document.createElement('tbody');
          // tableBody.style.margin = '10px';
          // tableBody.style.padding = '10px';
          bodyLines.forEach((tbody, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor as string;
            span.style.borderColor = colors.borderColor as string;
            span.style.outlineStyle = 'solid';
            span.style.outlineWidth = '1px';
            span.style.outlineColor = colors.backgroundColor as string;
            span.style.borderStyle = 'solid';
            span.style.borderWidth = '1px';
            span.style.borderColor = '#fff';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            // tr.style.backgroundColor = 'inherit';
            // tr.style.borderWidth = `0`;

            const td = document.createElement('td');
            // td.style.borderWidth = `0`;

            const text = document.createTextNode(tbody.join(' '));

            td.appendChild(span);
            td.appendChild(text);
            td.style.padding = '0px';
            tr.appendChild(td);
            // tr.style.margin = '0px';
            // tr.style.padding = '0px';
            tableBody.appendChild(tr);
          });

          const tableRoot = tooltipEl.querySelector('table');

          // Remove old children
          while (tableRoot?.firstChild) {
            tableRoot.firstChild.remove();
          }

          // Add new children
          tableRoot?.appendChild(tableHead);
          tableRoot?.appendChild(tableBody);
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        // Display, position, and set styles for font
        console.log(tooltip.options.padding)
        tooltipEl.style.opacity = `1`;
        tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
        tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
        // tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.fontFamily = (tooltip as ITooltip).options.bodyFont.family;
        tooltipEl.style.fontStyle = (tooltip as ITooltip).options.bodyFont.style;
        // tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
        tooltipEl.style.padding = `${tooltip.options.padding as string}px`;
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      type: 'timeseries',
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
        display: false,
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
        display: false,
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
      // eslint-disable-next-line no-console
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
