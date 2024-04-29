export interface ArtistFromDb {
  _id: string;
  name: string;
  image: string | null;
}

export interface AlbumFromDb {
  _id: string;
  title: string;
  artist: string;
  year: string;
  image: string | null;
  trackQuantity: string
}

export interface TrackFromDb {
  _id: string;
  title: string;
  album: {title: string, artist: string};
  duration: string | null;
  indexNumber: string
}

export interface UserFromDb {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: UserFromDb;
  message: string
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface UserMutation {
  username: string;
  password: string;
}