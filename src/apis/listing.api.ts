import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ListingService } from "../services/listings.service";

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

    fastify.get('/', {}, async (request: any, reply: any) => {
      return ListingApi.instance.getAllListings();
    });

    fastify.get('/:id', {}, async (request: any, reply: any) => {
      const listing = await ListingApi.instance.getOne(request.params.id);
      if(listing) {
        return listing;
      } else {
        reply.code(204).send();
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

}