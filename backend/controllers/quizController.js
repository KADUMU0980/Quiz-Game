const Quiz = require("../models/Quiz");

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find().lean();
    if (!questions.length)
      return res.status(404).json({ message: "No questions found" });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer)
      return res.status(400).json({ message: "All fields are required" });

    const newQuestion = new Quiz({ question, options, correctAnswer });
    await newQuestion.save();

    res.status(201).json({ message: "Question added", question: newQuestion });
  } catch (err) {
    res.status(500).json({ message: "Error adding question", error: err.message });
  }
};
