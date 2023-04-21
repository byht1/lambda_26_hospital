import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import "./db/repository/clinics/clinicsRepository";

import { getEnv } from "helpers";
import SchemaGraphQL from "./graphQL";

const PORT = +getEnv("PORT", "5000");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/graphql", graphqlHTTP({ schema: SchemaGraphQL, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
