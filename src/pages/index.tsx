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
import { useLayoutEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Stars from '@app/assets/stars';

gsap.registerPlugin(ScrollTrigger);

const STARS_DATA = [
  { className: 'star-1', styles: { left: '0%', top: '25%', width: '55px' } },
  {
    className: 'star-2',
    styles: { left: '10%', top: '50%', width: '70px', transform: 'rotate(-20deg)' },
  },
  { className: 'star-3', styles: { left: '4%', top: '75%', width: '40px' } },
  {
    className: 'star-4',
    styles: { right: '3%', top: '25%', width: '75px', transform: 'rotate(40deg)' },
  },
  { className: 'star-5', styles: { right: '8%', top: '55%', width: '50px' } },
  { className: 'star-6', styles: { right: '1%', top: '85%', width: '40px' } },
  { className: 'star-7', styles: { right: '10%', top: '110%', width: '55px' } },
  {
    className: 'star-8',
    styles: { left: '1%', top: '100%', width: '45px', transform: 'rotate(-10deg)' },
  },
];

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
    fill: none;
    opacity: 0;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Home: NextPage = () => {
  const lang = useLang();
  const { data, isLoading } = useSWR<HomePage | null>(`/api/homepage?lang=${lang}`, fetcher);

  useLayoutEffect(() => {
    if (isLoading) return;

    let ctx = gsap.context(() => {
      const stars = gsap.utils.toArray('.star') as HTMLElement[];

      stars.forEach((star) => {
        const randomY = gsap.utils.random(-400, -200, 10, undefined);
        const randomX = gsap.utils.random(-60, 60, 5, undefined);
        const randomRotation = gsap.utils.random(-20, 360, 10, undefined);

        const randomScale = gsap.utils.random(0.9, 1.2, 0.1);
        const randomDelay = gsap.utils.random(0.1, 0.2, 0.3); // Staggered entrance delay on load

        // Entrance Animation
        gsap.fromTo(
          star,
          {
            opacity: 0,
            scale: 0.2,
            rotation: gsap.utils.random(-45, 45),
          },
          {
            opacity: 1,
            scale: randomScale,
            duration: 0.8,
            delay: randomDelay,
            ease: 'back.out(1.6)', // Gives a nice bouncy "pop" effect
          },
        );

        // Scrolling Animation
        gsap.to(star, {
          y: randomY,
          x: randomX,
          rotation: randomRotation,
          ease: 'none',
          scrollTrigger: {
            trigger: '#artists-section',
            start: `top top`,
            end: 'bottom -100%',
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  if (isLoading) {
    return (
      <ArtistSection>
        <ArtistShowcaseSkeleton />
      </ArtistSection>
    );
  }

  return (
    <>
      <SeoHead />
      <Root>
        <ArtistShowCaseContainer id="artists-section">
          <StarsLayer id="stars-layer">
            {STARS_DATA.map((star, index) => {
              const StarComponent = Stars[index % Stars.length];
              return (
                <StarComponent
                  key={index}
                  className={`star ${star.className}`}
                  style={star.styles}
                />
              );
            })}
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
