import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new addFController();

  return await controller.addFavourite(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class addFController {
  constructor() {}

  async addFavourite(event: any) {
    const profileRepo = new Listing();
    return await profileRepo.addFavourite(event);
    
  }
}