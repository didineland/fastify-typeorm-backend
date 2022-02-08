import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserRole } from "../enums/user-role.enum";
import { PostUser } from "../interfaces/create-user.interface";
import { UserService } from "../services/users.service";
import { ScopeUtils } from "../utils/scope.utils";
import { UserSchema } from "./schemas/user.schema";


export class UserApi {


  private static _instance: UserApi;
  public static get instance(): UserApi {
    return UserApi._instance;
  }
  constructor(private userService: UserService) {
    UserApi._instance = this;
  }

  public register(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any): void {

    fastify.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })


    fastify.post('/', {... UserSchema.postUserOptions, preHandler: ScopeUtils.isAdmin}, async (request: any, reply: any) => {
      return UserApi.instance.postUser(request, reply);
    });

    done();
    
  }

  public async postUser(request: any, reply: any) {

    const createUser: PostUser = {
      email: request.body.email,
      password: request.body.password,
      role: UserRole[request?.body?.role as keyof typeof UserRole]
    };

    try {
      const user = await this.userService.createUser(createUser);
      reply.code(201).send();
    } catch (err) {
      request.log.error(err);
      reply.code(400).send();
    }
  } 
}