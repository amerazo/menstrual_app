const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
const router = express.Router();
// const { render } = require('ejs');


router.get('/signup', (req, res) => {
    res.render('signup'); 
});

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.location;
    const gender = req.body.gender;
    res.send(`Thank you for signing up, ${username}!`); 
});

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://angelicaerazo22:qXUybw0gcKDQQTTa@sei.3zeldhq.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createSubmission(submission) {
  try {
    await client.connect();
    const database = client.db('menstrual_app');
    const submissions = database.collection('submissions');
    await submissions.insertOne(submission);
    console.log('Submission saved to database');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = (req, res) => {
  const submission = {
    name: req.body.name,
    email: req.body.email,
    symptoms: req.body.symptoms,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    intensity: req.body.intensity,
    painLocation: req.body.painLocation,
  };
  createSubmission(submission);
  res.render('submit', { title: 'Submitted!' });
};


module.exports = (req, res) => {
  const submission = {
    name: req.body.name,
    email: req.body.email,
    symptoms: req.body.symptoms,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    intensity: req.body.intensity,
    painLocation: req.body.painLocation,
  };
  createSubmission(submission);
  res.render('submit', { title: 'Submitted!' });
};

module.exports = router;



