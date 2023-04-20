
app.post('login.ejs', async (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user) {
      return res.render('login', { failure: 'Invalid email or password' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
      return res.render('login', { failure: 'Invalid email or password' });
  }
  req.session.userId = user.id;
  res.redirect('dashboard.ejs');
});



const users = [
  { id: 1, email: 'user1@example.com', password: '$2b$10$zva6Pr/p7iUogL6fyP7fQeARwt9M7YQnKbuI1kfPTq3l4z4fbsjJS' }, // password: "password1"
  { id: 2, email: 'user2@example.com', password: '$2b$10$rGDUe1A21q/QrEKfX0TtF.6AgkknsdH8WwZ1zvCAPlTxmsF.TkD8W' } // password: "password2"
];

function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

//failure
app.get('/views/login.ejs', (req, res) => {
  res.render("login.ejs", { failure: '' });
});