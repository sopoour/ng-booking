import fonts from '@app/fonts/fonts';
import ContentfulImage from '@app/lib/contentful-image';
import { Artist } from '@app/services/graphql/types';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { Flex } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../Typography/Typography';
import MarkdownConfig from '../MarkdownConfig/MarkdownConfig';
import { mapSocialLinks } from '@app/utils/formatLinks';
import LinkContainer from '../LinkContainer';

const Title = styled(Typography)`
  font-family: ${fonts.header.style.fontFamily};
  font-size: 60px;
  text-align: center;
  line-height: 0.85;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  overflow-wrap: break-word;

  ${({ theme }) => theme.media('sm')`
    font-size: 80px;
  `}
`;

const Genre = styled(Typography)`
  font-family: ${fonts.header.style.fontFamily};
  font-size: 16px;
  text-align: center;
  ${({ theme }) => theme.media('sm')`
    font-size: 28px;
  `}
`;

export const GenreWrapper = styled.span`
  ${flexRow};
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 0px;
  justify-content: center;
`;

export const PressWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 16px;
  position: relative;

  ${({ theme }) => theme.media('sm')`
    grid-template-columns: 0.8fr 1fr;
  gap: 40px;
  `};
`;

const Image = styled(ContentfulImage)`
  && {
    height: unset !important;
    position: relative !important;
    width: 100% !important;
  }
`;

const ImgWrapper = styled.span<{ imgCredits?: string; sides?: 'left' | 'right' }>`
  height: unset !important;
  position: relative !important;
  width: 100% !important;

  &::before {
    content: ${({ imgCredits }) => `"${imgCredits}"` || ''};
    position: absolute;
    z-index: 2;
    bottom: 1%;
    font-size: 8px;
    color: white;

    ${({ sides }) =>
      sides === 'right'
        ? css`
            right: 1%;
          `
        : css`
            left: 1%;
          `}
  }
`;

const LiveWrapper = styled.section`
  ${flexColumn};
  gap: 32px;
  margin-top: 8px;
  ${({ theme }) => theme.media('sm')`
    gap: 16px;
    margin-top: 20px;
  `};
`;

const LiveSubWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 32px;
  position: relative;

  ${({ theme }) => theme.media('sm')`
    grid-template-columns: 0.3fr 1fr;
    gap: 32px;
  `};
`;

const LinkWrapper = styled.div`
  ${flexRow};
  gap: 16px;

  ${({ theme }) => theme.media('sm')`
    ${flexColumn};
  `};
`;

const LinkOverWrapper = styled.div`
  ${flexColumn};
  gap: 16px;
`;

const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.bg.soft};
  font-family: ${fonts.subheader.style.fontFamily};
  padding: 4px 8px;
  font-size: 14px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.softTrans};
  }

  ${({ theme }) => theme.media('sm')`
    font-size: 16px;
    padding: 8px 16px;
  `}
`;

const StyledLinkContainer = styled(LinkContainer)`
  margin-top: 20px;
`;

type Props = {
  artist?: Artist;
  lang: 'en' | 'de';
};

const ArtistDetails: FC<Props> = ({ artist, lang }) => {
  const links = [
    { label: 'EPK', link: artist?.epkLink },
    { label: 'Live', link: artist?.liveLink },
    { label: 'Rider', link: artist?.riderLink },
  ];

  const mappedSoMeLinks = mapSocialLinks(artist?.soMeLinks as string[]);

  return (
    <>
      <Flex direction={'column'} gap={'8px'}>
        <Title>{artist?.name}</Title>
        <GenreWrapper>
          {artist?.genre?.map((g) => <Genre key={g + (artist?.name || '')}>{g}</Genre>)}
        </GenreWrapper>
      </Flex>

      <PressWrapper>
        <ImgWrapper imgCredits={artist?.presseFoto?.description as string | undefined}>
          <Image
            src={artist?.presseFoto?.url || ''}
            fill
            alt={`${artist?.name}'s press picture`}
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: 'cover' }}
          />
        </ImgWrapper>
        <MarkdownConfig content={artist?.pressetext as string} />
      </PressWrapper>
      <LiveWrapper>
        <Typography type={fonts.subheader.style.fontFamily} fontSize={'28px'} fontSizeSm="40px">
          {lang === 'en' ? 'Avilability: ' : 'Verfügbarkeit: '}
          {artist?.availability}
        </Typography>

        <LiveSubWrapper>
          <LinkOverWrapper>
            <LinkWrapper>
              {links.map((l) => (
                <LinkButton href={l.link || ''} target="_blank" key={l.label + artist?.name}>
                  {l.label}
                </LinkButton>
              ))}
            </LinkWrapper>{' '}
            <StyledLinkContainer iconLinks={mappedSoMeLinks} />
          </LinkOverWrapper>
          <ImgWrapper
            imgCredits={artist?.liveFoto?.description as string | undefined}
            sides="right"
          >
            <Image
              src={artist?.liveFoto?.url || ''}
              fill
              alt={`${artist?.name}'s live picture`}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'cover' }}
            />
          </ImgWrapper>
        </LiveSubWrapper>
      </LiveWrapper>
    </>
  );
};

export default ArtistDetails;
