import {Model} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface ArtistFromDB {
  _id: ObjectId;
  name: string;
  information: string | null;
  image: string | null;
}

export type ArtistWithoutId = Omit<ArtistFromDB, '_id'>;

export interface AlbumFromDB {
  _id: ObjectId;
  title: string;
  artistId: ObjectId;
  year: number;
  image?: string | null;
}

export interface AlbumWithTrackQuantity extends AlbumFromDB {
  trackQuantity: number
}

export type AlbumWithoutId = Omit<AlbumFromDB, '_id'>;

export interface TrackFromDb {
  _id: ObjectId;
  title: string;
  album: ObjectId;
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