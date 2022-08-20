import { CacheProvider, EmotionCache } from '@emotion/react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import AppBar from '@components/AppBar';
import { drawerWidth } from '@components/Drawer';
import darkTheme from '@utils/darkTheme';
import createEmotionCache from '@utils/emotionCache';

// rendering server and client side CSS
// obtained from
// https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
//
// Check
// https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta name='viewport' content='initial-scale=1, width=device-width' />
    </Head>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <Toolbar /> {/* Used as a spacer for the AppBar. Has no functional use */}
      {/* offset the entire main content by the drawerWidth set in AppBar.tsx */}
      <Box component='main' sx={{ ml: { lg: `${drawerWidth}px` } }}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  </CacheProvider>
);

export default App;
