export interface ArtistFromDb {
  _id: string;
  name: string;
  image: string | null;
}

export interface AlbumFromDb {
  _id: string;
  title: string;
  artistId: string;
  year: string;
  image: string | null;
  trackQuantity: string
}

export interface TrackFromDb {
  _id: string;
  title: string;
  album: {title: string, artistId: string};
  duration: string | null;
  indexNumber: string
}