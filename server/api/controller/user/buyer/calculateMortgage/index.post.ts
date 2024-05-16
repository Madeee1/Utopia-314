import { Listing } from "~/server/entity/listing.entity";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {

  const controller = new CalculateMortgageController();
  return await controller.calculateMortgage(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class CalculateMortgageController {
  constructor() {}

  async calculateMortgage(event: any) {
    const body = await readBody(event);

    const profileRepo = new Listing();
    return await profileRepo.calculateMortgage(body);
  }
}