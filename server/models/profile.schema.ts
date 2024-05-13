import { defineMongooseModel } from "#nuxt/mongoose";
import { Document, Types } from "mongoose";

export const profileSchema = defineMongooseModel({
  name: "Profile",
  schema: {
    profile: {
      type: String,
      required: true,
      unique: true,
    },
    suspended:{
      type: Boolean,
      required: false,
      default: false,
    }
  },
});
