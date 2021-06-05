import { mutationField } from "@nexus/schema"
import {ManageDoorInput} from "../input"
import {sign} from "jsonwebtoken"
import {hash, compare} from "bcrypt"
import { APP_SECRET, getUserId, generateUUID, generateNormalUUID} from '../utils'
// import agenda from "../services/agenda-service"
import {Helmet} from "./modules/helmet"
import { Context } from "../types"
import {AcmeService} from "../services/door-service"

const acmeService = new AcmeService();


const manageDoor = mutationField("manageDoor",{
    type: "OnlineDoor",
    args: {
        input: ManageDoorInput.asArg({required: true})
    },
    resolve: async (root, args, ctx: Context) => {
        // console.log(input)
        let userId = getUserId(ctx);
        if(!userId){
            throw new Error("Authentication error")
        }
        let user = await ctx.db.user.findOne({where: {id: userId}})

        if(!user){
            throw new Error("Unauthenticated request")
        }
        // create apartment
        // get the door.
        let door = await ctx.db.door.findOne({where: {
            id: args.input.door_id
        }})
        if(!door){
            throw new Error("door not found")
        }
        let doorResident = await ctx.db.door.findOne({where: {
            id: args.input.door_id
        }}).residents({ 
            where: {id: user.id}
        })
        if(!doorResident){
            throw new Error("No matching resident")
        }

        let response = null
        if(door && doorResident){
            switch (args.input.door_status) {
                case "LOCK":
                    // make the request to lock the door.
                    response = await acmeService.lockDevice(door.acme_id);
                    if(response){
                        return {...door, status: "LOCKED"}
                    }
                    break;
                case "UNLOCK":
                    response = await acmeService.unlockDevice(door.acme_id);
                    if(response){
                        return {...door, status: "UNLOCKED"}
                    }
                    break;
            }
        }
    }
});

export {
    manageDoor
}