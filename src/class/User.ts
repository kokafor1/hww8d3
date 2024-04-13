import { Item } from './Item';
import { v4 as uuidv4 } from 'uuid';

export class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];

    constructor(name: string, age: number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
    }

    public get id(): string | undefined{
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }

    public get cart(): Item[] {
        return this._cart;
    }

    public addToCart(item: Item): void {
        this._cart.push(item);
        console.log(`${item.name} has been added to ${this._name}'s cart`);
    }

    public removeFromCart(item: Item): void {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
        console.log(`All of the ${item.name}s have been removed from ${this._name}'s cart`);
    }

    public removeQuantityFromCart(item: Item, quantity: number): void {
        for (let i = 0; i < quantity; i++) {
            let indexOfItem = this._cart.findIndex(cartItem => cartItem.id === item.id);
            this._cart.splice(indexOfItem, 1);
        }
        console.log(`${quantity} ${item.name}(s) have been removed from ${this._name}'s cart`);
    }

    public cartTotal(): number {
        let total = 0;
        for (let item of this._cart) {
            total += item.price;
        }
        return total;
    }

    public printCart(): void {
        for (let item of this._cart) {
            console.log(item.name);
        }
        console.log(`Total: $${this.cartTotal()}`);
    }
}


