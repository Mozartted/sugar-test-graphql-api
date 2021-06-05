import { PrismaClient, User } from "@prisma/client"
import Redis from "ioredis"
import {RedisPubSub} from "graphql-redis-subscriptions"
import {Context} from "./types"

// setup the redis pubsub client
const options = {
  host: <string> (process.env.REDIS_HOST || "127.0.0.1"),
  port: <number>( process.env.REDIS_PORT || 6379),
  retryStrategy: (times: number)  => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};


const db = new PrismaClient()
const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
const prisma = db;
export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    db,
    prisma: prisma,
    pubSub: pubsub
  }
}
