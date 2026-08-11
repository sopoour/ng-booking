import localFont from 'next/font/local';
import {Leckerli_One, Manrope} from 'next/font/google'

const header = localFont({
  src: "./Null-Normal.ttf",
  weight: "400",
  fallback: ["sans-serif"],
  display: 'swap',
  style: 'normal',
  preload: true,
});

const subheader = Leckerli_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'block',
  preload: true,
})

const text = Manrope({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'swap',
  preload: true,
})

export default {header, text, subheader}
