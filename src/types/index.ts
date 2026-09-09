import { Artist, TeamMember } from "@app/services/graphql/types";

export type ArtistPreview = Pick<Artist, 'name' | 'profilfoto' | 'artistRadio' |'genre' | 'orderNumber'>

export type AboutType = {
  generell: {
    about: string;
  }
  teamMemberCollection: {
    items: TeamMember[]
  }
}

export type IconLink = {
  type: 'tiktok' | 'spotify' | 'email' | 'instagram' | 'appleMusic' | 'youtube' | 'bandcamp' | 'link' | 'tidal' | 'linktree';
  id?: string;
  link?: string;
};