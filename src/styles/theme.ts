import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#250564',
      soft: '#6a32d8',
      defaultBlur: 'rgba(37, 5, 100, 0.75)',
    },
    fg: {
      default: '#FFFFFF',
      contrast: '#000000',
      inactive: 'rgba(255, 255, 255, 0.50)',
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
