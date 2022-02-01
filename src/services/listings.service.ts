import { Listing } from "../models/listing";

export class ListingService {

  private static _instance: ListingService;
  public static get instance(): ListingService {
    return ListingService._instance;
  }

  constructor() {
    ListingService._instance = this;
  }

  async getAll(): Promise<Listing[] | undefined> {
    return Listing.find();
  }

  async getOne(id: number): Promise<Listing | undefined> {
    return Listing.findOne({ id });
  }

}