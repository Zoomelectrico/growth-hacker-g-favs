const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { BrandTC } = require('./Brand');

mongoose.Promise = global.Promise;

const vehicleSchema = new mongoose.Schema({
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
  doors: {
    type: Number,
    required: 'Please provide an amount of doors ',
  },
  transmission: {
    type: String,
    required: 'Please provide a transmission',
  },
  motor: {
    type: String,
    required: 'Please provide a motor type',
  },
  used: {
    type: Boolean,
    required: 'Please say if the vehicle is new',
    default: false,
  },
});

// TODO: Slug this

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const VehicleTC = composeWithMongoose(Vehicle);

VehicleTC.addRelation('brand', {
  resolver: () => BrandTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.brand,
  },
});

module.exports = { Vehicle, VehicleTC };
