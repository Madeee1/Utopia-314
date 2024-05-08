import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new updateAgentProfileController();

  return await controller.updateAgent(event);
});

class updateAgentProfileController {
  constructor() {}

  async updateAgent(event: any) {
    const body: any = await readBody(event);

    const userRepo = new userEntity();
    return await userRepo.updateAgent(event, body);
  }
}
