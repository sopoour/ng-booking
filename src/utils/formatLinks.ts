import { IconLink } from "@app/types";

export const mapSocialLinks  = (links: string[]): IconLink [] => {
  return links?.map((link) => {
    switch (true) {
      case link.includes('instagram'):
        return { type: 'instagram', link };

      case link.includes('tiktok'):
        return { type: 'tiktok', link };

      case link.includes('spotify'):
        return { type: 'spotify', link };

      case link.includes('apple'):
        return { type: 'appleMusic', link };

      case link.includes('youtube'):
        return { type: 'youtube', link };

      case link.includes('bandcamp'):
        return { type: 'bandcamp', link };

      case link.includes('tidal'):
        return { type: 'tidal', link };
       
      case link.includes('linktree'):
        return { type: 'linktree', link };
      default:
        return { type: 'link', link };
    }
  });
};