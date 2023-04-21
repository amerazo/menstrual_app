// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const bcrypt = require('bcrypt');
const session = require('express-session');

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(morgan('dev'));
// replace process.env.SESSION_SECRET with your own secret string.

//Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


// Home Route
app.get('/', (req, res) => {
    res.render("index.ejs");
})

// About Route
app.get('/views/about.ejs', (req, res) => {
  res.render("about.ejs");
})

//Symptoms Test Route
app.get('/views/symptoms', (req, res) => {
    res.render("symptoms.ejs");
})

// Login Route
app.get('/users/login', (req, res) => {
    res.render("login.ejs", { failure: '' });
  });


//Session Details
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// const dotenv = require('dotenv');
// dotenv.config();
// require('dotenv').config();
// console.log(process.env.SESSION_SECRET);


// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

