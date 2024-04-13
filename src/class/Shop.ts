import { Item } from './Item';

export class Shop {
    private _items: Item[];

    constructor() {
        this._items = [
            new Item('Laptop', 600.95, 'for learning'),
            new Item('Shoes', 200.45, 'jordan retro 4s'),
            new Item('Iphone', 1001.23, 'everyday need')
        ];
    }

    public get items(): Item[] {
        return this._items;
    }
}
