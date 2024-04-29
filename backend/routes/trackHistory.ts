import express from 'express';
import {ObjectId} from 'mongodb';
import User from '../models/user';
import {TrackHistoryWithoutId} from '../types';
import TrackHistory from '../models/trackHistory';
import mongoose from 'mongoose';
import auth, {Auth} from '../middleware/auth';

const trackHistoryRoute = express.Router();

trackHistoryRoute.post('/', auth, async (req: Auth, res, next) => {
  try {
    const {track} = req.body;
    let id: ObjectId;
    try {
      id = new ObjectId(track);
    } catch (e) {
      return res.status(404).send({error: "'trackId' in not an ObjectId."});
    }

    const trackHistoryData: TrackHistoryWithoutId = {
      user: req.user?._id,
      track: id,
      date: new Date()
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});
export default trackHistoryRoute;