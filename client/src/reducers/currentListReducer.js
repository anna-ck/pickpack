export default function currentListReducer(state = { listName: '', id: '' }, action) {
    switch (action.type) {
        case 'CURRENTLIST_SET': {
            const { currentList } = action;
            return currentList;
        }

        case "INITIALSTATE_SET": {
            return { listName: '', id: '' }
        }

        default:
            return state;
    }
}

export const getCurrentList = (state) => {
    return state
}
