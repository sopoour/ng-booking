import React, { FC, ReactNode, useEffect } from 'react';

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar';
import { flexColumn } from '@app/styles/mixins';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

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

const Layout: FC<Props> = ({ children, className }) => {
  useEffect(() => {
    gsap.to('#logo', {
      scale: 1,
      ease: 'none',

      scrollTrigger: {
        trigger: '#main',
        start: 'top 10%',
        end: 'top 0%',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Root>
      <Sidebar>Some content</Sidebar>
      <Header />
      <MainLayout className={className} id="main">
        {children}
      </MainLayout>
      <Footer />
    </Root>
  );
};

export default Layout;
