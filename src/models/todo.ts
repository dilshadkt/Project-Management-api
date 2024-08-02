import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

interface StickProps extends Document {
  title: string;
  description: string;
  user_id: string;
}

//user schema
const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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

export const Todo = mongoose.model<StickProps>('Todo', todoSchema);
