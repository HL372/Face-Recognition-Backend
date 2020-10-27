const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'apples',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  database.users.push({
    email: email,
    name: name,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length-1]);

});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found= false;

  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      entries++;
      return res.json(user.entries);
    }
  });

  if(!found) {
    res.json('User not found');
  }
});

app.post('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found: false;

  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if(!found) {
    res.status(404).json('User not found');
  }
});

app.post('/signin', (req, res) => {
  if(req.body.email === database.users.email[0] && req.body.password === data.users.password[0]) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('Could not sign in to the website');
  }
});

app.listen('localhost:3002', () => {
  console.log('App is running on port 3002');
});
