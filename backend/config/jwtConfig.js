

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
