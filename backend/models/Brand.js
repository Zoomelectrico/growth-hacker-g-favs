const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

mongoose.Promise = global.Promise;

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide a name',
  },
});

const Brand = mongoose.model('Brand', brandSchema);
const BrandTC = composeWithMongoose(Brand);

module.exports = { Brand, BrandTC };
