import fonts from '@app/fonts/fonts';
import ContentfulImage from '@app/lib/contentful-image';
import { flexColumn } from '@app/styles/mixins';
import { ArtistPreview } from '@app/types';
import Typography from '../Typography/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';

export const ArtistWrapper = styled.section`
  ${flexColumn};
  position: relative;
  gap: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  ${({ theme }) => theme.media('sm')`
    width: 550px;
  `}
`;

const ArtistTitle = styled(Typography)`
  position: absolute;
  top: -30px;
  z-index: 5;
  font-family: ${fonts.header.style.fontFamily};
  font-size: 52px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.85;
  overflow-wrap: break-word;
  text-shadow:
    0 3px 4px rgba(80, 60, 130, 0.5),
    0 7px 12px rgba(0, 0, 0, 0.25);

  ${({ theme }) => theme.media('sm')`
    font-size: 60px;
  `}
`;

const ProfileImage = styled(ContentfulImage)`
  && {
    height: unset !important;
    width: 100% !important;
    position: relative !important;
  }
`;

const StyledLink = styled(Link)`
  height: unset !important;
  width: 100% !important;
  position: relative !important;
`;

type Props = {
  artist: ArtistPreview;
};

const ArtistShowcase: FC<Props> = ({ artist }) => {
  const artistSlug = artist?.name?.toLowerCase().replace(/['\s]/g, '-');
  const isDesktop = useMedia(Breakpoints.sm);

  return (
    <ArtistWrapper>
      <ArtistTitle>{artist?.name}</ArtistTitle>
      <StyledLink
        href={artistSlug ? `/artists/${artistSlug}` : ''}
        target={isDesktop ? '_blank' : '_self'}
      >
        <ProfileImage
          src={artist?.profilfoto?.url || ''}
          fill
          alt={`${artist?.name}'s profile picture`}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />
      </StyledLink>
    </ArtistWrapper>
  );
};

export default ArtistShowcase;
