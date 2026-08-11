import fonts from '@app/fonts/fonts';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import ContentfulImage from '@app/lib/contentful-image';
import { Artist } from '@app/services/graphql/types';
import { flexColumn } from '@app/styles/mixins';
import { ArtistPreview } from '@app/types';
import { Typography } from '@mantine/core';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const ArtistWrapper = styled.section`
  ${flexColumn};
  position: relative;
  gap: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  ${({ theme }) => theme.media('sm')`
    width: 500px;
  `}
`;

const ArtistTitle = styled(Typography)`
  position: absolute;
  top: -50px;
  z-index: 5;
  font-family: ${fonts.header.style.fontFamily};
  font-size: 60px;
`;

const ProfileImage = styled(ContentfulImage)`
  && {
    height: unset !important;
    width: 100% !important;
    position: relative !important;
  }
`;

type Props = {
  artist: ArtistPreview;
};
const ArtistShowcase: FC<Props> = ({ artist }) => {
  return (
    <ArtistWrapper>
      <ArtistTitle>{artist?.name}</ArtistTitle>
      <ProfileImage
        src={artist?.profilfoto?.url || ''}
        fill
        alt={`${artist?.name}'s profile picture`}
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
      />
    </ArtistWrapper>
  );
};

export default ArtistShowcase;
