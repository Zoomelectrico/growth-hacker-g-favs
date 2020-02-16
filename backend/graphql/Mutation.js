const { schemaComposer } = require('graphql-compose');
const { BrandTC, ComputerTC, ShoeTC, VehicleTC, Computer, Shoe, Vehicle, User } = require('../models');

const addToFavorites = schemaComposer.createResolver({
  name: 'addToFavorites',
  description: 'Add an Item to the Favorites',
  type: 'type apiMessage { success: Boolean!, msg: String, err: String }',
  args: {
    userId: 'String!',
    favoriteId: 'String!',
  },
  async resolve({ args }) {
    const [computer, shoe, vehicle, user] = await Promise.all([
      Computer.findById(args.favoriteId),
      Shoe.findById(args.favoriteId),
      Vehicle.findById(args.favoriteId),
      User.findById(args.userId),
    ]);
    if (!user) {
      throw new Error('User not found!');
    }
    if (!computer && !shoe && !vehicle) {
      throw new Error('Item not found!');
    }
    user.favorites = [...user.favorites, args.favoriteId].filter(x => !!x);
    await User.findOneAndUpdate({ _id: user._id }, { favorites: user.favorites }, { new: true, runValidators: true });
    return {
      success: true,
      msg: 'Item added to favorites',
    };
  },
});

const deleteFromFavorites = schemaComposer.createResolver({
  name: 'deleteFromFavorites',
  description: 'Delete an Item from the Favorites',
  type: 'type apiMessage { success: Boolean!, msg: String, err: String }',
  args: {
    userId: 'String!',
    favoriteId: 'String!',
  },
  async resolve({ args }) {
    const [computer, shoe, vehicle, user] = await Promise.all([
      Computer.findById(args.favoriteId),
      Shoe.findById(args.favoriteId),
      Vehicle.findById(args.favoriteId),
      User.findById(args.userId),
    ]);
    if (!user) {
      throw new Error('User not found!');
    }
    if (!computer && !shoe && !vehicle) {
      throw new Error('Item not found!');
    }
    user.favorites = [...user.favorites].filter(id => String(id) !== String(args.favoriteId));
    await User.findOneAndUpdate({ _id: user._id }, { favorites: user.favorites }, { new: true, runValidators: true });
    return {
      success: true,
      msg: 'Item deleted from favorites',
    };
  },
});

const Mutations = {
  createBrand: BrandTC.getResolver('createOne'),
  updateBrand: BrandTC.getResolver('updateOne'),
  deleteBrand: BrandTC.getResolver('removeOne'),
  createComputer: ComputerTC.getResolver('createOne'),
  updateComputer: ComputerTC.getResolver('updateOne'),
  deleteComputer: ComputerTC.getResolver('removeOne'),
  createShoe: ShoeTC.getResolver('createOne'),
  updateShoe: ShoeTC.getResolver('updateOne'),
  deleteShoe: ShoeTC.getResolver('removeOne'),
  createVehicle: VehicleTC.getResolver('createOne'),
  updateVehicle: VehicleTC.getResolver('updateOne'),
  deleteVehicle: VehicleTC.getResolver('removeOne'),
  addToFavorites,
  deleteFromFavorites,
};

module.exports = Mutations;
