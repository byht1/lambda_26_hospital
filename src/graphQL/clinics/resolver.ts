import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { clinicsRepository } from "db/repository";
import { clinicsGraphQLType } from "./graphQLType";

const {
  getAll,
  getById,
  getByCity,
  getBySuburb,
  getByState,
  getByPostcode,
  getBySlug,
  getByLink,
} = clinicsRepository;

type TSearchId = { id: string };
type TSearchCity = { city: string };
type TSearchSuburb = { suburb: string };
type TSearchState = { state: string };
type TSearchPostcode = { postcode: string };
type TSearchSlug = { slug: string };
type TSearchLink = { link: string };

const Query = new GraphQLObjectType({
  name: "clinicsQuery",
  fields: {
    clinics: {
      type: new GraphQLList(clinicsGraphQLType),
      resolve: () => getAll(),
    },
    clinicById: {
      type: clinicsGraphQLType,
      args: { id: { type: GraphQLString } },
      resolve: (_, { id }: TSearchId) => getById(id),
    },
    clinicsByCity: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { city: { type: GraphQLString } },
      resolve: (_, { city }: TSearchCity) => getByCity(city),
    },
    clinicsBySuburb: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { suburb: { type: GraphQLString } },
      resolve: (_, { suburb }: TSearchSuburb) => getBySuburb(suburb),
    },
    clinicsByState: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { state: { type: GraphQLString } },
      resolve: (_, { state }: TSearchState) => getByState(state),
    },
    clinicsByPostcode: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { postcode: { type: GraphQLString } },
      resolve: (_, { postcode }: TSearchPostcode) => getByPostcode(postcode),
    },
    clinicsBySlug: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { slug: { type: GraphQLString } },
      resolve: (_, { slug }: TSearchSlug) => getBySlug(slug),
    },
    clinicsByLink: {
      type: new GraphQLList(clinicsGraphQLType),
      args: { link: { type: GraphQLString } },
      resolve: (_, { link }: TSearchLink) => getByLink(link),
    },
  },
});

const clinicsSchemaGraphQL = new GraphQLSchema({
  query: Query,
});

export default clinicsSchemaGraphQL;
