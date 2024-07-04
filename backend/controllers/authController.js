
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../config/jwtConfig');

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    user = new User({
      username,
      password,
      role
    });

   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();


    const token = generateToken(user);

    res.status(201).json({"message":"new user register successfully",  token });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Server error while register' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = generateToken(user);

    res.status(200).json({"message":"login successfull",  token });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login
};
