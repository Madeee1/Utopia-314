import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
    const controller = new addAgentRatingController();
    
    return await controller.addAgentRating(event);
    }
);

class addAgentRatingController {
    constructor() {}
    
    async addAgentRating(event: any) {
        const body = await readBody(event);

        const user = new userEntity();
        return await user.addAgentRating(body);
    }
}