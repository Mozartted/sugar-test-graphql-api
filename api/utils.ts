import {PrismaClient} from "@prisma/client"
// import * as fs from "fs"
import * as uuid from "uuid";

const uuidGenerator = uuid.v4
const db = new PrismaClient()
export const APP_SECRET = process.env.JWT_SECRET || ""


interface Token {
    userId: string
}
export const  generateUUID = () => {
    const code = uuidGenerator();
    return ('TRANS_REF-'+code+'_PMCK')
}

export const generateNormalUUID = () => {
    let generatedCode = uuidGenerator()
    const code = generatedCode.substring(generatedCode.length - 11);
    return code
}

export const generateBaseUUID = () => {
    // uuid.substring(uuid.length() - 16);
    let generatedUUIDBase = uuidGenerator()
    return generatedUUIDBase.substring(generateBaseUUID.length - 16);;
}