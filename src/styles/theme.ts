import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#111647',
      soft: '#BCC1EB',
    },
    fg: {
      default: '#FFFFFF',
      contrast: '#000000',
      inactive: 'rgba(255, 255, 255, 0.75)',
    },
    accent: {
      pink: '#F535AA',
      orange: '#FF4F09',
      green: '#30FF7F',
    },
  },
  filters: {
    backdrop: 'blur(8px)',
  }
} as const;

export default theme;
