import { FC, useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import styled from 'styled-components';
import { gsap } from 'gsap';

const AudioPlayer: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const flatLine = () => 'M0 40 L1000 40';

  const [play, setPlay] = useState<boolean>(false);

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

  const generateWave = () => {
    const width = 1000;
    const middle = 20;

    const amplitude = 50;
    const spacing = 60;

    let d = `M0 ${middle}`;

    let previous = (Math.random() - 0.5) * amplitude;

    for (let x = spacing; x <= width; x += spacing) {
      const next = (Math.random() - 0.5) * amplitude;

      d += `
      C
      ${x - spacing / 2} ${middle + previous}
      ${x - spacing / 2} ${middle + next}
      ${x} ${middle + next}
    `;

      previous = next;
    }

    return d;
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tween: gsap.core.Tween = gsap.to(
        {},
        {
          duration: 0.18,
          repeat: -1,
          onRepeat() {
            gsap.to(pathRef.current, {
              attr: {
                d: generateWave(),
              },
              duration: 0.18,
              ease: 'sine.inOut',
            });
          },
        },
      );
      if (play) {
        tween;
      } else {
        tween.kill();

        gsap.to(pathRef.current, {
          attr: {
            d: flatLine(),
          },
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert(); // cleanup
  }, [play]);

  return (
    <>
      <audio ref={audioRef} src={`https://samplelib.com/mp3/sample-3s.mp3`} loop preload="none" />

      <button onClick={togglePlayback} style={{ color: 'white' }}>
        {play ? (
          <FaPause style={{ width: '25px', height: '25px' }} />
        ) : (
          <FaPlay style={{ width: '25px', height: '25px' }} />
        )}
      </button>
      <svg width="100%" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path ref={pathRef} stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" />
      </svg>
    </>
  );
};

export default AudioPlayer;
