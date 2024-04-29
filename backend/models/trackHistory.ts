import {Schema, model} from 'mongoose';
import User from './user';
import Track from './track';

const trackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    validate: {
      validator: async (id: Schema.Types.ObjectId) => await User.findById(id),
      message: 'User does not exist'
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'tracks',
    required: true,
    validate: {
      validator: async (id: Schema.Types.ObjectId)=> await Track.findById(id),
      message: 'Track does not exist'
    }
  },
  date: {
    type: Date,
    required: true
  }
}, {versionKey: false});

const trackHistory = model('trackHistory', trackHistorySchema);

export default trackHistory;