import * as AuthMutations from "./auth-mutations"
import * as AdminMutations from "./admin-mutations"
import * as DoorsMutations from "./door-mutations"

export default {
    ...AdminMutations,
    ...AuthMutations,
    ...DoorsMutations
}