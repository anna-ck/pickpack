const handleSearchResultsApi = {
    getAllItems: async function () {
        const response = await fetch('/items');
        const body = await response.json();
        if (response.status !== 200) throw Error('Something went wrong!');
        return body;
    },
    getItemsByListName: async function (listName) {
        listName = listName.replace(/ /g, '');
        const response = await fetch(`/items/${listName}`);
        const body = await response.json();
        if (response.status !== 200) throw Error('Something went wrong!');
        return body;
    }
}


export default handleSearchResultsApi