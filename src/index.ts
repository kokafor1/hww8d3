import { Item } from './class/Item';
import { User } from './class/User';
import { Shop } from './class/Shop';

const shop = new Shop();

const user = new User("Ken", 20);


user.addToCart(shop.items[0]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);

user.printCart();
console.log("Total cart value:", user.cartTotal());

user.removeFromCart(shop.items[1]);
user.printCart();
console.log("Total cart value:", user.cartTotal());

user.removeQuantityFromCart(shop.items[0], 1);
user.printCart();
console.log("Total cart value:", user.cartTotal());
