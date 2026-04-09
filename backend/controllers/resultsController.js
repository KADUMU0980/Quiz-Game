const Result = require("../models/Result");

exports.saveResult = async (req, res) => {
  try {
    const { roomCode, userId, username, score } = req.body;

    const result = await Result.findOneAndUpdate(
      { roomCode, userId },
      { username, score },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Result saved successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error saving result", error: err.message });
  }
};



// ✅ ADD THIS FUNCTION ↓↓↓
exports.getRoomResults = async (req, res) => {
  try {
    const { roomCode } = req.params;
    console.log("📥 Fetching results for room:", roomCode);

    const results = await Result.find({ roomCode }).sort({ score: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
};
