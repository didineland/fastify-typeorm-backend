"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEndpoint = void 0;
class TestEndpoint {
    register(fastify, opts, done) {
        fastify.get('/', TestEndpoint.opts, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return { hello: `${request.query.name}` };
        }));
        done();
    }
}
exports.TestEndpoint = TestEndpoint;
TestEndpoint.opts = {
    schema: {
        querystring: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    }
};
