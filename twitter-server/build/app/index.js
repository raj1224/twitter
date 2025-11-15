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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = initServer;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const body_parser_2 = require("body-parser");
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, body_parser_2.json)());
        app.use(body_parser_1.default.json());
        const apolloServer = new server_1.ApolloServer({
            typeDefs: `
        type Query {
            sayHello: String
        }

        type Mutation {
            _empty: String
        }
    `,
            resolvers: {
                Query: {
                    sayHello: () => 'Hello, world!',
                },
                Mutation: {
                    _empty: () => "Empty"
                }
            },
        });
        yield apolloServer.start();
        app.use('/graphql', (0, body_parser_2.json)(), (0, express4_1.expressMiddleware)(apolloServer));
        return app;
    });
}
