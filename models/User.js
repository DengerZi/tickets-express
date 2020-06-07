const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const userSchema = new mongoose.Schema(
  {
    _role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model("User", userSchema);

module.exports = User;
