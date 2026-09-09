import { Artist } from "@app/services/graphql/types";

export type ArtistPreview = Pick<Artist, 'name' | 'profilfoto' | 'artistRadio' |'genre' | 'orderNumber'>

export type IconLink = {
  type: 'tiktok' | 'spotify' | 'email' | 'instagram' | 'appleMusic' | 'youtube' | 'bandcamp' | 'link';
  id?: string;
  link?: string;
};