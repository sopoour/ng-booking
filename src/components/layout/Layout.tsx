import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar';
import { flexColumn } from '@app/styles/mixins';

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  ${flexColumn};
  width: 100%;
  background: url('/background.png');
  background-repeat: repeat;
  background-size: 1000px 1000px;
  background-position: top left;
  z-index: 1;

  &::before {
    content: '';
    height: 100%;
    position: absolute;
    min-height: 100vh;
    width: 100%;
    background: #250564;
    opacity: 0.4;
  }
`;

const MainLayout = styled.main`
  min-height: 100vh;
  width: 100%;
  flex: 1;
  z-index: 2;
`;

type Props = {
  children: ReactNode;
  className?: string;
};

const Layout: FC<Props> = ({ children, className }) => (
  <Root>
    <Sidebar>Some content</Sidebar>
    <Header />
    <MainLayout className={className}>{children}</MainLayout>
    <Footer />
  </Root>
);

export default Layout;
