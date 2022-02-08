import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Login } from "../interfaces/login.interface";
import { UserService } from "../services/users.service";
import { AuthSchema } from "./schemas/auth.schema";
import * as fs from 'fs';


export class AuthApi {

  private readonly publicKey: Buffer;

  private static _instance: AuthApi;
  public static get instance(): AuthApi {
    return AuthApi._instance;
  }
  constructor(private userService: UserService) {
    AuthApi._instance = this;
    this.publicKey = fs.readFileSync('./keys/public_key.pem');
  }

  public register(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any): void {

    fastify.post('/login', AuthSchema.loginOptions, async (request: any, reply: any) => {
      return AuthApi.instance.processLogin(request, reply);
    });

    fastify.get('/key', { ...AuthSchema.keyOptions }, async (request: any, reply: any) => {
      return AuthApi.instance.processGetKey(request, reply);
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