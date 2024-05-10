import { defineMongooseModel } from "#nuxt/mongoose";
import { defineMongooseConnection } from "#nuxt/mongoose";

export const listingSchema = defineMongooseModel({
  name: "Listing",
  schema: {
    id: {
      type: Number,
      required: false,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: {
      type: [String],
      required: false,
    },
    userId: {
      type: Number,
      required: true,
    },
    views: {
      type: "Number",
      default: 0,
    },
    shortlistNumber: {
      type: "Number",
      default: 0,
    },
    sellerId: {
      type: Number,
      required: true,
    },
    agentUsername: {
      type: String,
      required: true,
    },
  },
  hooks(schema) {
    // Add a hook so that the id field is auto-incremented
    schema.pre("save", async function (next) {
      const listing: any = this;
      if (!listing.isNew) return next();
      // Get the last listing in the database
      const lastListing = await listingSchema.findOne().sort({ id: -1 });
      if (lastListing) {
        listing.id = lastListing.id + 1;
      } else {
        listing.id = 1;
      }
      return next();
    });
  },
});
