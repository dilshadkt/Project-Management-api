import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { ROLES } from '../constants/index';

interface UserProps extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  role?: string;
  created?: Date;
  googleId?: string;
  authMethod: 'local' | 'google';
}

//user schema
const userSchema: Schema<UserProps> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: function () {
      return this.authMethod === 'local';
    },
  },
  avatar: {
    type: String,
    default: null,
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
  googleId: {
    type: String,
    default: null,
  },
  authMethod: {
    type: String,
    required: true,
    enum: ['local', 'google'],
  },
});

export const User = mongoose.model<UserProps>('User', userSchema);
