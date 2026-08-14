import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import Typography from '@app/components/Typography/Typography';
import fonts from '@app/fonts/fonts';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import ContentfulImage from '@app/lib/contentful-image';
import { Artist as ArtistType } from '@app/services/graphql/types';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { Flex } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const Container = styled(MaxWidthContainer)`
  ${flexColumn};
  gap: 32px;
  margin-top: 32px;
  padding-bottom: 40px;
  max-width: 1000px;
  margin: 0 auto;

  ${({ theme }) => theme.media('sm')`
    gap: 40px;
  `}
`;

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

const GenreWrapper = styled.span`
  ${flexRow};
  gap: 16px;
  justify-content: center;
`;

const PressWrapper = styled.section`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const Image = styled(ContentfulImage)`
  && {
    height: unset !important;
    position: relative !important;
    width: 100% !important;
  }
`;

const LiveWrapper = styled.section`
  ${flexColumn};
  gap: 8px;
  margin-top: 8px;
  ${({ theme }) => theme.media('sm')`
    gap: 16px;
    margin-top: 20px;
  `};
`;

const LiveSubWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const LinkWrapper = styled.div`
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

const Artist: FC = () => {
  const lang = useLang();
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR<ArtistType[] | null>(
    `/api/artistsDetails?lang=${lang}`,
    fetcher,
  );

  const artist = data?.find((a) => a.name?.toLowerCase().replace(/['\s]/g, '-') === slug);

  const links = [
    { label: 'EPK', link: artist?.epkLink },
    { label: 'Live', link: artist?.liveLink },
    { label: 'Rider', link: artist?.riderLink },
  ];
  return (
    <Container>
      <Flex direction={'column'} gap={'8px'}>
        <Title>{artist?.name}</Title>
        <GenreWrapper>
          {artist?.genre?.map((g) => <Genre key={g + (artist?.name || '')}>{g}</Genre>)}
        </GenreWrapper>
      </Flex>

      <PressWrapper>
        <Image
          src={artist?.presseFoto?.url || ''}
          fill
          alt={`${artist?.name}'s press picture`}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover' }}
        />
        <MarkdownConfig content={artist?.pressetext as string} />
      </PressWrapper>
      <LiveWrapper>
        <Typography type={fonts.subheader.style.fontFamily} fontSize={'24px'} fontSizeSm="40px">
          {lang === 'en' ? 'Avilability: ' : 'Verfügbarkeit: '}
          {artist?.availability}
        </Typography>

        <LiveSubWrapper>
          <LinkWrapper>
            {links.map((l) => (
              <LinkButton href={l.link || ''} target="_blank" key={l.label + artist?.name}>
                {l.label}
              </LinkButton>
            ))}
          </LinkWrapper>
          <Image
            src={artist?.liveFoto?.url || ''}
            fill
            alt={`${artist?.name}'s live picture`}
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: 'cover' }}
          />
        </LiveSubWrapper>
      </LiveWrapper>
    </Container>
  );
};

export default Artist;
