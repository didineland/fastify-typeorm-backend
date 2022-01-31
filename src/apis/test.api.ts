import { FastifyInstance, FastifyPluginOptions } from "fastify";

export class TestApi {


  public register(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any): void {

    fastify.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

    fastify.get('/', {}, async (request: any, reply: any) => {
      return "Authenticated";
    });

    done();
  }

}