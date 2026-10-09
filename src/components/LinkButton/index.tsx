import fonts from '@app/fonts/fonts';
import Link from 'next/link';
import styled from 'styled-components';

const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.bg.soft};
  font-family: ${fonts.subheader.style.fontFamily};
  padding: 4px 8px;
  font-size: 16px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.softTrans};
  }

  ${({ theme }) => theme.media('sm')`
        font-size: 18px;
        padding: 8px 16px;
      `}
`;

export default LinkButton;
