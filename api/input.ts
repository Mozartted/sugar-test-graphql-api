
// import {schema} from "nexus"
import * as schema from "@nexus/schema"
import {GraphQLUpload, FileUpload} from "graphql-upload"

const LockInputEnum = schema.enumType({
  name: "LockInputEnum",
  members: ["LOCK", "UNLOCK"]
})

//  -- AUTHENTICATION INPUTS --
export const LoginInput = schema.inputObjectType({
    name: 'LoginInput',
    definition: (t)=>{
      t.string('email', {nullable: false})
    }
  })

export const ApartmentUploadInput = schema.inputObjectType({
  name: "ApartmentUploadInput",
  definition: t => {
    t.string("apartment_name", {required: true})
    t.field("doors_upload", {type: "Upload"})
    t.field("residents_upload", {type: "Upload"})
  }
})

export const ManageDoorInput = schema.inputObjectType({
  name: "ManageDoorInput",
  definition: t => {
    t.string("door_id")
    t.field("door_status", {type: LockInputEnum, default: "LOCK", required: true})
  }
})

// export const Activity = schema.inputObjectType({
//   name: "CommentInput",
//   definition: t => {
//     t.string("comment", {required: true})
//     t.field("attachment", {type: "Upload"})
//     t.string("order_id", {required: true, description: "the order we are commenting on"})
//   }
// })