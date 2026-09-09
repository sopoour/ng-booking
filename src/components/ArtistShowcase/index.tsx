import fonts from '@app/fonts/fonts';
import ContentfulImage from '@app/lib/contentful-image';
import { flexColumn } from '@app/styles/mixins';
import { ArtistPreview } from '@app/types';
import Typography from '../Typography/Typography';
import { FC, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    let ctx: gsap.Context;

    const setupAnimations = async () => {
      // Wait for fonts
      await document.fonts.ready;

      // Get all images
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('.artist-card img'));

      // Wait until every image is loaded AND decoded
      await Promise.all(
        images.map(async (img) => {
          if (!img.complete) {
            await new Promise<void>((resolve) => {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            });
          }

          // Make sure the browser has decoded the image
          try {
            await img.decode();
          } catch {
            // Image might already be decoded / failed to decode
          }
        }),
      );

      // Give React/browser one more render frame
      await new Promise(requestAnimationFrame);

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.artist-card');

        // Hide all cards except the first
        gsap.set(cards.slice(1), {
          opacity: 0,
        });

        cards.forEach((card, index) => {
          const title = card.querySelector<HTMLElement>('.artist-title');
          const nextCard = cards[index + 1];

          if (!title) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: index === 0 ? 'top 25%' : 'top 35%',
              end: 'bottom 20%',
              scrub: true,
            },
          });

          tl.to(title, {
            y: isDesktop ? 500 : 280,
            duration: 0.8,
            ease: 'none',
          }).to(title, {
            opacity: 0,
            duration: 0.2,
            ease: 'none',
          });

          if (nextCard) {
            tl.fromTo(
              nextCard,
              {
                opacity: 0,
                y: 100,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'none',
              },
            );
          }
        });

        // Now that everything has its final dimensions:
        ScrollTrigger.refresh();
      });
    };

    setupAnimations();

    return () => {
      ctx?.revert();
    };
  }, [isDesktop]);

  return (
    <ArtistWrapper className="artist-card">
      <ArtistTitle className="artist-title">{artist?.name}</ArtistTitle>
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
