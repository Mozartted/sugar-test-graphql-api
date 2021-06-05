import * as schema from "@nexus/schema"
import {stringArg} from "@nexus/schema"
import { getUserId } from "./utils"
import {Context} from "./types"
import {AcmeService} from "./services/door-service"

const acmeService = new AcmeService()

export const Query = schema.queryType({
  definition(t) {
    t.list.field('residents', {
      type: 'User',
      resolve: async (_root, _args, ctx)  =>{ 
        return await ctx.db.user.findMany({where: {
          role: "RESIDENT"
        }})
      }
    })

    t.field("my_access", {
      type: 'MyAccess',
      resolve: async (_root, _args, ctx: Context) => {
        let userId = getUserId(ctx)
        let user = await ctx.db.user.findOne({where: {id: userId}});
        if(!user){
          throw new Error("Unauthenticated user")
        }

        // get the doors of the user and check their status
        let doors = await ctx.db.user.findOne({where: {id: user.id}}).doors();
      
        let doorsState = doors.map(async (door) => {
          // get the status of the door.
          let doorStatus = await acmeService.getDeviceInfo(door.acme_id)
          if(!doorStatus){
            return {...door, status: "LOCKED"}
          }

          switch (doorStatus.locked) {
            case true:
              return {...door, status: "LOCKED"}
              break;
            case false:
              return {...door, status: "UNLOCKED"}
              break;
          }
        })

        return {
          me: user,
          doors: doorsState
        }
      }
    })

    t.list.field("apartments", {
      type: "Apartment",
      resolve: async (_root, _args, ctx: Context) => {
        return await ctx.db.apartment.findMany();
      }
    })

  }
})