import { createTheme } from '@mui/material/styles';
import { Theme as NivoTheme } from '@nivo/core';

// Create a theme instance.
// https://mui.com/material-ui/customization/dark-mode/
// https://mui.com/material-ui/customization/theming/
// https://mui.com/material-ui/customization/palette/
export const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/**
 * Theme colour to use for the chart
 *
 * obtained from https://github.com/pi-hole/AdminLTE/blob/126b1484903fc74dfbf26f8988d37725fe49c6ed/scripts/pi-hole/js/index.js#L14-L31
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/126b1484903fc74dfbf26f8988d37725fe49c6ed/scripts/pi-hole/js/index.js#L14-L31}
 */
export const chartThemeColours = [
  '#f56954',
  '#3c8dbc',
  '#00a65a',
  '#00c0ef',
  '#f39c12',
  '#0073b7',
  '#001f3f',
  '#39cccc',
  '#3d9970',
  '#01ff70',
  '#ff851b',
  '#f012be',
  '#8e24aa',
  '#d81b60',
  '#222222',
  '#d2d6de',
];

/**
 * Nivo charts theme.
 * This is designed to work for darktheme
 *
 * @see {@link https://nivo.rocks/guides/theming/}
 */
export const nivoChartsDarkTheme: NivoTheme = {
  // background: '#ffffff',
  textColor: '#333333',
  fontSize: 11,
  axis: {
    domain: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: '#333333',
      },
    },
    ticks: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: '#333333',
      },
    },
  },
  grid: {
    line: {
      stroke: '#dddddd',
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: '#333333',
      },
    },
    text: {
      fontSize: 11,
      fill: '#333333',
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#333333',
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: '#333333',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    link: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    outline: {
      stroke: '#000000',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    symbol: {
      fill: '#000000',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: '#ffffff',
      color: '#333333',
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
  labels: {
    text: {
      fill: `#000000`,
      fontWeight: 'bold',
    },
  },
};
