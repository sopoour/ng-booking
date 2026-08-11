import React from 'react';
import { css, styled } from 'styled-components';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { flexColumn, flexRow } from '@app/styles/mixins';
import useSidebar from '@app/hooks/useSidebar';
import AudioPlayer from '@app/components/AudioPlayer';
import LangToggle from '@app/components/LangToggle';
import fonts from '@app/fonts/fonts';
import Typography from '@app/components/Typography/Typography';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_HEIGHT = 64;

const HeaderWrapper = styled.div`
  ${flexColumn}
  position: sticky;
  top: -1px;
  z-index: 5;
  min-height: ${HEADER_HEIGHT}px;
  background-color: transparent;
  padding: 16px 24px;
  /*  backdrop-filter: ${({ theme }) => theme.filters.backdrop}; */
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
  opacity: 1;
  transition: all 300ms ease-in-out;
  transform: none;

  ${({ theme }) => theme.media('xs')`
    gap: 24px;
  `}
`;

const LogoHeader = styled.span`
  padding: 4px 24px;
  justify-content: center;
  align-items: center;
  scale: 1.5;

  ${Typography} {
    font-size: 28px;
    font-family: ${fonts.header.style.fontFamily};
    text-align: center;
    line-height: 1;
  }

  ${({ theme }) => theme.media('sm')`
    ${Typography} {
      font-size: 48px;
    }
  `}
`;

const Line = styled.span<{ $isActive: boolean }>`
  width: 18px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.fg.default};
  display: block;
  margin: 0 auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(1) {
        -webkit-transform: translateY(6px) rotate(45deg);
        -ms-transform: translateY(6px) rotate(45deg);
        -o-transform: translateY(6px) rotate(45deg);
        transform: translateY(6px) rotate(45deg);
      }

      &:nth-child(3) {
        -webkit-transform: translateY(-4px) rotate(-45deg);
        -ms-transform: translateY(-4px) rotate(-45deg);
        -o-transform: translateY(-4px) rotate(-45deg);
        transform: translateY(-4px) rotate(-45deg);
      }
    `}
`;

const BurgerMenu = styled.button`
  padding: 8px;
  width: 35px;
  height: 35px;
  align-items: center;

  justify-content: center;
  ${flexColumn};
  gap: 3px;
  z-index: 100;

  ${({ theme }) => theme.media('sm')`
    display: none;
  `}
`;

const Navigation = styled.div`
  display: none;

  ${({ theme }) => theme.media('md')`
    ${flexRow}
    gap: 12px;
  `}
`;

const Header: React.FC = () => {
  const { open, setOpen } = useSidebar((state) => state);

  return (
    <HeaderWrapper aria-label="Header" id="header">
      <TopHeader>
        <AudioPlayer />
        <LangToggle />

        {/*  <BurgerMenu onClick={setOpen} id="burger-menu">
          <Line $isActive={open} />
          <Line $isActive={open} />
          <Line $isActive={open} />
          <span className="sr-only">Menu</span>
        </BurgerMenu> */}
      </TopHeader>
      <LogoHeader id="logo">
        <Typography>NG-Booking</Typography>
      </LogoHeader>
    </HeaderWrapper>
  );
};

export default Header;
