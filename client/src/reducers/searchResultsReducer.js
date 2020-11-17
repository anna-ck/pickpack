export default function searchResultsReducer(state = [], action) {
    switch (action.type) {
        case 'SEARCHRESULTS_CHANGE': {
            const { items } = action;
            return items;
        }

        case "INITIALSTATE_SET": {
            return []
        }

        default:
            return state;
    }
}

export const getSearchResults = (state) => {
    return state
}
