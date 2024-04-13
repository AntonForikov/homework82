import express from 'express';
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
      duration: duration
    }

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    if (e instanceof mongoose.Error) return res.status(422).send(e);
    next(e);
  }
});

trackRouter.get('/', async (req, res, next) => {
  const albumId = req.query.album;

  if(albumId && typeof (albumId) === 'string') {
    try {
      let _id: ObjectId;
      try {
        _id = new ObjectId(albumId);
      } catch {
        return res.status(404).send({error: 'Album query is not an ObjectId.'});
      }

      const tracks: TrackFromDb[] = await Track.find({album: _id});
      if (tracks.length === 0) return res.status(404).send({error: 'There is no tracks with such album.'});
      return res.send(tracks);
    } catch (e) {
      next(e);
    }
  }

  try {
    const tracks: TrackFromDb[] = await Track.find();
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

export default trackRouter;