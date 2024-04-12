import { v4 as uuidv4 } from 'uuid';

type Item = {
    readonly id:string
    name: string
    price: number
    description: string
}

type User = {
    readonly id:string
    name: string
    age: number
    cart: Item[]
}

function createUser(name: string, age: number): User {
    const newUser:User = {
        id: uuidv4(),
        name,
        age,
        cart: []
    }
    return newUser
}

function createItem(name:string, price: number, description: string):Item{
    const newItem: Item = {
        id: uuidv4(),
        name,
        price,
        description
    }
    return newItem
}

function addToCart(user: User, item:Item): void {
    user.cart.push(item);
    console.log(`${item.name} has been added to ${user.name}'s cart`)
}

function removeFromCart(user:User, item:Item):void {
    user.cart = user.cart.filter(cartItem => cartItem.id !== item.id)
    console.log(`All of the ${item.name}s have been removed from ${user.name}'s cart`)
}

function removeQuantityFromCart(user:User, item:Item, quantity:number): void {
    for (let i=0; i < quantity; i++){
        let indexOfItem = user.cart.findIndex(cartItem => cartItem.id == item.id)
        user.cart.splice(indexOfItem, 1);
    }
    console.log(`${quantity} ${item.name}(s) have been removed from ${user.name}'s cart`)
}

function cartTotal(user:User):number{
    let total = 0;
    for (let item of user.cart){
        total += item.price
    }
    return total
}

function printCart(user:User): void {
    for (let item of user.cart){
        console.log(item.name)
    }
    console.log(`Total: $${cartTotal(user)}`)
}

let customer1 = createUser('Ken', 20);
console.log(customer1);

let itemA = createItem('Laptop', 600.95, 'for learning');
let itemB = createItem('Shoes', 200.45, 'jordan retro 4s');
let itemC = createItem('Iphone', 1001.23, 'everyday need');

addToCart(customer1,itemA)
printCart(customer1);

addToCart(customer1,itemB);
addToCart(customer1,itemB);
addToCart(customer1,itemB);
printCart(customer1);

addToCart(customer1,itemC);
addToCart(customer1,itemC);
addToCart(customer1,itemC);
printCart(customer1);

removeFromCart(customer1,itemB);
printCart(customer1);

removeQuantityFromCart(customer1,itemC,2);
printCart(customer1);
