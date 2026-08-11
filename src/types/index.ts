import { Artist } from "@app/services/graphql/types";

export type ArtistPreview = Pick<Artist, 'name' | 'profilfoto' | 'artistRadio' |'genre' | 'orderNumber'>