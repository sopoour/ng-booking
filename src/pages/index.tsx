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
import { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Root = styled(MaxWidthContainer)`
  ${flexColumn};
  gap: 84px;

  padding-bottom: 28px;

  ${({ theme }) => theme.media('sm')`
      gap: 120px;
       padding-bottom: 40px;
  `};
`;

const ArtistSection = styled.div`
  ${flexColumn};
  gap: 100px;
  position: relative;
  z-index: 1;
  padding-top: 50px;
  ${({ theme }) => theme.media('sm')`
    padding-top: 100px;
    padding-bottom: 48px;
     gap: 150px;
  `};
`;

const ArtistShowCaseContainer = styled.section`
  position: relative;
  isolation: isolate;
  overflow: clip;
`;

const StarsLayer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  margin-bottom: -100vh;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;

  .star {
    position: absolute;
    width: 50px;
    height: 50px;
    fill: none;
    stroke: #d6b8ff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .star-1 {
    left: 2%;
    top: 25%;
    width: 55px;
  }

  .star-2 {
    right: 3%;
    top: 45%;
    width: 75px;
    stroke: #b6ff38;
  }

  .star-3 {
    left: 4%;
    top: 75%;
    width: 35px;
  }
`;

const Home: NextPage = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<HomePage | null>(`/api/homepage?lang=${lang}`, fetcher);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('#stars-layer', {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '#artists-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

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
        <ArtistShowCaseContainer id="artists-section">
          <StarsLayer id="stars-layer">
            <svg className="star star-1" viewBox="0 0 100 100">
              <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
            </svg>

            <svg className="star star-2" viewBox="0 0 100 100">
              <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
            </svg>

            <svg className="star star-3" viewBox="0 0 100 100">
              <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
            </svg>
          </StarsLayer>
          <ArtistSection>
            {data?.artistCollection.items
              ?.sort((a, b) => (a.orderNumber as number) - (b.orderNumber as number))
              .map((artist) => <ArtistShowcase artist={artist} key={artist.name + 'showcase'} />)}
          </ArtistSection>
        </ArtistShowCaseContainer>
        <Concerts />
      </Root>
    </>
  );
};

export default Home;
