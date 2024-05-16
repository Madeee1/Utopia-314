import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST delete PROFILE
export default defineEventHandler(async (event) => {
  const controller = new agentRatingController();

  return await controller.addBuyerRating(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class agentRatingController {
  constructor() {}

  async addBuyerRating(event: any) {
    const body: UserDto = await readBody(event);
    
    const userRepo = new userEntity();
    return await userRepo.addBuyerRating(body);
    
  }
}