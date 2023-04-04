// Dependencies
const express = require('express');
const app = express();
const ejs = require('ejs');

// Home Route
app.get('/', (req, res) => {
    res.send('Landing Page')
})

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });