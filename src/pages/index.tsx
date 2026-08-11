import ArtistShowcase from '@app/components/ArtistShowcase';
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

const Root = styled.span`
  display: flex;
  flex-direction: column;
  gap: 120px;
  padding: 20px 0 32px 0;

  ${({ theme }) => theme.media('sm')`
    padding: 80px 0 48px 0;
  `}
`;

const Home: NextPage = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<ArtistPreview[] | null>(`/api/homepage?lang=${lang}`, fetcher);
  if (isLoading) {
    return <Typography>loading...</Typography>;
  }
  return (
    <Root>
      {data
        ?.sort((a, b) => (a.orderNumber as number) - (b.orderNumber as number))
        .map((artist) => <ArtistShowcase artist={artist} />)}
    </Root>
  );
};

export default Home;
