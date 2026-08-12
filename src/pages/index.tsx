import ArtistShowcase from '@app/components/ArtistShowcase';
import ArtistShowcaseSkeleton from '@app/components/ArtistShowcase/ArtistShowcaseSkeleton';
import AudioPlayer from '@app/components/AudioPlayer';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import Typography from '@app/components/Typography/Typography';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import { Artist } from '@app/services/graphql/types';
import { ArtistPreview } from '@app/types';
import { NextPage } from 'next';
import styled from 'styled-components';
import useSWR from 'swr';

const Root = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column;
  gap: 120px;
  padding-top: 80px;
  padding-bottom: 48px;
  ${({ theme }) => theme.media('sm')`
    padding-top: 80px;
    padding-bottom: 48px;
  `};
`;

const Home: NextPage = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<ArtistPreview[] | null>(`/api/homepage?lang=${lang}`, fetcher);

  if (isLoading) {
    return (
      <Root>
        <ArtistShowcaseSkeleton />
      </Root>
    );
  }

  return (
    <Root>
      {data
        ?.sort((a, b) => (a.orderNumber as number) - (b.orderNumber as number))
        .map((artist) => <ArtistShowcase artist={artist} key={artist.name + 'showcase'} />)}
    </Root>
  );
};

export default Home;
