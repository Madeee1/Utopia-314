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
    id: {
      type: Number,
      required: false,
      unique: true,
    },
    // @ts-ignore
    uuid: {
      type: Types.ObjectId,
      required: true,
      unique: true,
      default: () => new Types.ObjectId(),
    },
    reviews: {
      type: [String],
      required: false,
    },
    ratings: {
      type: [Number],
      required: false,
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

    // Add a hook so that the id field is auto-incremented
    schema.pre("save", async function (next) {
      const user: any = this;
      if (!user.isNew) return next();
      // Get the last user in the database
      const lastuser = await userSchema.findOne().sort({ id: -1 });
      if (lastuser) {
        user.id = lastuser.id + 1;
      } else {
        user.id = 1;
      }
      return next();
    });
  },
});
