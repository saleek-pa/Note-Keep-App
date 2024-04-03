const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });

  return res.status(201).json({
    status: 'success',
    message: 'Registration successfull',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email not found. Please register.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect Password. Try again.' });
  }

  const token = jwt.sign({ email, userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    status: 'success',
    message: 'Login successfull',
    data: token,
  });
};

module.exports = { register, login };
