export class Listing {
  // This is the entity for the listing table
  constructor() {}

  async getListing(userIdQuery: any) {
    // This is the function that gets all the listings in the database
    try {
      const listings = await listingSchema.find({
        userId: parseInt(userIdQuery),
      });
      return { value: listings, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async createListing(body: any) {
    // This is the function that creates a new listing in the database
    try {
      const listing = new listingSchema({
        name: body.name,
        location: body.location,
        price: body.price,
        description: body.description,
        userId: body.userId,
      });
      await listing.save();
      return { value: listing, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async updateListing(body: any) {
    // This is the function that updates a listing in the database
    try {
      const listing = await listingSchema
        .findByIdAndUpdate(body._id, {
          name: body.name,
          location: body.location,
          price: body.price,
          description: body.description,
        })
        .exec();
      return { value: listing, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async deleteListing(body: any) {
    // This is the function that deletes a listing in the database
    try {
      const listing = await listingSchema.findByIdAndDelete(body._id).exec();
      return { value: listing, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async searchListings(query: string) {
    try {
      const listings = await listingSchema.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
        ],
      });
      return { value: listings, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }
}
