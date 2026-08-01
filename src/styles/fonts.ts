import { Montserrat, Roboto_Mono } from 'next/font/google';

// define your variable fonts
const montserrat = Montserrat({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'block',
  preload: true,
});
const robotoMono = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  fallback: ['monospace'],
  preload: true,
});

export { montserrat, robotoMono };
