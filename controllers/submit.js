const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.get('/signup', (req, res) => {
    res.render('signup'); 
});

router.post('/views/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.location;
    const gender = req.body.gender;

    // object containing the user's information
    const submission = {
      username: username,
      email: email,
      password: password,
      location: location,
      gender: gender
    };

    // Save the submission to the database
    createSubmission(submission);

        // Return a response to the user
        res.send(`Thank you for signing up, ${username}!`); 
    });
    

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://menstrual:i0r3D6rayayhy5bo@sei.3zeldhq.mongodb.net/test';
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

module.exports = router;






//
// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const MongoStore = require('connect-mongo');


app.use(
    session({
        // The store needs to know that it's a mongo database and it needs access to the databases' connection
        store: MongoStore.create({ 
            mongoUrl: process.env.DATABASE_URL 
        }),
        // The secret ensures it's not some outside attack and it signs every session
        secret: process.env.SECRET,
        // No resaving the same same session and saving unitialized sessions
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30
            // This set the cookie to last for 30 days because it's in milliseconds
        }
    }),
)
/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////
app.set('view engine', 'ejs')
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.get('/', (req, res) => {
    res.send('default route')
})

const fruitsController = require('./controllers/fruits');
const userController = require('./controllers/users')
app.use('/fruits', fruitsController);
app.use('', userController);

// Listener
app.listen(process.env.PORT, () =>
	console.log(`express is listening on port: ${process.env.PORT}`)
);
