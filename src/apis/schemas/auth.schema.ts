import { RouteShorthandOptions } from "fastify"

export class AuthSchema {
  public static readonly loginOptions: RouteShorthandOptions = {
    schema: {
      // querystring: {
      //   type: 'object',
      //   required: ['name'],
      //   properties: {
      //     name: {
      //       type: 'string'
      //     }
      //   }
      // },
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['email', 'password'],
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

  public static readonly keyOptions: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            publicKey: { type: 'string' }
          }
        }
      }

    }
  }
}