import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new testSController();

  return await controller.testSearch(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class testSController {
  constructor() {}

  async testSearch(event: any) {

    const profileRepo = new Listing();
    return await profileRepo.testSearch(event);
  }
}