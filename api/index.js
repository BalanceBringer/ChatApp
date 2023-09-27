const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require ('dotenv').config();

const app = express();
app.use(express.json());
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
  const createdUser = await User.create({ username, password });

  

  jwt.sign({userId: createdUser._id}, process.env.JWT_SEC, {}, (err, token) => {
    if(err) throw err;
    
    res.json({"id": createdUser._id})
    .cookie('token', token)
    .sendStatus(201);
   
     
   
  });

  
  } catch (err) {
    res.status(400).json(err);
  }
  
    
});

app.listen(3000);