import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ResponsivePie } from '@nivo/pie';

import { nivoChartsDarkTheme } from '@utils/darkTheme';
import { IForwardedDestinations } from '@utils/url/upstream.types';

interface Props {
  data: IForwardedDestinations | undefined;
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
  // color?: string;
}

const defaultData: IForwardedDestinations = {
  forward_destinations: {},
};

const ForwardedDestinationsChart: React.FC<Props> = (props: Props) => {
  const { data, isLoading } = props;

  const formatData = (entries: IForwardedDestinations = defaultData): PieChartDataFormat[] => {
    return Object.entries(entries.forward_destinations).map(([key, value]) => ({
      id: key.split('|')[0],
      label: key.split('|')[0],
      value,
      // color: chartThemeColours[i % chartThemeColours.length],
    }));
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
          <Typography variant='h5'>Upstream servers</Typography>
          <ResponsivePie
            // base
            data={formatData(data)}
            margin={{ top: 0, right: 160, bottom: 20, left: 0 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            sortByValue
            valueFormat={(value) => `${value}%`}
            //
            // style
            theme={nivoChartsDarkTheme}
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
            onClick={(arcData, event) => {
              alert(`onClick arc: '${arcData.id}'`);
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
                  alert(`clicked on label: '${legendLabel.label}'`);
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

export default ForwardedDestinationsChart;
