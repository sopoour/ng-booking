import { css, styled } from 'styled-components';
import Image from 'next/image';
import { flexColumn } from '@app/styles/mixins';

export const Backdrop = styled.div<{ $open?: boolean }>`
  position: fixed;
  display: none;
  display: flex;
  padding: 40px 0;
  z-index: 5;

  ${({ $open }) =>
    $open &&
    css`
      &:hover {
        cursor: pointer;
      }
      &:before {
        content: '';
        position: inherit;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(17, 22, 71, 0.1);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: block;
        z-index: -1;
      }
    `}
`;

export const Content = styled.header<{ $open?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bg.default};
  z-index: 10;
  transition: all 300ms ease-in-out;
  -webkit-transition: all 300ms ease-in-out;
  left: 0;
  transform: translate3d(-100%, 0, 0);
  -webkit-transform: translate3d(-100%, 0, 0);
  opacity: 0;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  width: 250px;
  ${({ $open }) =>
    $open &&
    css`
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      opacity: 1;
    `}/* ${({ theme }) => theme.media('md')`
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    opacity: 1; 
    padding: 80px 32px; 
    width: 300px;`} */
`;
