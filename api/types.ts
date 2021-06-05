import { PrismaClient, User } from "@prisma/client"
// import {User} from "nexus-plugin-prisma/client"
import {Request} from "express"
import { PubSub } from "graphql-subscriptions"

export interface Context{
  db: PrismaClient,
  pubSub: PubSub,
  req: Request,
  currentUser?: User,
  params: any
}

const db = new PrismaClient()
const pubsub = new PubSub()

export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    db,
    pubsub
  }
}

export interface File {
  id: string,
  path: string,
  filename: string,
  mimetype: string,
  encoding: string
}