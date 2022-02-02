import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ListingState } from "../enums/listing-state.enum";
import { UserRole } from "../enums/user-role.enum";
import { PutListing } from "../interfaces/put-listing.interface";
import { ListingService } from "../services/listings.service";
import { ScopeUtils } from "../utils/scope.utils";
import { CustomError } from "./custom-error";
import { ListingSchema } from "./listing.schema";

export class ListingApi {

  private static _instance: ListingApi;
  public static get instance(): ListingApi {
    return ListingApi._instance;
  }
  constructor(private listingService: ListingService) {
    ListingApi._instance = this;
  }


  public register(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any): void {

    fastify.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

    fastify.get('/', ListingSchema.getAllOptions, async (request: any, reply: any) => {
      return ListingApi.instance.getAllListings();
    });

    fastify.get('/:id', ListingSchema.getOneOptions, async (request: any, reply: any) => {
      const listing = await ListingApi.instance.getOne(request.params.id);
      if(listing) {
        return listing;
      } else {
        reply.code(204).send();
      }      
    });

    fastify.put('/:id', {...ListingSchema.putOptions, preHandler: ScopeUtils.isInvestor}, async (request: any, reply: any) => {
      var putListing: PutListing = {
        id: request.params.id,
        name: request.body.name,
        description: request.body.description,
        state: ListingState[request?.body?.state as keyof typeof ListingState]
      }
      try {
        return await ListingApi.instance.put(request.user.id ,putListing);
      }
      catch(error) {
        if(error instanceof CustomError) {
          reply.code(error.code).send();
        }
        else {
          throw error;
        }
      }
    });

    done();
  }

  async getAllListings() {
    return this.listingService.getAll();
  }

  async getOne(id: number) {
    return this.listingService.getOne(id);
  }

  async put(requestorId: number, putListing: PutListing) {
    return this.listingService.put(requestorId, putListing);
  }
}