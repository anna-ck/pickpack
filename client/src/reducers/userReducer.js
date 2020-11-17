export default function userReducer(state = null, action) {
    switch (action.type) {
        case "USER_SET": {
            const { currentUser } = action;
            return currentUser;
        }
        case "INITIALSTATE_SET": {
            return null
        }

        default:
            return state;
    }
}
