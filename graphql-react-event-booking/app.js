const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://bhembepreciouspt:prewsh000229@mern.5axes9f.mongodb.net/?retryWrites=true&w=majority&appName=MERN`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log('The server is listening on port 3000')
    });
  })
  .catch(err => {
    console.log(err);
  });
