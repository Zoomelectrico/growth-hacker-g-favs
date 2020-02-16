const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Computer = mongoose.model('Computer');
const Shoe = mongoose.model('Shoe');
const Vehicle = mongoose.model('Vehicle');

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
    const [computers, shoes, vehicles] = await Promise.all([
      Computer.find({ _id: { $in: user.favorites } }).populate('brand'),
      Shoe.find({ _id: { $in: user.favorites } }).populate('brand'),
      Vehicle.find({ _id: { $in: user.favorites } }).populate('brand'),
    ]);
    const favorites = [...computers, ...shoes, ...vehicles].filter(fav => !!fav);
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        slug: user.slug,
        favorites,
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
    const [computers, shoes, vehicles] = await Promise.all([
      Computer.find({ _id: { $in: user.favorites } }).populate('brand'),
      Shoe.find({ _id: { $in: user.favorites } }).populate('brand'),
      Vehicle.find({ _id: { $in: user.favorites } }).populate('brand'),
    ]);
    const favorites = [...computers, ...shoes, ...vehicles].filter(fav => !!fav);
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        slug: user.slug,
        favorites,
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

const getCurrentUser = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(200).json({ success: false, err: 'No one is logged in' });
    }
    const payload = jwt.decode(req.cookies.token);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(500).json({ success: false, err: 'There is an issue with the DB' });
    }
    const [computers, shoes, vehicles] = await Promise.all([
      Computer.find({ _id: { $in: user.favorites } }).populate('brand'),
      Shoe.find({ _id: { $in: user.favorites } }).populate('brand'),
      Vehicle.find({ _id: { $in: user.favorites } }).populate('brand'),
    ]);
    const favorites = [...computers, ...shoes, ...vehicles].filter(fav => !!fav);
    return res.status(200).json({
      success: true,
      token: req.cookies.token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        slug: user.slug,
        favorites,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = { createUser, signIn, signOut, getCurrentUser };
