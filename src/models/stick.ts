import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

interface StickProps extends Document {
  title: string;
  desc: string;
  user_id: string;
}

//user schema
const stickSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Stick = mongoose.model<StickProps>('Stick', stickSchema);
