import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { Konzert } from '@app/services/graphql/types';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { FC, useState } from 'react';
import styled from 'styled-components';
import ConcertRow from './ConcertRow';
import { Button } from '@mantine/core';
import { IoIosArrowDown } from 'react-icons/io';
import theme from '@app/styles/theme';
import TextWithLine from '@app/components/TextWithLine';
import useLang from '@app/hooks/useLang';

const SectionContainer = styled.div`
  ${flexColumn};
  gap: 52px;
`;

const TitleContainer = styled.span`
  ${flexColumn};
  gap: 0px;
  align-items: center;
  > p {
    margin: 0;
  }
`;

const ConcertContainer = styled.div`
  ${flexColumn};
  position: relative;
  width: 100%;
  gap: 8px;
`;

const ButtonContainer = styled.span`
  ${flexRow}
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    display: block;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 160px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #250564 100%);
    transition: opacity 0.3s ease;
  }
`;

type Props = {
  title: string;
  subTitle?: string;
  concerts?: Konzert[];
  shownEventsNumber?: number;
  pastConcerts?: boolean;
};

const ConcertSection: FC<Props> = ({
  title,
  subTitle,
  concerts,
  shownEventsNumber = 2,
  pastConcerts,
}) => {
  const lang = useLang();
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleShows = showAll ? concerts : concerts?.slice(0, shownEventsNumber);

  return (
    <SectionContainer>
      <TitleContainer>
        <Typography
          as="h3"
          type={fonts.header.style.fontFamily}
          fontSize="32px"
          fontSizeSm="72px"
          $textalign="center"
          lineHeight="1"
        >
          {title}
        </Typography>
        {subTitle && (
          <TextWithLine fontSize="18px" fontSizeSm="32px" type={fonts.subheader.style.fontFamily}>
            {subTitle}
          </TextWithLine>
        )}
      </TitleContainer>

      <ConcertContainer>
        {visibleShows?.map((show) => (
          <ConcertRow key={(show?.venue || '') + (show?.artistName || '')} concert={show} />
        ))}
        {!showAll && concerts && concerts?.length > shownEventsNumber && (
          <ButtonContainer>
            <Button
              onClick={() => setShowAll(true)}
              variant="default"
              rightSection={<IoIosArrowDown />}
              style={{
                fontSize: '16px',
                background: theme.colors.bg.soft,
                color: 'white',
                fontFamily: fonts.subheader.style.fontFamily,
                border: 'none',
                borderRadius: 'none',
                fontWeight: '400px',
              }}
            >
              {lang === 'en' ? 'Show all' : 'Alle anzeigen'}
            </Button>
          </ButtonContainer>
        )}
      </ConcertContainer>
    </SectionContainer>
  );
};

export default ConcertSection;
