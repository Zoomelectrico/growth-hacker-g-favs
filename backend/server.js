require('dotenv').config({ path: './variables.env' });
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema');

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`🤩🍃 MongoDB is Running`);
  })
  .catch(err => {
    console.log(`❌🤬 ${err}`);
    process.exit();
  });

mongoose.connection.on('error', err => console.log(`❌🤬 ${err}`));

require('./models/Brand');
require('./models/Computer');
require('./models/Shoe');
require('./models/User');
require('./models/Vehicle');

const app = require('./app');

const server = new ApolloServer({
  schema,
  context: integrationContext => ({
    req: integrationContext.req,
    res: integrationContext.res,
  }),
});

server.applyMiddleware({
  app,
});

app.listen({ port: app.get('port') }, () => {
  console.log(`Express server running on http://localhost:${app.get('port')}`);
  console.log(`🚀 Server ready at http://localhost:${app.get('port')}${server.graphqlPath}`);
});
