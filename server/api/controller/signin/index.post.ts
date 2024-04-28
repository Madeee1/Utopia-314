import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST SIGNUP
export default defineEventHandler(async (event) => {
  const controller = new signInController();

  return await controller.signIn(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class signInController {
  constructor() {}

  async signIn(event: any) {
    const body: UserDto = await readBody(event);

    const userRepo = new userEntity();
    return await userRepo.signIn(event, body);
  }
}
