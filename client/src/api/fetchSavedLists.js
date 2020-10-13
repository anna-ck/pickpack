const HandleSavedListsApi = {
    addList: async function (pickedItems, currentUser, currentList) {
        let date = new Date().toISOString().slice(0, 10)  
        const listName = currentList.listName ? currentList.listName : 'New list ' + date
        const id = currentList.id
        const response = await fetch(`/users/${currentUser.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listName, items: pickedItems, id: id})
        });
        const updatedUser = await response.json()
        if (response.status !== 200) throw Error('Something went wrong');
        return updatedUser
    },
    getLists: async function (currentUser) {
        const response = await fetch(`/users/${currentUser.login}`);
        const body = await response.json();
        if (response.status !== 200) throw Error('Something went wrong!');
        return body;
    },
    updateList: async function (pickedItems, currentUser, listToUpdate) {
        const response = await fetch(`/users/${currentUser.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listToUpdate.listName, items: pickedItems, id:listToUpdate.id})
        });
        const updatedUser = await response.json()
        if (response.status !== 200) throw Error('Something went wrong');
        return updatedUser
    },
    deleteList: async function (currentUser, listToUpdate) {
        const response = await fetch(`/users/${currentUser.login}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:listToUpdate.id})
        });
        const updatedUser = await response.json()
        if (response.status !== 200) throw Error('Something went wrong');
        return updatedUser
    },
}

export default HandleSavedListsApi