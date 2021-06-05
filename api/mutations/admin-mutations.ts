import { mutationField } from "@nexus/schema"
import {SignupInput , ApartmentUploadInput} from "../input"
import {sign} from "jsonwebtoken"
import {hash, compare} from "bcrypt"
import { APP_SECRET, getUserId, generateUUID, generateNormalUUID} from '../utils'
// import agenda from "../services/agenda-service"
import {ApartmentImportService} from "../services/apartment-import-service"
import { Context } from "../types"


const uploadResidents = mutationField("uploadResidents",{
    type: "Apartment",
    args: {
        input: ApartmentUploadInput.asArg({required: true})
    },
    resolve: async (root, {input}, ctx: Context) => {
        // console.log(input)
        // create apartment
        const apartment = await ctx.db.apartment.create({
            data: {
                name: input.apartment_name
            }
        })

        // create the units/doors for the apartment
        const {createReadStream: doorReadStream} = await input.doors_upload
        const {createReadStream: residentReadStream} = await input.residents_upload

        const doorStreamObject = doorReadStream();
        const residentStreamObject = residentReadStream();
        // we have to use the file yuploads to create the different objects to the sets.
        await ApartmentImportService(doorStreamObject, residentStreamObject, apartment);
        return apartment;
    }
});

export {
    uploadResidents
}