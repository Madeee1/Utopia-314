import { profileEntity } from "~/server/entity/profile.entity";
import { profileDto } from "~/server/entity/dto/profile.dto";

// CONTROLLER LAYER FOR POST CREATE PROFILE
export default defineEventHandler(async (event) => {
  const controller = new suspendPController();

  return await controller.suspendProfile(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class suspendPController {
  constructor() {}

  async suspendProfile(event: any) {
    const body: profileDto = await readBody(event);

    const profileRepo = new profileEntity();
    return await profileRepo.suspendProfile(event, body);
  }
}