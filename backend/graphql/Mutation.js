const { BrandTC, ComputerTC, ShoeTC, VehicleTC } = require('../models');

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
};

module.exports = Mutations;
