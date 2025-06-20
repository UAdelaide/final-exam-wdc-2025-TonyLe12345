const express = require('express');
const path = require('path');
var session = require('express-session');
require('dotenv').config();
var cors = require('cors');

const app = express();
var loginRouter = require('./routes/login');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'LebronJames',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
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