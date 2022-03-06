const { gql } = require("apollo-server-express");
const Movie = require("./models/movie").Movies;

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    producer: String!
    rating: Float!
  }
  type DeletedMovie {
    deletedCount: Int!
  }
  type Query {
    getAllMovies: [Movie]
    getAMovie(id: ID!): Movie
  }
  type Mutation {
    addAMovie(name: String!, producer: String!, rating: Float!): Movie
    updateAMovie(
      id: ID!
      name: String!
      producer: String!
      rating: Float
    ): Movie
    deleteAMovie(id: ID!): DeletedMovie
    deleteAllMovies: DeletedMovie
  }
`;
const resolvers = {
  Query: {
    getAllMovies: async (parent, args) => {
      return await Movie.find({});
    },
    getAMovie: async (parent, args) => {
      return await Movie.findById(args.id);
    },
  },
  Mutation: {
    addAMovie: (parent, args) => {
      let movie = new Movie({
        name: args.name,
        producer: args.producer,
        rating: args.rating,
      });
      return movie.save();
    },
    updateAMovie: async (parent, args) => {
      if (!args.id) return;
      return await Movie.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            name: args.name,
            producer: args.producer,
            rating: args.rating,
          },
        }
      );
    },
    deleteAMovie: async (parent, args) => {
      return await Movie.deleteOne({
        _id: args.id,
      });
    },
    deleteAllMovies: async (parent, args) => {
      return await Movie.deleteMany({});
    },
  },
};
module.exports = {
  typeDefs,
  resolvers,
};
