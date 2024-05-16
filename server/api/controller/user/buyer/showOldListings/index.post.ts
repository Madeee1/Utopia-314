import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async () => {
  const controller = new viewOController();

  return await controller.viewOldListing();
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class viewOController {
  constructor() {}

  async viewOldListing() {

    const profileRepo = new Listing();
    return await profileRepo.viewOldListing();
  }
}