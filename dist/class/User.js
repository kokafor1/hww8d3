"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get cart() {
        return this._cart;
    }
    addToCart(item) {
        this._cart.push(item);
        console.log(`${item.name} has been added to ${this._name}'s cart`);
    }
    removeFromCart(item) {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
        console.log(`All of the ${item.name}s have been removed from ${this._name}'s cart`);
    }
    removeQuantityFromCart(item, quantity) {
        for (let i = 0; i < quantity; i++) {
            let indexOfItem = this._cart.findIndex(cartItem => cartItem.id === item.id);
            this._cart.splice(indexOfItem, 1);
        }
        console.log(`${quantity} ${item.name}(s) have been removed from ${this._name}'s cart`);
    }
    cartTotal() {
        let total = 0;
        for (let item of this._cart) {
            total += item.price;
        }
        return total;
    }
    printCart() {
        for (let item of this._cart) {
            console.log(item.name);
        }
        console.log(`Total: $${this.cartTotal()}`);
    }
}
exports.User = User;
//tried to fix it like how we did in one of the lecturs but this seems to be the way according to quick fix
// function uuidv4(): string {
//     throw new Error('Function not implemented.');
// }
