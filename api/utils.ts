import { verify } from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
import {Context} from "./types"
// import * as fs from "fs"
import * as uuid from "uuid";

const uuidGenerator = uuid.v4
const db = new PrismaClient()
export const APP_SECRET = process.env.JWT_SECRET || ""


interface Token {
    userId: string
}

export function getUserId(context: Context) {
    // console.log(context.req, "request object")
    const Authorization =context.req ?  context.req.header('Authorization') : context.params.Authorization
    // const userId = token.userId
    if( Authorization && APP_SECRET){
        const token = Authorization.replace('Bearer ', '')
        const verifiedToken = verify(token, APP_SECRET) as Token
        return verifiedToken && verifiedToken.userId
    }
    throw new Error("Unauthenticated user")
}

export const findUser = async (token: string) => {
    let user = await db.user.findOne({where: {id: token}})
    return user;
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