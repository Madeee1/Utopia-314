import { userEntity } from "~/server/entity/user.entity";

export default defineEventHandler(async (event) => {
    const controller = new addSellerRatingController();
    
    return await controller.addSellerRating(event);
    }
);

class addSellerRatingController {
    constructor() {}
    
    async addSellerRating(event: any) {
        const body = await readBody(event);

        const user = new userEntity();
        return await user.addSellerRating(body);
    }
}