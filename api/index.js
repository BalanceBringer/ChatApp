const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require ('dotenv').config();

const app = express();
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));
mongoose.connect(process.env.MONGO_URL);




app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.post( '/register', async(req, res) => { //Async instead of then means the fuction will wait for the promise to resolve before continuing, allowing us to return the correct respone code
  const { username, password } = req.body;
  const CreatedUser = await User.create({ username, password })
  await jwt.sign({userID: CreatedUser._id}, process.env.JWT_SEC, {expiresIn: '2d'}, (err, token) => {
    throw err;
    res.cookie('token', token, {httpOnly: true}).sendStatus(201).json("ok");
  });
  res.json('User Created');
    
});

app.listen(3000);