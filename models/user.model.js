import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  refresh_token: {
    type: String,
  },
});

export const userModel = mongoose.model("User", userSchema);
