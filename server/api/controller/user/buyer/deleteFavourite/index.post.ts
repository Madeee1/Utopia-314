import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new deleteFController();

  return await controller.deleteFavouriteListing(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class deleteFController {
  constructor() {}

  async deleteFavouriteListing(event: any) {
    const body = await readBody(event);

    const profileRepo = new userEntity();
    return await profileRepo.deleteFavouriteListing(body);
  }
}