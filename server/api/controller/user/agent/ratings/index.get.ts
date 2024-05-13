import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
  const controller = new getAgentRatingsController();
  const userIdQuery = getQuery(event).userId;

  return await controller.getRatings(userIdQuery);
});

class getAgentRatingsController {
  constructor() {}

  async getRatings(userIdQuery: any) {
    const user = new userEntity();
    return await user.getRatings(userIdQuery);
  }
}
