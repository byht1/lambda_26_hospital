import { mergeSchemas } from "@graphql-tools/schema";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const movies = [
  { id: "1", name: "111111", genre: "GENRE_1111", directorId: "4" },
  { id: "2", name: "222222", genre: "GENRE_2222", directorId: "1" },
  { id: "3", name: "333333", genre: "GENRE_3333", directorId: "3" },
  { id: "4", name: "444444", genre: "GENRE_4444", directorId: "2" },
  { id: "5", name: "555555", genre: "GENRE_5555", directorId: "3" },
  { id: "6", name: "666666", genre: "GENRE_6666", directorId: "2" },
  { id: "7", name: "777777", genre: "GENRE_7777", directorId: "1" },
  { id: "8", name: "888888", genre: "GENRE_8888", directorId: "1" },
];

const directors = [
  { id: "1", name: "101010", age: 55 },
  { id: "2", name: "202020", age: 50 },
  { id: "3", name: "303030", age: 35 },
  { id: "4", name: "404040", age: 97 },
];

interface Movie {
  id: string;
  name: string;
  genre: string;
  directorId: string;
}

interface MovieArgs {
  id: string;
}

const MovieType: GraphQLObjectType = new GraphQLObjectType<Movie>({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorsType,
      resolve(parent: Movie) {
        return directors.find(({ id }) => id === parent.directorId);
      },
    },
  }),
});

const DirectorsType: GraphQLObjectType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve({ id }: MovieArgs) {
        return movies.filter(({ directorId }) => directorId === id);
      },
    },
  }),
});

const moviesQuery = {
  type: new GraphQLList(MovieType),
  resolve() {
    return movies;
  },
};

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(_: any, args: MovieArgs) {
        return movies.find(({ id }) => id === args.id);
      },
    },
    movies: moviesQuery,

    director: {
      type: DirectorsType,
      args: { id: { type: GraphQLString } },
      resolve(_: any, args: MovieArgs) {
        return directors.find(({ id }) => id === args.id);
      },
    },
    directors: {
      type: new GraphQLList(DirectorsType),
      resolve() {
        return directors;
      },
    },
  },
});

const Query2 = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie2: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(_: any, args: MovieArgs) {
        return movies.find(({ id }) => id === args.id);
      },
    },
    movies: moviesQuery,

    director2: {
      type: DirectorsType,
      args: { id: { type: GraphQLString } },
      resolve(_: any, args: MovieArgs) {
        return directors.find(({ id }) => id === args.id);
      },
    },
    directors2: {
      type: new GraphQLList(DirectorsType),
      resolve() {
        return directors;
      },
    },
  },
});

export const GraphModuleMovie1 = new GraphQLSchema({
  query: Query,
});
export const GraphModuleMovie2 = new GraphQLSchema({
  query: Query2,
});

export const GraphModuleMovie = mergeSchemas({
  schemas: [GraphModuleMovie1, GraphModuleMovie2],
});
