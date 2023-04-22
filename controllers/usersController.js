const User = require('./models/user');
const usersControllers = {};

usersControllers.createUser = async (req, res) => {
  const { username, email, password, location, gender } = req.body;
  const user = new User({ username, email, password, location, gender });
  try {
    await user.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

usersControllers.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

usersControllers.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

usersControllers.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, location, gender } = req.body;
  try {
    await User.findByIdAndUpdate(id, { username, email, password, location, gender });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

usersControllers.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = usersControllers;
