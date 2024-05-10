import { Listing as listingEntity } from "~/server/entity/listing.entity";

export default defineEventHandler(async (event) => {
  const controller = new updateListingController();

  return await controller.updateListing(event);
});

class updateListingController {
  constructor() {}

  async updateListing(event: any) {
    const body = await readBody(event);

    const listingRepo = new listingEntity();
    return await listingRepo.updateListing(body);
  }
}
