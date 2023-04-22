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
// replace process.env.SESSION_SECRET with secret string.

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


// Set up database connection
// mongoose.connect('mongodb+srv://menstrual:i0r3D6rayayhy5bo@sei.3zeldhq.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Database connected');
// });


//Period Schema
const periodSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  flowLength: Number,
  notes: String,
  flowLevel: String,
  cramps: String,
  emotional: String,
  physical: String,
  otherPhysical: String,
  discharge: String,
  temperature: Number,
});

// Create data model
const Period = mongoose.model('Period', periodSchema);

// Home Route
app.get('/', (req, res) => {
    res.render("home.ejs");
})

// About Route
app.get('/views/about.ejs', (req, res) => {
  res.render("about.ejs");
})

app.get('/periods', async (req, res) => {
  const periods = await Period.find({});
  res.render('index', { periods });
});

app.get('/periods/new', (req, res) => {
  res.render('new');
});

app.post('/periods', async (req, res) => {
  const period = new Period(req.body.period);
  await period.save();
  res.redirect('/periods');
});

app.get('/periods/:id', async (req, res) => {
  const period = await Period.findById(req.params.id);
  res.render('show', { period });
});

app.get('/periods/:id/edit', async (req, res) => {
  const period = await Period.findById(req.params.id);
  res.render('edit', { period });
});

app.put('/periods/:id', async (req, res) => {
  const { id } = req.params;
  const period = await Period.findByIdAndUpdate(id, { ...req.body.period });
  res.redirect(`/periods/${period.id}`);
});

app.delete('/periods/:id', async (req, res) => {
  const { id } = req.params;
  await Period.findByIdAndDelete(id);
  res.redirect('/periods');
});



// Listener
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

