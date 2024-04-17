import {Schema, model} from 'mongoose';
import {UserFields} from '../types';

const UserSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
}, {versionKey: false});

const User = model('User', UserSchema);

export default User;