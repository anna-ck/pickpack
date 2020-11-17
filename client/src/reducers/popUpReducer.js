export default function popUpReducer(state = false, action) {
    switch (action.type) {
        case "POPUP_UPDATE": {
            const newPopUpVisible = !state;
            return newPopUpVisible;
        }

        case "INITIALSTATE_SET": {
            return false
        }

        default:
            return state;
    }
}

export const getPopupState = (state) => {
    return state
}
