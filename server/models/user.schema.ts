import { defineMongooseModel } from "#nuxt/mongoose";
import bcrypt from "bcrypt";
import { Document, Types } from "mongoose";

export const userSchema = defineMongooseModel({
  name: "User",
  schema: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    // @ts-ignore
    uuid: {
      type: Types.ObjectId,
      required: true,
      unique: true,
      default: () => new Types.ObjectId(),
    },
  },
  hooks(schema) {
    // Add a pre-save hook to hash the password
    schema.pre("save", async function (next) {
      const user: any = this;
      if (!user.isModified("hashPassword")) return next();
      // Hash the password
      user.hashPassword = await bcrypt.hash(user.hashPassword, 10);
      return next();
    });
  },
});
