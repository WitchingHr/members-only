import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 20 },
  password: { type: String, required: true, maxLength: 20 },
  member: { type: Boolean, default: false },
});

export default mongoose.model<User>('User', UserSchema);

export interface User {
  username: string;
  password: string;
  member: boolean;
};