/// <reference path="./generated/typings.ts" />
import * as schema from "@nexus/schema"
import {GraphQLUpload} from "graphql-upload"
import * as prismaSchema from "nexus-plugin-prisma/schema"
// @ts-ignore

const DoorStatusEnum = schema.enumType({
    name: 'DoorStatusEnum',
    members: [
      "LOCKED",
    "UNLOCKED"
    ],
  })

// User model
export const User = schema.objectType({
    name: "User",
    definition: (t) => {
        t.model.id()
        t.model.first_name()
        t.model.last_name()
        t.model.email()
        t.model.doors()
        // t.model.Wallet
    }
})

export const Door = schema.objectType({
    name: "Door",
    definition: t => {
        t.model.id()
        t.model.name()
        t.model.residents()
        t.model.acme_id()
    }
})

export const Apartment = schema.objectType({
    name: "Apartment",
    definition: t => {
        t.model.id()
        t.model.name()
        t.model.doors()
        t.model.users()
    }
})

export const OnlineDoor = schema.objectType({
    name: "OnlineDoor",
    definition: t => {
        t.string("id", {description: "ID of the door"}),
        t.string("name", {description: "Name of the door"}),
        t.string("acme_id", {description: "Acme of the door"}),
        t.field("status", {type: DoorStatusEnum})
    }
})

export const MyAccess = schema.objectType({
    name: "MyAccess",
    definition: t => {
        // my deatail and the details and status of my doors.
        t.field("me", {type: "User"})
        t.list.field("doors", {type: OnlineDoor})
    }
})

export const File = schema.objectType({
    name: "File",
    definition: t => {
        t.id("id")
        t.string("path")
        t.string("filename")
        t.string("mimetype")
        t.string("encoding")
    }
})

export const AuthPayload = schema.objectType({
    name: "AuthPayload",
    definition: t => {
        t.string("token")
        t.field("user", {
            type: "User"
        })
    }
})


export const Upload = GraphQLUpload;