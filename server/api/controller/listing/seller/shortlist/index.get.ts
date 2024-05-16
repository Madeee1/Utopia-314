import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getSellerListingShortlistCountController();

  const sellerIdQuery = getQuery(event).sellerId;
  return await controller.getSellerListingShortlistCount(sellerIdQuery);
});

class getSellerListingShortlistCountController {
  constructor() {}

  async getSellerListingShortlistCount(sellerIdQuery: any) {
    const listing = new listingEntity();
    return await listing.getSellerListingShortlistCount(sellerIdQuery);
  }
}
