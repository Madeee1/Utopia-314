import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new updateBuyerProfileController();

  return await controller.updateBuyer(event);
});

class updateBuyerProfileController {
  constructor() {}

  async updateBuyer(event: any) {
    const body: any = await readBody(event);

    const userRepo = new userEntity();
    return await userRepo.updateBuyer(event, body);
  }
}
