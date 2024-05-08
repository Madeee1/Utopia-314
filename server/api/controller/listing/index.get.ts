import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getListingController();

  const userIdQuery = getQuery(event).userId;
  return await controller.getListing(userIdQuery);
});

class getListingController {
  constructor() {}

  async getListing(userIdQuery: any) {
    const listingRepo = new listingEntity();
    return await listingRepo.getListing(userIdQuery);
  }
}
