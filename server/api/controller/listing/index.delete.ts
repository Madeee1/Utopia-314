import { Listing as listingEntity } from "~/server/entity/listing.entity";

export default defineEventHandler(async (event) => {
  const controller = new deleteListingController();

  return await controller.deleteListing(event);
});

class deleteListingController {
  constructor() {}

  async deleteListing(event: any) {
    const body = await readBody(event);

    const listingRepo = new listingEntity();
    return await listingRepo.deleteListing(body);
  }
}
