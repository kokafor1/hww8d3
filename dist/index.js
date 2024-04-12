"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function createUser(name, age) {
    const newUser = {
        id: (0, uuid_1.v4)(),
        name,
        age,
        cart: []
    };
    return newUser;
}
function createItem(name, price, description) {
    const newItem = {
        id: (0, uuid_1.v4)(),
        name,
        price,
        description
    };
    return newItem;
}
function addToCart(user, item) {
    user.cart.push(item);
    console.log(`${item.name} has been added to ${user.name}'s cart`);
}
function removeFromCart(user, item) {
    user.cart = user.cart.filter(cartItem => cartItem.id !== item.id);
    console.log(`All of the ${item.name}s have been removed from ${user.name}'s cart`);
}
function removeQuantityFromCart(user, item, quantity) {
    for (let i = 0; i < quantity; i++) {
        let indexOfItem = user.cart.findIndex(cartItem => cartItem.id == item.id);
        user.cart.splice(indexOfItem, 1);
    }
    console.log(`${quantity} ${item.name}(s) have been removed from ${user.name}'s cart`);
}
function cartTotal(user) {
    let total = 0;
    for (let item of user.cart) {
        total += item.price;
    }
    return total;
}
function printCart(user) {
    for (let item of user.cart) {
        console.log(item.name);
    }
    console.log(`Total: $${cartTotal(user)}`);
}
let customer1 = createUser('Ken', 20);
console.log(customer1);
let itemA = createItem('Laptop', 600.95, 'for learning');
let itemB = createItem('Shoes', 200.45, 'jordan retro 4s');
let itemC = createItem('Iphone', 1001.23, 'everyday need');
addToCart(customer1, itemA);
printCart(customer1);
addToCart(customer1, itemB);
addToCart(customer1, itemB);
addToCart(customer1, itemB);
printCart(customer1);
addToCart(customer1, itemC);
addToCart(customer1, itemC);
addToCart(customer1, itemC);
printCart(customer1);
removeFromCart(customer1, itemB);
printCart(customer1);
removeQuantityFromCart(customer1, itemC, 2);
printCart(customer1);
