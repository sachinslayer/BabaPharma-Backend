const express = require('express');
const app = express();

const bcrypt = require("bcrypt")
const router =  express.Router();
const jwt=require ("jsonwebtoken")
const Sign = require('../models/SignUp');

// Define the SECRET_KEY
const SECRET_KEY = 'Socialparty1234';


router.post('/SignUp', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await Sign.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sign = new Sign({ username, email, password: hashedPassword });
    await sign.save();

    const token = jwt.sign({ email: sign.email, id: sign._id }, SECRET_KEY);

    res.status(201).json({ user: sign, token: token, message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save signup data', error: error.message });
  }
});

router.get('/Signin', async (req, res) => {
    try {
      const signs = await Sign.find();
      res.json(signs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  router.get('/Loggedin', async (req, res) => {
    try {
      const signupData = await Sign.findOne({ email: req.query.email });
  
      if (!signupData) {
        return res.status(404).json({ message: 'Signup data not found' });
      }
  
      res.json(signupData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the provided email
    const sign = await Sign.findOne({ email });
  
    if (!sign) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const matchPassword =await bcrypt.compare(password,sign.password);
  
    // Check if the provided password matches the stored password
    if (!matchPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    
    }
  
    // If the email and password are valid, you can generate an authentication token or session here
    const token=jwt.sign({
      email:sign.email
    },SECRET_KEY);
    res.status(201).json({user:sign,token:token})
  
    
  });



module.exports = router;