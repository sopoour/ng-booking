import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import ContentfulImage from '@app/lib/contentful-image';
import { Artist as ArtistType } from '@app/services/graphql/types';
import { flexColumn, flexRow } from '@app/styles/mixins';
import theme from '@app/styles/theme';
import { Flex } from '@mantine/core';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const Container = styled(MaxWidthContainer)`
  ${flexColumn};
  gap: 40px;
  margin-top: 32px;
  padding-bottom: 40px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  font-family: ${fonts.header.style.fontFamily};
  font-size: 70px;
  text-align: center;
  ${({ theme }) => theme.media('sm')`
    font-size: 80px;
  `}
  line-height: 1;
`;

const Genre = styled(Typography)`
  font-family: ${fonts.header.style.fontFamily};
  font-size: 16px;
  text-align: center;
  ${({ theme }) => theme.media('sm')`
    font-size: 28px;
  `}
`;

const GenreWrapper = styled.span`
  ${flexRow};
  gap: 16px;
  justify-content: center;
`;

const PressWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const PressImage = styled(ContentfulImage)`
  && {
    height: unset !important;
    position: relative !important;
    width: 400px;
  }
`;

const Artist: FC = () => {
  const lang = useLang();
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR<ArtistType[] | null>(
    `/api/artistsDetails?lang=${lang}`,
    fetcher,
  );

  const artist = data?.find((a) => a.name?.toLowerCase().replace(/['\s]/g, '-') === slug);
  return (
    <Container>
      <Flex direction={'column'} gap={'0px'}>
        <Title>{artist?.name}</Title>
        <GenreWrapper>
          {artist?.genre?.map((g) => <Genre key={g + (artist?.name || '')}>{g}</Genre>)}
        </GenreWrapper>
      </Flex>

      <PressWrapper>
        <PressImage
          src={artist?.presseFoto?.url || ''}
          fill
          alt={`${artist?.name}'s press picture`}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />
        <MarkdownConfig content={artist?.pressetext as string} />
      </PressWrapper>
    </Container>
  );
};

export default Artist;
