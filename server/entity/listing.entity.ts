export class Listing {
  // This is the entity for the listing table
  constructor() {}

  async getAgentListing(userIdQuery: any) {
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
        sellerId: body.sellerId,
        agentUsername: body.agentUsername,
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

  async searchListings(query: string, userIdQuery: any) {
    try {
      const listings = await listingSchema.find({
        $and: [
          { userId: parseInt(userIdQuery) },
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { location: { $regex: query, $options: "i" } },
            ],
          },
        ],
      });
      return { value: listings, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async getSellerListings(sellerIdQuery: any) {
    try {
      const listings = await listingSchema.find({
        sellerId: parseInt(sellerIdQuery),
      });
      return { value: listings, ok: true };
    } catch (error: any) {
      return { value: false, ok: false, error: error.message };
    }
  }

  async viewListings() {
    try{
    const listings = await listingSchema.find({
      status: "On Sale",
    });
    const response = await listingSchema.updateMany(
      { status: "On Sale" },
      { $inc: { views: 1 } }
    );
    
    return {
      ok: true,
      listings: listings,
    };
  }catch(error: any){
    return { 
      value: false, 
      ok: false, 
      error: error.message 
    };
    }
  }

  async viewOldListing() {
    try{
    const listings = await listingSchema.find({
      status: "Sold"
    });
    
    return {
      ok: true,
      listings: listings,
    };
  }catch(error: any){
    return { 
      value: false, 
      ok: false, 
      error: error.message 
    };
    }
  }

  async searchListing(body: any) {
    try{
    const listings = await listingSchema.find({
      name:body.name, 
      status: "On Sale",
    });
    
    return {
      ok: true,
      listings: listings,
    };
  }catch(error: any){
    return { 
      value: false, 
      ok: false, 
      error: error.message 
    };
    }
  }

  async searchOldListing(body: any) {
    try{
    const listings = await listingSchema.find({
      name:body.name, 
      status: "Sold"
    });
    
    return {
      ok: true,
      listings: listings,
    };
  }catch(error: any){
    return { 
      value: false, 
      ok: false, 
      error: error.message 
    };
    }
  }

  async calculateMortgage(body: any) {  
    console.log(body.listingId);
    try{
    const listings = await listingSchema.find({
      id:body.listingId, 
    }
  );
    
    return {
      ok: true,
      listings: listings,
    };
    }catch(error: any){
      return { 
        value: false, 
        ok: false, 
        error: error.message 
      };
    }
  }
  
}
