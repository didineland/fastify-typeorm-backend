import { ListingState } from "../enums/listing-state.enum";

export interface PutListing {
  id: number;
  name: string,
  description: string,
  state: ListingState
}