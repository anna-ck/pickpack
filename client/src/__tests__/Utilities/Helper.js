import {itemLists} from '../../Utilities/Helper.js'

describe('searchList', () => {
    test ('works for male clothes', () => {
        expect(itemLists.searchList('Male Clothes')).toEqual(['T-shirt', 'jacket', 'trousers', 'jeans', 'shirt', 'coat', 'jumper', 'raincoat', 'shorts', 'socks', 'suit', 'pants', 'sweatshirt', 'trunks', 'tracksuit'])
    })
    test ('works for female shoes', () => {
        expect(itemLists.searchList('Female Shoes')).toEqual(['high heels', 'ballet shoes', 'sandals'])
    })
})