import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getSellerListingViewsController();

  const sellerIdQuery = getQuery(event).sellerId;
  return await controller.getSellerListingViews(sellerIdQuery);
});

class getSellerListingViewsController {
  constructor() {}

  async getSellerListingViews(sellerIdQuery: any) {
    const listing = new listingEntity();
    return await listing.getSellerListingViews(sellerIdQuery);
  }
}
