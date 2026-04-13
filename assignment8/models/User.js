const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['admin', 'employee'], required: true },
  imagePath: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
