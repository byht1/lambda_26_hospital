import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

const locationGraphQLType = new GraphQLObjectType({
  name: "location",
  fields: () => ({
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  }),
});

export const clinicsGraphQLType = new GraphQLObjectType({
  name: "clinics",
  fields: () => ({
    id: { type: GraphQLString },
    longName: { type: GraphQLString },
    pms: { type: GraphQLString },
    metaTitle: { type: GraphQLString },
    metaDescription: { type: GraphQLString },
    slug: { type: GraphQLString },
    website: { type: GraphQLString },
    clinicName: { type: GraphQLString },
    displayOnWeb: { type: GraphQLString },
    link: { type: GraphQLString },
    city: { type: GraphQLString },
    suburb: { type: GraphQLString },
    state: { type: GraphQLString },
    postcode: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    location: { type: locationGraphQLType },
  }),
});
