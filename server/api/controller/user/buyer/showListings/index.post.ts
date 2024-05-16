import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async () => {
  const controller = new viewListingsController();

  return await controller.viewListings();
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class viewListingsController {
  constructor() {}

  async viewListings() {

    const profileRepo = new Listing();
    return await profileRepo.viewListings();
  }
}