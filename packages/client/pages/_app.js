<<<<<<< HEAD
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
  <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
  </SessionProvider>
)
=======
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
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    );
  }
>>>>>>> e29119b79b2a80b08b1dce981098ed03ef273349
}

export default MyApp;
