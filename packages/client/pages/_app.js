import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import theme from '../theme';

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Medbox</title>
            <meta name="description" content="best app in the world" />
            <link rel="icon" href="/Logo.svg" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    );
  }
}

export default MyApp;
