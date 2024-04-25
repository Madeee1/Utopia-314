import { userEntity } from "~/server/entity/user.entity";
import { UserDto } from "~/server/entity/dto/user.dto";

// CONTROLLER LAYER FOR POST SIGNUP
export default defineEventHandler(async (event) => {
  const controller = new signUpController();

  return await controller.signUp(event);
});

// Gets data driectly from boundary layer
// Does business logic here, and constructs entity object to interact with database
class signUpController {
  constructor() {}

  async signUp(event: any) {
    const body: UserDto = await readBody(event);

    const userRepo = new userEntity();
    return await userRepo.signUp(event, body);
  }
}
