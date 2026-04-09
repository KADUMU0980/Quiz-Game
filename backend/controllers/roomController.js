const Room = require("../models/Room");

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const { roomName, hostName } = req.body;
    if (!roomName || !hostName)
      return res.status(400).json({ message: "Room name and host name required" });

    // Generate unique 6-character code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = new Room({
      roomName,
      code: roomCode,
      hostName,
      players: [{ username: hostName, userId: hostName }],
    });

    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (err) {
    res.status(500).json({ message: "Error creating room", error: err.message });
  }
};

// Join Room
exports.joinRoom = async (req, res) => {
  try {
    const { roomCode, username } = req.body;
    const room = await Room.findOne({ code: roomCode });
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Prevent duplicates
    if (!room.players.some((p) => p.username === username)) {
      room.players.push({ username, userId: username });
      await room.save();
    }

    res.status(200).json({ message: "Joined room successfully", room });
  } catch (err) {
    res.status(500).json({ message: "Error joining room", error: err.message });
  }
};

// Get room details
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.roomCode });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: "Error fetching room", error: err.message });
  }
};
