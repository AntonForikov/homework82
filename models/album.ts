import {Schema, model, Types} from 'mongoose';
import Artist from './artist';

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => Artist.findById(id),
      message: 'Artist does not exist!'
    }
  },
  year: {
    type: String,
    required: true
  },
  image: String || null
}, {versionKey: false});

const Album = model('albums', AlbumSchema);

export default Album;