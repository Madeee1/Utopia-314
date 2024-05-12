import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new viewPController();

  return await controller.suspendUser(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class viewPController {
  constructor() {}

  async suspendUser(event: any) {
    const body: UserDto = await readBody(event);

    const profileRepo = new userEntity();
    return await profileRepo.suspendUser(event, body);
  }
}