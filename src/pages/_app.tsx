import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@app/components/layout/Layout';
import { GlobalStyle } from '@app/styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '@app/styles/theme';
import '@mantine/core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { MantineProvider } from '@mantine/core';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <MantineProvider withGlobalClasses withCssVariables forceColorScheme="light">
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default App;
