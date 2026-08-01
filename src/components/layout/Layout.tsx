import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar';

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.main`
  max-width: 1000px;
  padding: 48px 20px;
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <Root>
    <Sidebar>Some content</Sidebar>
    <Header />
    <MainLayout>{children}</MainLayout>
    <Footer />
  </Root>
);

export default Layout;
