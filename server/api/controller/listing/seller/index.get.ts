import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getSellerListingController();

  const sellerIdQuery = getQuery(event).sellerId;
  return await controller.getListing(sellerIdQuery);
});

class getSellerListingController {
  constructor() {}

  async getListing(sellerIdQuery: any) {
    const listing = new listingEntity();
    return await listing.getSellerListings(sellerIdQuery);
  }
}
