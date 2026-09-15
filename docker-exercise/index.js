const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/docker-exercise';

mongoose.connect(MONGODB_URI);

const Counter = mongoose.model('Counter', new mongoose.Schema({
  name: { type: String, unique: true },
  value: { type: Number, default: 0 },
}));

app.get('/', async (req, res) => {
  const counter = await Counter.findOneAndUpdate(
    { name: 'visits' },
    { $inc: { value: 1 } },
    { upsert: true, new: true }
  );
  res.send(`Hi! Visits: ${counter.value}`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mongoConnected: mongoose.connection.readyState === 1 });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
