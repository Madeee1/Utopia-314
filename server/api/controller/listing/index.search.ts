// index.search.ts
import { Listing as listingEntity } from "~/server/entity/listing.entity";

export default defineEventHandler(async (event) => {
  const searchQuery = event.context.query.q; // Assume 'q' is the query parameter
  const controller = new SearchListingController();
  return await controller.searchListings(searchQuery);
});

class SearchListingController {
  async searchListings(query: string) {
    const listingRepo = new listingEntity();
    return await listingRepo.searchListings(query);
  }
}
