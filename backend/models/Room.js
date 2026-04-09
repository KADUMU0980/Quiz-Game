const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  hostName: { type: String, required: true },
  players: [
    {
      userId: String,
      username: String,
    },
  ],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Room", roomSchema);
