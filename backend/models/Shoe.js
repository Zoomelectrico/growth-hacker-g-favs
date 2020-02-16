const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { BrandTC } = require('./Brand');

mongoose.Promise = global.Promise;

const ShoeSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Please provide a Brand',
    ref: 'Brand',
  },
  photo: String,
  model: {
    type: String,
    required: 'Please provide a model',
  },
  sizes: [
    {
      type: Number,
      required: 'Please provide a size',
    },
  ],
  color: {
    type: String,
    required: 'Please provide a color',
  },
  style: {
    type: String,
    required: 'Please provide a shoes style',
  },
  price: {
    type: Number,
    required: 'Please provide a price',
  },
});

// TODO: Slug this

const Shoe = mongoose.model('Shoe', ShoeSchema);
const ShoeTC = composeWithMongoose(Shoe);

ShoeTC.addRelation('brand', {
  resolver: () => BrandTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.brand,
  },
});

module.exports = { Shoe, ShoeTC };
