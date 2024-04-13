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
  artistId: string;
  year: string;
  image: string | null;
}

export type AlbumWithoutId = Omit<AlbumFromDB, '_id'>;

export interface TrackFromDb {
  _id: string;
  title: string;
  album: string;
  duration: string | null;
}

export type TrackWithoutId = Omit<TrackFromDb, '_id'>