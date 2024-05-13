import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new addSellerReviewController();

  return await controller.addSellerReview(event);
});

class addSellerReviewController {
  constructor() {}

  async addSellerReview(event: any) {
    const body = await readBody(event);

    const user = new userEntity();
    return await user.addSellerReview(body);
  }
}
