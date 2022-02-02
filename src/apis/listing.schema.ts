import { RouteShorthandOptions } from "fastify"

export class ListingSchema {
  public static readonly getAllOptions: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            state: { type: 'string' }
          }
        }
      }

    }
  }

  public static readonly getOneOptions: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            state: { type: 'string' }
          }
        }
      }

    }
  }

  public static readonly putOptions: RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          state: { type: 'string' }
        },
        required: ['name', 'description', 'state']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            state: { type: 'string' }
          }
        }
      }

    }
  }
}