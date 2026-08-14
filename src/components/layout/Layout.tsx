import React, { FC, ReactNode, useEffect } from 'react';

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar';
import { flexColumn } from '@app/styles/mixins';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';
import theme from '@app/styles/theme';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    gsap.set('#logo', {
      scale: isHome ? 1.5 : 1,
    });
  }, [router.pathname]);

  useEffect(() => {
    if (isHome) {
      gsap.fromTo(
        '#logo',
        {
          scale: 1,
        },
        {
          scale: 1.5,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
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
          },
        },
      );
    }

    gsap.to('#header', {
      backgroundColor: theme.colors.bg.default,
      ease: 'none',
      scrollTrigger: {
        trigger: '#main',
        start: 'top 10%',
        end: 'top -2%',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isHome]);

  useEffect(() => {
    gsap.to('#header', {
      backgroundColor: theme.colors.bg.default,
      ease: 'none',
      scrollTrigger: {
        trigger: '#main',
        start: 'top 10%',
        end: 'top -5%',
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
