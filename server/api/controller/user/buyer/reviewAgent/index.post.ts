import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST delete PROFILE
export default defineEventHandler(async (event) => {
  const controller = new agentReviewController();

  return await controller.addBuyerReview(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class agentReviewController {
  constructor() {}

  async addBuyerReview(event: any) {
    const body: UserDto = await readBody(event);
    
    const userRepo = new userEntity();
    return await userRepo.addBuyerReview(body);
    
  }
}