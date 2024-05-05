import { Listing as listingEntity } from "~/server/entity/listing.entity";

export default defineEventHandler(async (event) => {
    const controller = new createListingController();
    
    return await controller.createListing(event);
    }
);

class createListingController {
    constructor() {}
    
    async createListing(event: any) {
        const body = await readBody(event);

        const listingRepo = new listingEntity();
        return await listingRepo.createListing(body);
    }
}