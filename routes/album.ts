import express from 'express';
import {imagesUpload} from '../multer';
import Album from '../models/album';
import {AlbumWithoutId} from '../types';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const albumRouter = express.Router();

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const {title, artist, year} = req.body;
    const albumData: AlbumWithoutId = {
      title: title,
      artist: artist,
      year: year,
      image: req.file ? req.file.filename : null
    }

    const album = new Album(albumData);
    await album.save();

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

albumRouter.get('/', async (req, res, next) => {
  const artistId = req.query.artist;

  // if(artistId) {
  //   try {
  //     let _id: ObjectId;
  //     try {
  //       _id = new ObjectId(artistId);
  //     } catch {
  //       return res.status(404).send({error: 'Artist query is not ObjectId.'})
  //     }
  //
  //     const albums = await Album.find({artist: _id});
  //     return res.send(albums);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  try {
    const albums = await Album.find();
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumRouter.get('/:_id', async (req, res, next) => {
  try {
    const {_id} = req.params;
    const targetAlbum = await Album.findOne({_id});
    return res.send(targetAlbum);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(404).send({error: 'No such album'});
    next(e)
  }
});

export default albumRouter;