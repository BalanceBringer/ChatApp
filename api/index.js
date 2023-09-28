const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
require ('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));
mongoose.connect(process.env.MONGO_URL);




app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.post( '/register', async(req, res) => { //Async instead of then means the fuction will wait for the promise to resolve before continuing, allowing us to return the correct respone code
  const { username, password } = req.body;
  try{
  const createdUser = await User.create({ username:username, password: bcrypt.hashSync(password, bcryptSalt) });
  jwt.sign({userId: createdUser._id,username}, process.env.JWT_SEC, {}, (err, token) => {
    res.json({"id": createdUser._id,username})
    .cookie('token', token, {sameSite: none})
    .sendStatus(201);
  });
  } catch (err) {
    res.status(400).json(err);
  }   
});

app.get('/profile', (req,res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, {}, (err, userStuff) => {
      if (err) throw err;
      res.json(userStuff);
    });
  } else {
    res.status(401).json('no token');
  }
});

app.post('/login', async (req, res) => {
const { username, password } = req.body;
const foundUser = await User.findOne({username});
if(foundUser){
  if(bcrypt.compare(password, foundUser.password)){
    jwt.sign({userId: foundUser._id, username}, process.env.JWT_SEC, {}, (err, token) => {
    
      res.json({id: foundUser._id, username})
      .cookie('token', token, {sameSite: none});   
    });
    } 
    else {
      res.sendStatus(401, 'Invalid login credentials');
    }
}
});

app.listen(3000);