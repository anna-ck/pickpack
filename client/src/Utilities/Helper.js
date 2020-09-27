const itemLists = {
    clothesMen: ['T-shirt', 'jacket', 'trousers', 'jeans', 'shirt', 'coat', 'jumper', 'raincoat', 'shorts', 'socks', 'suit', 'pants', 'sweatshirt', 'trunks', 'tracksuit'],
    clothesWomen: ['dress', 'skirt', 'trousers', 'jeans', 'shirt', 'T-shirt', 'swimsuit', 'tights', 'blouse', 'underwear', 'socks', 'tracksuit', 'bra', 'cardigan'],
    shoesMen: ['sneakers', 'moccassins', 'hiking boots'],
    shoesWomen:['high heels', 'ballet shoes', 'sandals'],
    accessoriesMen: ['belt', 'glasses', 'watch', 'cap', 'scarf'],
    accessoriesWomen: ['watch', 'rings', 'gloves', 'hat'],
    cosmeticsMen: ['shampoo', 'toothpaste', 'cream'],
    cosmeticsWomen: ['shampoo', 'toothpaste', 'cream', 'balm'],
    electronics: ['aaa', 'bbb'],
    entertainment: ['cards', 'ball'],
    documents: ['id', 'passport', 'credit cards'],

    concatItems() {
        const allItems = this.clothesMen.concat(this.clothesWomen, this.shoesMen, this.shoesWomen, this.accessoriesMen, this.accessoriesWomen);
        const uniqItems = [...new Set(allItems)];
        return uniqItems
    },

    searchList(listName) {
        if (listName === 'Male Clothes') {
            return this.clothesMen}
        else if (listName === 'Female Clothes') {
            return this.clothesWomen}
        else if (listName === 'Male Shoes') {
            return this.shoesMen}
        else if (listName === 'Female Shoes') {
            return this.shoesWomen}
        else if (listName === 'Male Accessories') {
            return this.accessoriesMen}
        else if (listName === 'Female Accessories') {
            return this.accessoriesWomen}
        else if (listName === 'Male Cosmetics') {
            return this.cosmeticsMen}
        else if (listName === 'Female Cosmetics') {
            return this.cosmeticsWomen}
        else if (listName === 'Electronics') {
            return this.electronics}
        else if (listName === 'Entertainment') {
            return this.entertainment}   
        else if (listName === 'Documents') {
            return this.documents}        
    }
}

export {itemLists}
