import express from 'express';
import {ObjectId} from 'mongodb';
import User from '../models/user';
import {TrackHistoryWithoutId} from '../types';
import TrackHistory from '../models/trackHistory';
import mongoose from 'mongoose';

const trackHistoryRoute = express.Router();

trackHistoryRoute.post('/', async (req, res, next) => {
  try {
    const {trackId} = req.body;
    let id: ObjectId;
    try {
      id = new ObjectId(trackId);
    } catch (e) {
      return res.status(404).send({error: "'trackId' in not an ObjectId."});
    }

    const tokenData = req.get('Authorization');

    if (!tokenData) return res.status(401).send({error: 'No token provided.'});

    const [_, token] = tokenData.split(' ');
    const user = await User.findOne({token});

    if (!user) return res.status(403).send({error: 'Wrong token'});

    const trackHistoryData: TrackHistoryWithoutId = {
      userId: user._id,
      trackId: id,
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