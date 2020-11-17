

export default function pickedItemsReducer(state = [], action) {
    switch (action.type) {
        case 'PICKEDITEMS_SET': {
            const { pickedItems } = action;
            return pickedItems;
        }

        case 'PICKEDITEMS_ADD': {
            const { item } = action;
            const pickedItems = [...state, item];
            return pickedItems;
        }

        case 'PICKEDITEMS_DELETE': {
            const { item } = action;
            const pickedItems = state.filter((pickedItem => pickedItem.name !== item.name));
            return pickedItems;
        }

        case 'PICKEDITEMS_UPDATE': {
            const { itemToUpdate } = action;
            const pickedItems = state.map((pickedItem) => pickedItem.id === itemToUpdate.id ? itemToUpdate : pickedItem);
            return pickedItems;
        }


        case "INITIALSTATE_SET": {
            return []
        }

        default:
            return state;
    }
}
