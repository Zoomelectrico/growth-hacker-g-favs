const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const createUser = async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });
    if (users && users.length > 0) {
      return res.status(200).json({ success: false, err: 'This email is already register' });
    }
    const user = await User.create({ ...req.body });
    const token = jwt.sign({ iat: Date.now(), id: user._id }, process.env.SECRET);
    res.cookie('token', token, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        slug: user.slug,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ success: false, err: `The email : password doesn't match` });
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status(200).json({ success: false, err: `The email : password doesn't match` });
    }
    const token = jwt.sign({ iat: Date.now(), id: user._id }, process.env.SECRET);
    res.cookie('token', token, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        slug: user.slug,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

const signOut = async (req, res) => {
  try {
    const payload = jwt.decode(req.cookies.token);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(500).json({ success: false, err: `Ups! Houston we have a problem` });
    }
    res.clearCookie('token');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = { createUser, signIn, signOut };
