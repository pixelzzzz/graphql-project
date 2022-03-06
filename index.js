const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const url = "mongodb://localhost:27017/moviesdb";
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then(
  (db) => {
    console.log("Connected correctly to server!");
  },
  (err) => {
    console.log(err);
  }
);
async function startServer() {
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();
const app = express();
app.use(bodyParser.json());
app.use("*", cors());
app.listen({ port: 4000 }, () => console.log(`Server ready`));
