import { GraphQLScalarType } from "graphql";
import { makeSchema, objectType, scalarType } from "nexus";
import * as models from "nexus-prisma";

import { getDefinition } from "src/utils/getDefinition";

import user from "./user";
import game from "./game";

const filteredModels = Object.fromEntries(
  Object.entries(models).filter(([name]) => !name.startsWith("$"))
);

const modelTypes = Object.entries(filteredModels).map(([name, model]) =>
  objectType({
    name,
    definition: getDefinition(model),
    // @ts-ignore
    description: model.$description,
  })
);

const Json = new GraphQLScalarType({
  name: "Json",
  serialize: (data: any) => data,
  parseValue: (data: any) => data,
});

const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
  description: "Date scalar type",
});

export default makeSchema({
  types: [...user, ...game, Json, DateTime, ...modelTypes],
});
