const { schemaComposer } = require('graphql-compose');
const queries = require('./Query');
const mutations = require('./Mutation');

schemaComposer.Query.addFields({
  ...queries,
});

schemaComposer.Mutation.addFields({
  ...mutations,
});

const schema = schemaComposer.buildSchema();

module.exports = schema;
