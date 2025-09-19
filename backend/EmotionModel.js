const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  studentName: String,
  rollNumber: String,
  questionId: String,
  emotion: String,
  timestamp: { type: Date, default: Date.now }
});

const Emotion = mongoose.model('Emotion', emotionSchema);
module.exports = Emotion;
