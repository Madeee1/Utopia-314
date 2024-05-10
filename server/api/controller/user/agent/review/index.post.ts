import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new addAgentReviewController();

  return await controller.addAgentReview(event);
});

class addAgentReviewController {
  constructor() {}

  async addAgentReview(event: any) {
    const body = await readBody(event);

    const user = new userEntity();
    return await user.addAgentReview(body);
  }
}
