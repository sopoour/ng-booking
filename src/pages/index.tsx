import ArtistShowcase from '@app/components/ArtistShowcase';
import ArtistShowcaseSkeleton from '@app/components/ArtistShowcase/ArtistShowcaseSkeleton';
import Concerts from '@app/components/Concerts';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import SeoHead from '@app/components/SeoHead';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useLang from '@app/hooks/useLang';
import { flexColumn } from '@app/styles/mixins';
import { HomePage } from '@app/types';
import { NextPage } from 'next';
import styled from 'styled-components';
import useSWR from 'swr';

const Root = styled(MaxWidthContainer)`
  ${flexColumn};
  gap: 84px;

  padding-bottom: 28px;

  ${({ theme }) => theme.media('sm')`
      gap: 120px;
       padding-bottom: 40px;
  `};
`;

const ArtistShowCaseContainer = styled.div`
  ${flexColumn};
  gap: 100px;
  padding-top: 50px;
  ${({ theme }) => theme.media('sm')`
    padding-top: 100px;
    padding-bottom: 48px;
     gap: 150px;
  `};
`;

const Home: NextPage = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<HomePage | null>(`/api/homepage?lang=${lang}`, fetcher);

  if (isLoading) {
    return (
      <ArtistShowCaseContainer>
        <ArtistShowcaseSkeleton />
      </ArtistShowCaseContainer>
    );
  }

  return (
    <>
      <SeoHead />
      <Root>
        <ArtistShowCaseContainer>
          {data?.artistCollection.items
            ?.sort((a, b) => (a.orderNumber as number) - (b.orderNumber as number))
            .map((artist) => <ArtistShowcase artist={artist} key={artist.name + 'showcase'} />)}
        </ArtistShowCaseContainer>
        <Concerts />
      </Root>
    </>
  );
};

export default Home;
