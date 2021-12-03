import { extendType, intArg, nonNull } from "nexus";
import { Context } from "src/context";

const user = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg({ description: "The user's ID" })),
      },
      resolve: async (parent, { id }, ctx: Context) => {
        let user = await ctx.prisma.user.findUnique({
          where: { id },
        });

        return user;
      },
    });
  },
});

export default [user];
