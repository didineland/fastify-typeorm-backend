import { fastify } from 'fastify'
import { UserApi } from './apis/user.api'
import { createConnection } from 'typeorm'
import { User } from './models/user.model'
import { UserService } from './services/users.service'
import jwt from 'fastify-jwt'
import { readFileSync } from 'fs'
import { TestApi } from './apis/test.api'
import 'dotenv/config' 

require('dotenv').config()

const server = fastify({ logger: true })

const userService = new UserService();
const userEndpoint = new UserApi(userService);
const testEndpoint = new TestApi();


server.register(jwt, {
  secret: {
    private: readFileSync('./keys/private_key.pem', 'utf8'),
    public: readFileSync('./keys/public_key.pem', 'utf8')
  },
  sign: { algorithm: 'RS256' }
})

server.register(userEndpoint.register, { prefix: '/api/authentication' });
server.register(testEndpoint.register, { prefix: '/test' });

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
        User
      ]
    });

    await server.listen(3000);

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()