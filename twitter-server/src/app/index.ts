import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";


import bodyparser from 'body-parser';
import { json } from "body-parser";
// --- IGNORE ---


export async function initServer(){
    const app = express();
app.use(json());

    app.use(bodyparser.json());
    const apolloServer = new ApolloServer({
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


    await apolloServer.start();

    app.use('/graphql', json(), expressMiddleware(apolloServer));
    
    return app;
}