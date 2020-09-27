const PickedItemsApi = {
    getAllPickedItems: async function () {
            const response = await fetch('/picked');
            const body = await response.json();
            if (response.status !== 200) throw Error('Something went wrong!');
            return body;
    },
    pickItem: async function (itemToPick) {
        const response = await fetch('/picked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToPick)
        });
        if (!response.ok) throw Error('Something went wrong!');
        const pickedItem = await response.json()
        return pickedItem
    },
    updateItem: async function (itemToUpdate) {
        const response = await fetch(`/picked/${itemToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToUpdate)
        });
        if (!response.ok) throw Error('Something went wrong!');
        const updatedItem = await response.json()
        return updatedItem
    },

    deleteItem: async function (itemToDelete) {
        const response = await fetch(`/picked/${itemToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToDelete)
        });
        if (!response.ok) throw Error('Something went wrong!');
    }

}

export default PickedItemsApi