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