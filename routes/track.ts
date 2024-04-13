import express from 'express';
import Album from '../models/album';
import {TrackFromDb, TrackWithoutId} from '../types';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import Track from '../models/track';

const trackRouter = express.Router();

trackRouter.post('/', async (req, res, next) => {
  try {
    const {title, album, duration} = req.body;
    const trackData: TrackWithoutId = {
      title: title,
      album: album,
      duration: duration ? duration : null
    }

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

trackRouter.get('/', async (req, res, next) => {
  // const artistId = req.query.artist;

  // if(artistId) {
  //   try {
  //     let _id: ObjectId;
  //     try {
  //       _id = new ObjectId(artistId);
  //     } catch {
  //       return res.status(404).send({error: 'Artist query is not ObjectId.'})
  //     }
  //
  //     const albums: AlbumFromDB[] = await Album.find({artist: _id});
  //     return res.send(albums);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  try {
    const tracks: TrackFromDb[] = await Album.find();
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

export default trackRouter;