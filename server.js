// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

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

//Submit 
const submitController = require('./controllers/submit');
app.use('', submitController);

// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });


