const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { BrandTC } = require('./Brand');

mongoose.Promise = global.Promise;

const computerSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: 'Please provide a price',
  },
  ram: {
    type: Number,
    required: 'Please provide an amount of ram',
  },
  disk: {
    type: Number,
    required: 'Please provide a disk size',
  },
  processor: {
    type: String,
    required: 'Please provide a processor maker / model / gen',
  },
  usbPorts: {
    type: Number,
    required: 'Please provide a quantity of usb ports',
  },
  screenSize: {
    type: Number,
    required: 'Please provide the size of the screen',
  },
});

// TODO: Slug this

const Computer = mongoose.model('Computer', computerSchema);
const ComputerTC = composeWithMongoose(Computer);

ComputerTC.addRelation('brand', {
  resolver: () => BrandTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.brand,
  },
});

module.exports = { Computer, ComputerTC };
