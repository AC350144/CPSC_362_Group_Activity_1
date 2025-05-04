const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//('dotenv').config({ path: __dirname + '/.env' });       this was used for running locally
//require('dotenv').config({ path: __dirname + '/.env' });

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/listings', require('./routes/listingsRoutes'));
app.use('/api/bookings', require('./routes/bookingsRoutes'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
});

// MongoDB connection and server setup

console.log('MONGO_URI is:', process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // This is required for Render
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch(err => console.error(err));
  
module.exports = app;