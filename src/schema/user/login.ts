import { extendType, nonNull, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "src/context";

const LoginResponse = objectType({
  name: "LoginResponse",
  description: "An object containing login information",
  definition(t) {
    t.string("accessToken", {
      description: "The token used to authenticate the user",
    });
  },
});

const Login = extendType({
  type: "Mutation",
  definition(t) {
    t.field("login", {
      type: "LoginResponse",
      args: {
        email: nonNull(stringArg({ description: "The user's email" })),
        password: nonNull(stringArg({ description: "The user's password" })),
      },
      resolve: async (_, { email, password }, ctx: Context) => {
        const user = await ctx.prisma.user.findFirst({
          where: { OR: [{ email }, { nickname: email }] },
          select: { id: true, password: true },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET || ""
        );

        return { accessToken };
      },
    });
  },
});

export default [Login, LoginResponse];
