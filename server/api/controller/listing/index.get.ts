import { Listing as listingEntity } from "~/server/entity/listing.entity";

// This is the controller for the GET /listing endpoint
export default defineEventHandler(async (event) => {
  const controller = new getListingController();

  return await controller.getListing();
});

class getListingController {
  constructor() {}

  async getListing() {
    const listingRepo = new listingEntity();
    return await listingRepo.getListing();
  }
}
