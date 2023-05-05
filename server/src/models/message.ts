import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  text: { type: String, required: true, maxLength: 500 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);