import { CustomError } from "../apis/custom-error";
import { PutListing } from "../interfaces/put-listing.interface";
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

  async put(requestorId: number, putListing: PutListing): Promise<Listing> {
    let existingOffer = await Listing.findOne({ id: putListing.id }, { relations: ['user']});

    if (!existingOffer) {
      throw new CustomError(404)
    }

    if (existingOffer.user.id != requestorId) {
      throw new CustomError(403)
    }

    existingOffer.name = putListing.name;
    existingOffer.description = putListing.description;
    existingOffer.state = putListing.state;  

    return Listing.save(existingOffer);    
  }

}