import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default App;
