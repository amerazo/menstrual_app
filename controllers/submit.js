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

module.exports = router;
