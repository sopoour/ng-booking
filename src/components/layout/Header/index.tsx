import React, { useEffect } from 'react';
import { css, styled } from 'styled-components';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { flexColumn, flexRow } from '@app/styles/mixins';
import useSidebar from '@app/hooks/useSidebar';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_HEIGHT = 64;

const HeaderWrapper = styled.div`
  display: flex;
  position: sticky;
  top: -1px;
  z-index: 5;
  min-height: ${HEADER_HEIGHT}px;
  padding: 8px 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  opacity: 1;
  transition: all 300ms ease-in-out;
  transform: none;
  background-color: ${({ theme }) => theme.colors.bg.default};
  backdrop-filter: ${({ theme }) => theme.filters.backdrop};

  /* ${({ theme }) => theme.media('md')`
    transform: translateY(-100%);
    opacity: 0;
  `} */
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
  align-self: flex-end;
  align-items: center;

  justify-content: center;
  ${flexColumn};
  gap: 3px;
  z-index: 100;

  ${({ theme }) => theme.media('md')`
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
  /* useEffect(() => {
    gsap.set('#burger-menu', { opacity: 0 });
    gsap.to('#burger-menu', {
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: '#mobile-header',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  }, []); */

  return (
    <HeaderWrapper aria-label="Mobile header" id="mobile-header">
      <div>Logo</div>
      <Navigation>
        <div>Item 1</div>
        <div>Item 2</div>
      </Navigation>

      <BurgerMenu onClick={setOpen} id="burger-menu">
        <Line $isActive={open} />
        <Line $isActive={open} />
        <Line $isActive={open} />
        <span className="sr-only">Menu</span>
      </BurgerMenu>
    </HeaderWrapper>
  );
};

export default Header;
