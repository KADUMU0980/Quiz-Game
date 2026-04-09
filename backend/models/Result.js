const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  roomCode: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Result", resultSchema);
