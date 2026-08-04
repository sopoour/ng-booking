import { FC, useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { flexRow } from '@app/styles/mixins';
import Typography from '../Typography/Typography';
import fonts from '@app/fonts/fonts';
import theme from '@app/styles/theme';

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
  left: 50%;
  top: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.bg.default};
  padding: 0 4px;
  letter-spacing: 15%;
`;

const AudioPlayer: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [play, setPlay] = useState<boolean>(false);

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

    const amplitude = 20 * scale;
    const wavelength = 80;

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
        duration: 6,
        ease: 'power2.out',
      });
      gsap.ticker.add(tick);
    } else {
      gsap.ticker.remove(tick);

      gsap.to(pathRef.current, {
        attr: {
          d: flatLine(),
        },
        duration: 0.35,
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
      <svg width="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
        <path ref={pathRef} stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" />
      </svg>
      {!play && <Playlabel type={fonts.subheader.style.fontFamily}>play radio</Playlabel>}
    </Player>
  );
};

export default AudioPlayer;
