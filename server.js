const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const trackRouter = require('./controllers/tracks.js')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
// server.js
// Other imports above
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }));
// All other server code below

// Routes go here

app.use('/tracks', trackRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});
