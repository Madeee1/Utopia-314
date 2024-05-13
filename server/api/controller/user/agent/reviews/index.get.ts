import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new getAgentReviewsController();
  const userIdQuery = getQuery(event).userId;

  return await controller.getReviews(userIdQuery);
});

class getAgentReviewsController {
  constructor() {}

  async getReviews(userIdQuery: any) {
    const user = new userEntity();
    return await user.getReviews(userIdQuery);
  }
}
