import ArtistDetails from '@app/components/ArtistDetails';
import ArtistDetailsSkeleton from '@app/components/ArtistDetails/ArtistDetailsSkeleton';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import SeoHead from '@app/components/SeoHead';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import { Artist as ArtistType } from '@app/services/graphql/types';
import { flexColumn } from '@app/styles/mixins';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

export const Container = styled(MaxWidthContainer)`
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

const Artist: FC = () => {
  const lang = useLang();
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR<ArtistType[] | null>(
    `/api/artistsDetails?lang=${lang}`,
    fetcher,
  );

  const artist = data?.find((a) => a.name?.toLowerCase().replace(/['\s]/g, '-') === slug);

  if (isLoading) {
    return <ArtistDetailsSkeleton />;
  }

  return (
    <>
      <SeoHead title={artist?.name + '- NG-Booking'} />
      <Container>
        <ArtistDetails artist={artist} lang={lang} />
      </Container>
    </>
  );
};

export default Artist;
