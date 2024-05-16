import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST delete PROFILE
export default defineEventHandler(async (event) => {
  const controller = new editBuyerInfoController();

  return await controller.editBuyerInfo(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class editBuyerInfoController {
  constructor() {}

  async editBuyerInfo(event: any) {
    const body: UserDto = await readBody(event);
    console.log(body);
    
    const userRepo = new userEntity();
    return await userRepo.editBuyerInfo(event, body);
    
  }
}