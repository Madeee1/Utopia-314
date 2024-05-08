import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new updateSellerProfileController();

  return await controller.updateSeller(event);
});

class updateSellerProfileController {
  constructor() {}

  async updateSeller(event: any) {
    const body: any = await readBody(event);

    const userRepo = new userEntity();
    return await userRepo.updateSeller(event, body);
  }
}
