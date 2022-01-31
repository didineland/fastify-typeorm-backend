import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Login } from "../interfaces/login.interface";
import { UserService } from "../services/users.service";
import { UserSchema } from "./user.schema";
import * as fs from 'fs';


export class UserApi {

  private readonly publicKey: Buffer;

  private static _instance: UserApi;
  public static get instance(): UserApi {
    return UserApi._instance;
  }
  constructor(private userService: UserService) {
    UserApi._instance = this;
    this.publicKey = fs.readFileSync('./keys/public_key.pem');
  }

  public register(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any): void {

    fastify.post('/login', UserSchema.loginOptions, async (request: any, reply: any) => {
      return UserApi.instance.processLogin(request, reply);
    });

    fastify.get('/key', { ...UserSchema.keyOptions }, async (request: any, reply: any) => {
      return UserApi.instance.processGetKey(request, reply);
    });

    done();

  }

  public async processLogin(request: any, reply: any) {

    const login: Login = {
      email: request.body.email,
      password: request.body.password
    };

    try {
      const user = await this.userService.logUser(login);
      return {
        token: await reply.jwtSign({
          email: user.email,
          id: user.id,
          role: user.role
        })
      };
    } catch (err) {
      reply.code(400).send();
    }
  }

  public processGetKey(request: any, reply: any) {
    return { publicKey: this.publicKey };
  }
}