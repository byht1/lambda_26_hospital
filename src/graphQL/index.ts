import { mergeSchemas } from "@graphql-tools/schema";
import clinicsSchemaGraphQL from "./clinics/resolver";

const SchemaGraphQL = mergeSchemas({
  schemas: [clinicsSchemaGraphQL],
});

export default SchemaGraphQL;
