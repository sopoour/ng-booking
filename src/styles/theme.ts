import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      default: '#250564',
      soft: '#6a32d8',
      softTrans: "rgba(106, 50, 216, 0.7)",
      defaultBlur: 'rgba(37, 5, 100, 0.75)',
    },
    fg: {
      default: '#FFFFFF',
      contrast: '#000000',
      inactive: 'rgba(255, 255, 255, 0.50)',
    },
    accent: {
      flieder: '#BBA7E6',
      orange: '#FF4F09',
      green: '#B8FF57',
    },
  },
  filters: {
    backdrop: 'blur(8px)',
  }
} as const;

export default theme;
