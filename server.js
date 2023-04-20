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



// Home Route
app.get('/', (req, res) => {
    res.render("index.ejs");
})

//Symptoms Test Route
app.get('/views/symptoms', (req, res) => {
    res.render("symptoms.ejs");
})

// About Route
app.get('/views/about.ejs', (req, res) => {
    res.render("about.ejs");
})

// Login Route
app.get('/login', (req, res) => {
    res.render("login.ejs", { failure: '' });
  });


//logout route that clears the user's session and redirects to the login page
app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('login.ejs');
  });
  

//Need to add post logic
app.post('login.ejs', (req, res) => {
});


//Session Details
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config();
console.log(process.env.SESSION_SECRET);



//Submit 
const submitController = require('./controllers/submit');
app.use('', submitController);


// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

