

export default function changedListReducer(state = null, action) {
    switch (action.type) {
        case 'CURRENTLYCHANGEDLIST_SET': {
            const { id } = action;
            return id;
        }
        
        case "INITIALSTATE_SET": {
            return null
        }

        default:
            return state;
    }
}
