import LinkButton from '@app/components/LinkButton';
import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { Konzert } from '@app/services/graphql/types';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { ISOToDate, ISOToDay, ISOToMonthYear } from '@app/utils/formatDate';
import { FC } from 'react';
import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';
import TextWithLine from '@app/components/TextWithLine';
import CornerLines from '@app/assets/drawings/corner-lines.svg';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';
import {
  Button,
  ButtonContainer,
  ColumnContainer,
  LeftSide,
  LocationContainer,
  RowContainer,
  TicketNote,
} from './styles';

type Props = {
  concert: Konzert;
};

const ConcertRow: FC<Props> = ({ concert }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDesktop = useMedia(Breakpoints.sm);
  return (
    <RowContainer>
      <ColumnContainer>
        <Typography fontSize="32px" fontSizeSm="48px" type={fonts.header.style.fontFamily}>
          {concert.datum && ISOToDay(concert.datum)}
        </Typography>
        <Typography fontSize="16px" fontSizeSm="20px" type={fonts.subheader.style.fontFamily}>
          {concert.datum && ISOToMonthYear(concert.datum)}
        </Typography>
      </ColumnContainer>

      <LeftSide>
        <Typography fontSize="32px" fontSizeSm="52px" type={fonts.header.style.fontFamily}>
          {concert.artistName}
        </Typography>
        <LocationContainer>
          <TextWithLine lineType={3} fontSize="14px" fontSizeSm="24px" lineWidth={'80%'}>
            {concert.venue} ・
          </TextWithLine>
          <Typography fontSize="14px" fontSizeSm="24px">
            {concert.location}
          </Typography>
        </LocationContainer>
      </LeftSide>
      {(concert.ticketLink || concert.ticketNote) &&
        (concert.ticketLink ? (
          <ButtonContainer>
            {' '}
            <Button href={concert.ticketLink} target="_blank">
              Tickets <FiArrowUpRight />
            </Button>
            {isDesktop && <CornerLines />}
          </ButtonContainer>
        ) : (
          <TicketNote>{concert.ticketNote}</TicketNote>
        ))}
    </RowContainer>
  );
};

export default ConcertRow;
