const HandleSavedListsApi = {
    addList: async function (pickedItems, currentUser, currentListName) {
        const listName = currentListName ? currentListName : 'New list'
        const response = await fetch(`/users/${currentUser.login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: listName, newList: pickedItems})
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
    }
}

export default HandleSavedListsApi