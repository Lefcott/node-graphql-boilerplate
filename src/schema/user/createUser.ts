import { extendType, stringArg } from "nexus";

import bcrypt from "bcryptjs";

import { Context } from "src/context";

const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      description: "Creates a new user",
      args: {
        name: stringArg({ description: "The user's name" }),
        surname: stringArg({ description: "The user's surname" }),
        phone: stringArg({ description: "The user's phone" }),
        nickname: stringArg({ description: "The user's nickname" }),
        email: stringArg({ description: "The user's email" }),
        password: stringArg({ description: "The user's plain password" }),
      },
      resolve: async (parent, args, ctx: Context) => {
        const password = bcrypt.hashSync(args.password, 10);

        const user = await ctx.prisma.user
          .create({
            data: {
              ...args,
              password,
            },
          })
          .catch((e) => {
            console.log(e);
          });
        return user;
      },
    });
  },
});

export default [createUser];
