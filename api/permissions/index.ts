  
import {rule, shield, or} from "graphql-shield"
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        const userId = getUserId(ctx)
        return Boolean(userId)
    }
)

export default shield({
    Query: {
        my_access: isAuthenticated,
        // filterPosts: isAuthenticated,
        // post: isAuthenticated
    },
    Mutation: {
        my_access: isAuthenticated,
        manageDoor: isAuthenticated
        // createOrder: isAuthenticated,
        // createOffer: isAuthenticated,
        // handleOffer: isAuthenticated,
        // createInstantOrder: isAuthenticated,
        // notifyBitcoinWallet: isAuthenticated,
        // sendTokensToUser: isAuthenticated
        // createDraft: isAuthenticated,
        // deletePost: isAuthenticated,
        // publish: isAuthenticated
    }
}, {
    fallbackError: (e: any) => e
})