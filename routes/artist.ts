import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/artist';
import {imagesUpload} from '../multer';
import {ArtistFromDB, ArtistWithoutId} from '../types';

const artistRouter = express.Router();

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const {name, information} = req.body;
    const artistData: ArtistWithoutId = {
      name: name,
      information: information ? information : null,
      image: req.file ? req.file.filename : null
    }

    const artist = new Artist(artistData);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

artistRouter.get('/', async (req, res, next) => {
  try {
    const artists: ArtistFromDB[] = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});
export default  artistRouter;