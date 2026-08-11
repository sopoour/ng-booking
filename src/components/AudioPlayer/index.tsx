import { FC, useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { flexRow } from '@app/styles/mixins';
import Typography from '../Typography/Typography';
import fonts from '@app/fonts/fonts';
import theme from '@app/styles/theme';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';

const Player = styled.div`
  ${flexRow};
  gap: 24px;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const Playlabel = styled(Typography)`
  font-family: ${fonts.subheader.style.fontFamily};
  position: absolute;
  left: 60%;
  top: 48%;
  transform: translate(-60%, -48%);
  background-color: ${theme.colors.bg.default};
  padding: 0 4px;
  letter-spacing: 15%;
  width: max-content;

  ${({ theme }) => theme.media('xs')`
    left: 53%;
  `}
`;

const AudioPlayer: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [play, setPlay] = useState<boolean>(false);

  const isDesktop = useMedia(Breakpoints.xs);

  const flatLine = () => `
M0 50
C60 49 120 48 180 49
C240 50 300 51 360 50
C420 49 480 48 540 49
C600 50 660 52 720 50
C780 49 840 48 900 49
C940 50 970 51 1000 50
`;

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlay(true);
    } else {
      audioRef.current.pause();
      setPlay(false);
    }
  };

  const state = {
    phase: 0,
    progress: 0,
  };

  const generateWave = (phase = 0, scale = 1, progress = 1) => {
    const width = 1000;
    const middle = 50;

    const amplitude = 30 * scale;
    const wavelength = isDesktop ? 60 : 150;

    const maxX = width * progress;

    let d = `M0 ${middle}`;

    for (let x = 0; x <= maxX; x += 5) {
      const y = middle + Math.sin((x + phase) * ((Math.PI * 2) / wavelength)) * amplitude;

      d += ` L${x} ${y}`;
    }

    return d;
  };

  useEffect(() => {
    if (pathRef.current) {
      pathRef.current.setAttribute('d', flatLine());
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      state.phase--;

      const scale = 0.8 + Math.sin(performance.now() * 0.0015) * 0.2;

      pathRef.current?.setAttribute('d', generateWave(state.phase, scale, state.progress));
    };

    if (play) {
      gsap.to(state, {
        progress: 1,
        duration: 7.5,
        ease: 'power2.out',
      });
      gsap.ticker.add(tick);
    } else {
      gsap.ticker.remove(tick);

      gsap.to(pathRef.current, {
        attr: {
          d: flatLine(),
        },
        duration: 0.9,
        ease: 'power2.out',
      });
    }

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [play, pathRef]);

  return (
    <Player>
      <audio ref={audioRef} src={`https://samplelib.com/mp3/sample-3s.mp3`} loop preload="none" />
      <button onClick={togglePlayback} style={{ color: 'white' }}>
        {play ? (
          <FaPause style={{ width: '25px', height: '25px' }} />
        ) : (
          <FaPlay style={{ width: '25px', height: '25px' }} />
        )}
      </button>
      <svg width="100%" height={64} viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path ref={pathRef} stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" />
      </svg>
      {!play && <Playlabel type={fonts.subheader.style.fontFamily}>play radio</Playlabel>}
    </Player>
  );
};

export default AudioPlayer;
