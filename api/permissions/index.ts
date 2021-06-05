  
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
        me: isAuthenticated,
        // filterPosts: isAuthenticated,
        // post: isAuthenticated
    },
    Mutation: {
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
    // Subscription: {
    //     offer_created: isAuthenticated
    // }
}, {
    fallbackError: (e: any) => e
})