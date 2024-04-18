import {Model} from 'mongoose';
import {ObjectId} from 'mongodb';

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

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryFromDb {
  _id: string;
  userId: ObjectId;
  trackId: ObjectId;
  date: Date;
}

export type TrackHistoryWithoutId = Omit<TrackHistoryFromDb, '_id'>;