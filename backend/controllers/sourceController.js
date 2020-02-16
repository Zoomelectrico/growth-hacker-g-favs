const getSources = (req, res) => {
  const sources = [
    {
      key: 'vehicles',
      name: 'Vehicles',
      type: 'graphql',
    },
    {
      key: 'computers',
      name: 'Computers',
      type: 'graphql',
    },
    {
      key: 'shoes',
      name: 'Shoes',
      type: 'graphql',
    },
    {
      key: 'candies',
      name: 'Candies',
      type: 'rest',
      endpoints: {
        one: 'http://locahost:3000/candy/:id',
        many: 'http://locahost:3000/candies',
      },
    },
  ];
  res.status(200).json({
    success: true,
    sources,
  });
};

module.exports = { getSources };
