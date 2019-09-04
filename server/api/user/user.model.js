import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('user', userSchema);
