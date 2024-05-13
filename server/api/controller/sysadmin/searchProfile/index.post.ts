import { profileEntity } from "~/server/entity/profile.entity";
import { profileDto } from "~/server/entity/dto/profile.dto";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new searchPController();

  return await controller.searchP(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class searchPController {
  constructor() {}

  async searchP(event: any) {
    const body: profileDto = await readBody(event);

    const profileRepo = new profileEntity();
    return await profileRepo.searchP(event, body);
  }
}