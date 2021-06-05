require('dotenv').config()
import { ApolloServer } from 'apollo-server-express'
import * as Http from 'http'
import {execute, subscribe} from "graphql"
import { makeSchema } from "@nexus/schema"
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { PrismaClient } from "@prisma/client"
import cors from "cors"
// import { PubSub } from "graphql-subscriptions"
import {SubscriptionServer, ConnectionContext} from "subscriptions-transport-ws"
// import agenda from "./services/agenda-service"
import {APP_SECRET, findUser, getUserId} from "./utils"
import permissions from "./permissions"
import {applyMiddleware} from "graphql-middleware"
// @ts-ignore
// import Agendash from "agendash"
import { createContext } from './context'
import * as Mutations from "./mutations"
import {DateTimeResolver, JSONObjectResolver} from "graphql-scalars"
import { GraphQLScalarType } from "graphql"
import createExpress, {request} from "express"
import * as Types from "./models"
import {Query} from "./query"
import {graphqlUploadExpress} from "graphql-upload"

const schemaStruct = {
    Mutation: {
        ...Mutations
    },
    ...Types,
    Query
}

let corsOptions = {
    origin: "*",
    credentials: true // <-- REQUIRED backend setting
  }


const schema = applyMiddleware(
    makeSchema({
        types: [schemaStruct],
        typegenAutoConfig: {
            sources: [
                {
                    source: require.resolve('.prisma/client/index.d.ts'),
                    alias: "prisma"
                },
                {
                    source: require.resolve('./context'),
                    alias: 'ContextModule'
                }
            ],
            contextType: 'ContextModule.Context'
        },
        plugins: [nexusSchemaPrisma({
            experimentalCRUD: true
        })],
        outputs: {
            typegen: __dirname + '/./generated/typings.ts',
            schema: __dirname + '/./generated/schema.graphql'
        }
    }),
    permissions
) 


const apollo = new ApolloServer({
    introspection: true,
    schema,
    context: (request: any) => {
        // console.log(request.req);
        return createContext({req: request.req})
    },
    uploads: false
})


const express = createExpress()

express.use(cors(corsOptions));
express.options("*", cors());
express.use('/graphql',graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }));
// express.use('/webhooks',router)
// express.use('/jobs', Agendash(agenda))
// express.use(async (req, res, next) => {
//     // await agenda.start()
//     next()
// })
apollo.applyMiddleware({ app: express })
const httpServer = Http.createServer(express)
// apollo.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: process.env.PORT || 4000 }, async () =>{

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${apollo.graphqlPath}`)
})