import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@app/components/layout/Layout';
import { GlobalStyle } from '@app/styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '@app/styles/theme';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  // TODO: Change description and title
  const metaDescription = 'Sophias portfolio description';
  const metaTitle = 'Sophias website';
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8" />
        <meta key="name" itemProp="name" content={metaTitle} />
        <meta key="description" name="description" content={metaDescription} />
        <meta key="og:title" property="og:title" content={metaTitle} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:description" property="og:description" content={metaDescription} />
        <meta key="og:site_name" property="og:site_name" content="Sophia Auer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
