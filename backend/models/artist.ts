import {Schema, model} from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String || null,
  information: String || null,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  }
}, {versionKey: false});

const Artist = model('artist', ArtistSchema);

export default Artist;