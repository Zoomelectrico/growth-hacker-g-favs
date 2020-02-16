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
  ];
  res.status(200).json({
    success: true,
    sources,
  });
};

module.exports = { getSources };
