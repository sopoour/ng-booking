import { Artist, TeamMember, Konzert, Generell } from "@app/services/graphql/types";

export type ArtistPreview = Pick<Artist, 'name' | 'profilfoto' | 'artistRadio' |'genre' | 'orderNumber'>

export type AboutType = {
  generell: {
    about: string;
  }
  teamMemberCollection: {
    items: TeamMember[]
  }
}

export type HomePage = {
  artistCollection: {
    items: ArtistPreview []
  }
  konzertCollection: {
    items: Konzert []
  }
  generell: Pick<Generell, 'konzertTitel' | 'konzertUntertitel' | 'vergangeneKonzertTitel'>
}

export type IconLink = {
  type: 'tiktok' | 'spotify' | 'email' | 'instagram' | 'appleMusic' | 'youtube' | 'bandcamp' | 'link' | 'tidal' | 'linktree' | 'linkedin';
  id?: string;
  link?: string;
};