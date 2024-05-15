import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async () => {
  const controller = new testLController();

  return await controller.allListings();
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class testLController {
  constructor() {}

  async allListings() {

    const profileRepo = new Listing();
    return await profileRepo.allListings();
  }
}