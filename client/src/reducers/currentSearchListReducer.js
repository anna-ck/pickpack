export default function currentSearchListReducer(state = '', action) {
    switch (action.type) {
        case 'CURRENTSEARCHLIST_SET': {
            const { list } = action;
            return list;
        }

        case "INITIALSTATE_SET": {
            return ''
        }

        default:
            return state;
    }
}

export const getSearchResults = (state) => {
    return state
}
