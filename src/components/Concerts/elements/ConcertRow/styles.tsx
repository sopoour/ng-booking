import LinkButton from '@app/components/LinkButton';
import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { flexColumn, flexRow } from '@app/styles/mixins';
import styled from 'styled-components';

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  padding: 14px 0;
  row-gap: 24px;
  width: 100%;
  ${({ theme }) => theme.media('sm')`
     display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 20px 24px;
        row-gap: 16px;
    `}
`;

export const ColumnContainer = styled.span`
  ${flexColumn};
  gap: 0px;

  p {
    margin: 0 !important;
  }
`;

export const LeftSide = styled.div`
  ${flexColumn};
  justify-content: flex-start;
  grid-template-columns: max-content max-content;
  align-items: flex-start;
  column-gap: 16px;
  row-gap: 0px;
`;

export const Button = styled(LinkButton)`
  width: 100%;
  height: max-content;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.span`
  position: relative;
  display: inline-block;
  justify-self: flex-start;
  align-self: center;
  grid-column: 1 / -1;
  width: 100%;
  > svg {
    position: absolute;
    right: -12%;
    top: -50%;
    width: 15%;
    overflow: visible;

    > path {
      fill: ${({ theme }) => theme.colors.accent.flieder};
    }
  }

  ${({ theme }) => theme.media('sm')`
        justify-self: flex-end;
        width: 50%;
        grid-column: 3;
    `};
`;

export const LocationContainer = styled.span`
  ${flexRow};
  flex-wrap: wrap;
`;

export const TicketNote = styled(Typography)`
  justify-self: center;
  align-self: center;
  font-size: 16px;
  grid-column: 1 / -1;
  font-family: ${fonts.subheader.style.fontFamily};

  ${({ theme }) => theme.media('sm')`
        font-size: 18px;
        grid-column: 3;
        justify-self: flex-end;
    `};
`;
