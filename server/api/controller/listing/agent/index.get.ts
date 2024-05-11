import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getAgentListingController();

  const userIdQuery = getQuery(event).userId;
  return await controller.getAgentListing(userIdQuery);
});

class getAgentListingController {
  constructor() {}

  async getAgentListing(userIdQuery: any) {
    const listingRepo = new listingEntity();
    return await listingRepo.getAgentListing(userIdQuery);
  }
}
