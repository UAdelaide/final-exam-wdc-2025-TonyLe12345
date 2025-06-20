const express = require('express');
const path = require('path');
var session = require('express-session')
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'LebronJames', // need to change to process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // change back to true after if using https
    httpOnly: true 
  }
}));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;