import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { ROLES } from '../constants/index';
import Joi from 'joi';

interface UserProps extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//user schema
const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: ROLES.User,
    enum: [ROLES.User, ROLES.Admin],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<UserProps>('User', userSchema);
