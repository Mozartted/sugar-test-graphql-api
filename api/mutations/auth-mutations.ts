import { mutationField } from "@nexus/schema"
import { LoginInput} from "../input"
import {sign} from "jsonwebtoken"
import { APP_SECRET} from '../utils'
import { Context } from "../types"

const login = mutationField("login",{
    type: "AuthPayload",
    args: {
        input: LoginInput.asArg({required: true})
    },
    resolve: async (parent, {input}, ctx: Context) => {
        let user = await ctx.db.user.findOne({where: {email: input.email}})
        if (!user) {
            throw new Error(`No user found for email: ${input.email}`)
        }
        return {
            token : sign({userId: user.id}, APP_SECRET),
            user
        }
    }
});

export {
    login,
}