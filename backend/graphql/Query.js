const { BrandTC, ComputerTC, ShoeTC, VehicleTC } = require('../models');

const Queries = {
  brand: BrandTC.getResolver('findOne'),
  brands: BrandTC.getResolver('findMany'),
  brandsPagination: BrandTC.getResolver('pagination'),
  computer: ComputerTC.getResolver('findOne'),
  computers: ComputerTC.getResolver('findMany'),
  computersPagination: ComputerTC.getResolver('pagination'),
  shoe: ShoeTC.getResolver('findOne'),
  shoes: ShoeTC.getResolver('findMany'),
  shoesPagination: ShoeTC.getResolver('pagination'),
  vehicle: VehicleTC.getResolver('findOne'),
  vehicles: VehicleTC.getResolver('findMany'),
  vehiclesPagination: VehicleTC.getResolver('pagination'),
};

module.exports = Queries;
