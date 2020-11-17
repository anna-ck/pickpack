export default function changesReducer(state = false, action) {
    switch (action.type) {
        case 'CURRENTLISTMODIFICATION_CONFIRM': {
            return true;
        }

        case 'CURRENTLISTMODIFICATION_DENY': {
            return false;
        }

        case "INITIALSTATE_SET": {
            return false
        }

        default:
            return state;
    }
}

export const isCurrentListModified = (state) => {
    return state
}
