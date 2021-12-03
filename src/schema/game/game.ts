import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "src/context";

const game = extendType({
  type: "Query",
  definition(t) {
    t.field("game", {
      type: "Game",
      args: {
        code: nonNull(stringArg({ description: "The game code" })),
      },
      resolve: async (parent, args, ctx: Context) => {
        const game = await ctx.prisma.game.findUnique({
          where: { code: args.code },
        });

        return game;
      },
    });
  },
});

export default [game];
