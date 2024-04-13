"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const Item_1 = require("./Item");
class Shop {
    constructor() {
        this._items = [
            new Item_1.Item('Laptop', 600.95, 'for learning'),
            new Item_1.Item('Shoes', 200.45, 'jordan retro 4s'),
            new Item_1.Item('Iphone', 1001.23, 'everyday need')
        ];
    }
    get items() {
        return this._items;
    }
}
exports.Shop = Shop;
