import { RouteShorthandOptions } from "fastify"

export class UserSchema {
  public static readonly postUserOptions: RouteShorthandOptions = {
    schema: { 
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['Investor', 'Sponsor'] }
        },
        required: ['email', 'password', 'role'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        }
      }

    }
  } 
}