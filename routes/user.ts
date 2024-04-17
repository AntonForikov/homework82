import express from 'express';
import User from '../models/user';
import mongoose, {mongo} from 'mongoose';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: req.body.token ? req.body.token : null
    });
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    if (e instanceof mongo.MongoServerError && e.code === 11000) return res.status(422).send({error: '"username" should be an unique value.'});
    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) return res.status(404).send({error: "Username and password doesn't match."});

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) return res.status(404).send({error: "Username and password doesn't match."});

    return res.send({message: 'Username and password matched.'});
  } catch (e) {
    next(e);
  }
})

export default userRouter;