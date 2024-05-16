import { profileEntity } from "~/server/entity/profile.entity";
import { profileDto } from "~/server/entity/dto/profile.dto";

// CONTROLLER LAYER FOR POST delete PROFILE
export default defineEventHandler(async (event) => {
  const controller = new deleteProfileController();

  return await controller.deleteProfile(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class deleteProfileController {
  constructor() {}

  async deleteProfile(event: any) {
    const body: profileDto = await readBody(event);

    const profileRepo = new profileEntity();
    return await profileRepo.deleteProfile(event, body);
  }
}