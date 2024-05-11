// index.search.ts
import { Listing as listingEntity } from "~/server/entity/listing.entity";

export default defineEventHandler(async (event) => {
  const searchQuery = getQuery(event).q; // Assume 'q' is the query parameter
  const userIdQuery = getQuery(event).userId;

  const controller = new SearchListingController();
  return await controller.searchListings(searchQuery, userIdQuery);
});

class SearchListingController {
  async searchListings(query: any, userIdQuery: any) {
    const listingRepo = new listingEntity();
    return await listingRepo.searchListings(query, userIdQuery);
  }
}
