import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async () => {
  const controller = new viewOldListingController();

  return await controller.viewOldListing();
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class viewOldListingController {
  constructor() {}

  async viewOldListing() {

    const profileRepo = new Listing();
    return await profileRepo.viewOldListing();
  }
}