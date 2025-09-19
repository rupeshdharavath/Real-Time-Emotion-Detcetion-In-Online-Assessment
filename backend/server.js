const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/emotion_detection', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Define your routes
app.post('/api/emotion', (req, res) => {
  // Logic to store the detected emotion data in MongoDB
  const { emotion, questionId } = req.body;
  // Example: Save the detected emotion to MongoDB
  // You can create a schema to store this data
  // Implement your schema here
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
