import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/artist';
import {imagesUpload} from '../multer';
import {ArtistFromDB, ArtistWithoutId} from '../types';
import auth, {Auth} from '../middleware/auth';
import permit from '../middleware/permit';
import {ObjectId} from 'mongodb';
import Album from '../models/album';

const artistRouter = express.Router();

artistRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const {name, information} = req.body;
    const artistData: ArtistWithoutId = {
      name: name,
      information: information && information.trim() !== '' ? information.trim() : null,
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

artistRouter.get('/:_id', async (req, res, next) => {
  try {
    const {_id} = req.params
    const artist: ArtistFromDB | null = await Artist.findOne({_id});
    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistRouter.patch('/:id/togglePublished', auth, permit(['admin']), async (req, res,next) => {
  try {
    const {id} = req.params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return res.status(404).send({error: 'Artist id is not an ObjectId.'});
    }

    const targetArtist = await Artist.findById(_id);

    if (!targetArtist) return res.status(400).send({error: 'There is no such artist.'});

    targetArtist.isPublished = !targetArtist.isPublished;
    await targetArtist.save();
    return res.send(targetArtist)
  } catch (e) {
    next(e);
  }
});

artistRouter.delete('/:id', auth, async (req: Auth, res, next) => {
  try {
    const {id} = req.params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return res.status(404).send({error: 'Artist id is not an ObjectId.'});
    }

    const targetArtist = await Artist.findById(_id);
    if (!targetArtist) return res.status(400).send({error: 'There is no artist to delete'});

    if (req.user?._id.toString() === targetArtist.user.toString() && req.user?.role === 'user') {
      await Album.deleteOne(_id);
      return res.send({success: 'Artist has been deleted.'});
    }

    if (req.user?.role !== 'admin') return res.status(403).send({error: 'Not authorized'});

    await Artist.deleteOne(_id);

    return res.send({success: 'Artist has been deleted.'});
  } catch (e) {
    next(e);
  }
});
export default  artistRouter;