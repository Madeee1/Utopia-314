import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new searchUController();

  return await controller.searchUser(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class searchUController {
  constructor() {}

  async searchUser(event: any) {
    const body: UserDto = await readBody(event);

    const profileRepo = new userEntity();
    return await profileRepo.searchUser(event, body);
  }
}