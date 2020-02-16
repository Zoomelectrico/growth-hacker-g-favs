const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Computer = mongoose.model('Computer');
const Shoe = mongoose.model('Shoe');
const Vehicle = mongoose.model('Vehicle');

const getFavorites = async (req, res) => {
  try {
    if (!req.cookies.token) {
      console.log(1);
      return res.status(500).json({ success: false, err: 'No one is logged in!' });
    }
    const payload = jwt.decode(req.cookies.token);
    const user = await User.findById(payload.id);
    if (!user) {
      console.log(2);
      return res.status(500).json({ success: false, err: 'No one is logged in!' });
    }
    const [computers, shoes, vehicles] = await Promise.all([
      Computer.find({ _id: { $in: user.favorites } }).populate('brand'),
      Shoe.find({ _id: { $in: user.favorites } }).populate('brand'),
      Vehicle.find({ _id: { $in: user.favorites } }).populate('brand'),
    ]);
    const favorites = [...computers, ...shoes, ...vehicles].filter(fav => !!fav);
    res.status(200).json({
      success: true,
      favorites,
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = { getFavorites };
