import { fastify } from 'fastify'
import { AuthApi } from './apis/auth.api'
import { createConnection } from 'typeorm'
import { User } from './models/user.model'
import { UserService } from './services/users.service'
import jwt from 'fastify-jwt'
import { readFileSync } from 'fs'
import { ListingApi } from './apis/listing.api'
import 'dotenv/config' 
import cors from 'fastify-cors'
import { Listing } from './models/listing'
import { ListingService } from './services/listings.service'
import { UserApi } from './apis/user.api'
import { UserRole } from './enums/user-role.enum'

require('dotenv').config()

const server = fastify({ logger: true })

const userService = new UserService();
const userEndpoint = new AuthApi(userService);
const listingEndpoint = new ListingApi(new ListingService());
const userApi = new UserApi(userService);

server.register(jwt, {
  secret: {
    private: readFileSync('./keys/private_key.pem', 'utf8'),
    public: readFileSync('./keys/public_key.pem', 'utf8')
  },
  sign: { algorithm: 'RS256' }
})
server.register(cors, { });

server.register(userEndpoint.register, { prefix: '/api/authentication' });
server.register(listingEndpoint.register, { prefix: '/api/listings' });
server.register(userApi.register, { prefix: '/api/users' });

const start = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: false,
      entities: [
        User, Listing
      ]
    });

    /*UserService.instance.createUser({
      email: 'adrien.taprest@gmail.com',
      password: 'billbucket',
      role: UserRole.Admin 
    }) */

    /*var listing = new Listing();
    listing.name = "listing"
    listing.description = 'description'
    listing.state = ListingState.New
    listing.user = user
    Listing.save(listing)*/
    

    await server.listen(3000);
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()