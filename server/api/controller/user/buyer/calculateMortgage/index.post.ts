import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new CMController();

  return await controller.calculateMortgage(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class CMController {
  constructor() {}

  async calculateMortgage(event: any) {
    const profileRepo = new Listing();
    return await profileRepo.calculateMortgage(event);
    
  }
}