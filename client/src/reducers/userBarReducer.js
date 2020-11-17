
export default function userBarReducer(state = false, action) {
    switch (action.type) {
        case 'USERBAR_SET': {
            const { status } = action;
            return status;
        }

        case "INITIALSTATE_SET": {
            return false
        }

        default:
            return state;
    }
}

export const isUserBarVisible = (state) => {
    return state
}