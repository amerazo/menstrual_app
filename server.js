// Dependencies
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    res.render("index.ejs");
})

// About Route
app.get('/views/about.ejs', (req, res) => {
    res.render("about.ejs");
})

// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });