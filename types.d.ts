export interface ArtistFromDB {
  _id: string;
  name: string;
  information: string | null;
  image: string | null;
}

export type ArtistWithoutId = Omit<ArtistFromDB, '_id'>;

export interface AlbumFromDB {
  _id: string;
  title: string;
  artist: string;
  year: string;
  image: string | null
}

export type AlbumWithoutId = Omit<AlbumFromDB, '_id'>;