import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async () => {
  const controller = new viewLController();

  return await controller.viewListing();
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class viewLController {
  constructor() {}

  async viewListing() {

    const profileRepo = new Listing();
    return await profileRepo.viewListing();
  }
}