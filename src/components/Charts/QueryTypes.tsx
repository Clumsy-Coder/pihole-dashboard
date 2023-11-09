import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';


import { nivoChartsDarkTheme, chartThemeColours } from '@utils/darkTheme';
import { IQueryTypes } from '@utils/url/upstream.types';

const ResponsivePie = dynamic(() => import('@nivo/pie').then((m) => m.ResponsivePie), {
  ssr: false,
});

interface Props {
  data: IQueryTypes | undefined;
  isLoading: boolean;
}

/**
 * Data format for Nivo Pie charts
 */
export interface PieChartDataFormat {
  /**
   * ID of the label
   */
  id: string;
  /**
   * Label of the entry to be displayed as
   */
  label: string;
  /**
   * Value of the label
   */
  value: number;
  /**
   * Colour used to display on the chart
   */
  color?: string;

  /**
   * Query ID associated to query type
   *
   * @remarks will be used by arc onClick event handler
   * @remarks will be used by legends label onClick event handler
   *
   * @example A (IPv4) is associated to 1
   * @example AAAA (IPv6) is associated to 2
   */
  queryId: number;
}

const defaultData: IQueryTypes = {
  querytypes: {},
};

const QueryTypesChart: React.FC<Props> = (props: Props) => {
  const { data, isLoading } = props;

  const formatData = (entries: IQueryTypes = defaultData): PieChartDataFormat[] => {
    return (
      Object.entries(entries.querytypes)
        // .sort((a, b) => b[1] - a[1])
        // .slice(11)
        .map(([key, value], i) => ({
          id: key.split(' ')[0],
          label: key,
          value,
          color: chartThemeColours[i % chartThemeColours.length],

          queryId: i + 1,
        }))
        .filter((e) => e.value > 0)
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ height: 400 }}>
        <Skeleton variant='rounded' height='inherit' />
      </Box>
    );
  }

  return (
    <Grid item sx={{ height: 400 }}>
      <Card sx={{ height: 'inherit' }}>
        <CardContent sx={{ height: 'inherit' }}>
          <Typography variant='h5'>Query Types</Typography>
          <ResponsivePie
            // base
            data={formatData(data)}
            margin={{ top: 0, right: 160, bottom: 20, left: 0 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            valueFormat={(value) => `${value}%`}
            //
            // style
            theme={nivoChartsDarkTheme}
            colors={{ datum: 'data.color' }}
            borderWidth={0}
            //
            // arc labels
            arcLabelsSkipAngle={15}
            arcLabelsTextColor={{ theme: 'labels.text.fill' }}
            //
            // arc link label
            enableArcLinkLabels={false}
            //
            // interactivity
            activeInnerRadiusOffset={15}
            onClick={(arcData, _event) => {
              // alert(`onClick arc: '${arcData.id}'`);
              console.log('onClick arc: ', arcData);
            }}
            //
            // legends
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 15,
                itemWidth: 90,
                itemHeight: 10,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                onClick: (legendLabel) => {
                  console.log(legendLabel);
                  // alert(`clicked on label: '${legendLabel.label}'`);
                },
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#fff',
                    },
                  },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QueryTypesChart;
