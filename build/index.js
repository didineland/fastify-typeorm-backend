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
const fastify_1 = require("fastify");
const test_endpoint_1 = require("./routes/test.endpoint");
require('dotenv').config();
const server = (0, fastify_1.fastify)();
const testEndpoint = new test_endpoint_1.TestEndpoint();
server.register(testEndpoint.register, { prefix: '/test' });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(3000);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
