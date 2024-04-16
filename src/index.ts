
import { v4 as uuidv4 } from 'uuid';

class Item {
    readonly id: string;
    name: string;
    price: number;
    description: string;

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
    }

    itemElement(): HTMLElement {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-card");

        const itemName = document.createElement("h3");
        itemName.textContent = this.name;
        itemDiv.appendChild(itemName);

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `Price: $${this.price.toFixed(2)}`;
        itemDiv.appendChild(itemPrice);

        const itemDescription = document.createElement("p");
        itemDescription.textContent = this.description;
        itemDiv.appendChild(itemDescription);

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => {
            if (Shop.myUser) {
                Shop.myUser.addToCart(this);
                Shop.updateCart();
            } else {
                alert("Please login to add items to your cart.");
            }
        });
        itemDiv.appendChild(addToCartButton);

        return itemDiv;
    }
}

class User {
    static createUser(): User | undefined {
        throw new Error('Method not implemented.');
    }
    readonly id: string;
    name: string;
    age: number;
    cart: Item[];

    constructor(name: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.cart = [];
    }

    addToCart(item: Item): void {
        this.cart.push(item);
    }

    removeFromCart(item: Item): void {
        this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
    }

    removeQuantityFromCart(item: Item, quantity: number): void {
        for (let i = 0; i < quantity; i++) {
            const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }

    cartTotal(): number {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    cartHTMLElement(): HTMLElement {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-items");
        for (const item of this.cart) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            const itemName = document.createElement("h3");
            itemName.textContent = item.name;
            itemDiv.appendChild(itemName);

            const itemQuantity = document.createElement("span");
            itemQuantity.textContent = `Quantity: ${this.cart.filter(i => i.id === item.id).length}`;
            itemDiv.appendChild(itemQuantity);

            const itemPrice = document.createElement("span");
            itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;
            itemDiv.appendChild(itemPrice);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove One";
            removeButton.addEventListener("click", () => this.removeFromCart(item));
            itemDiv.appendChild(removeButton);

            const removeAllButton = document.createElement("button");
            removeAllButton.textContent = "Remove All";
            removeAllButton.addEventListener("click", () => this.removeQuantityFromCart(item, this.cart.filter(i => i.id === item.id).length));
            itemDiv.appendChild(removeAllButton);

            cartDiv.appendChild(itemDiv);
        }

        const cartTotal = document.createElement("p");
        cartTotal.textContent = `Total: $${this.cartTotal().toFixed(2)}`;
        cartDiv.appendChild(cartTotal);

        return cartDiv;
    }

    addRemoveEventListeners(): void {
        const cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach(item => {
            const removeButtons = item.querySelectorAll("button");
            removeButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const itemName = item.querySelector("h3")?.textContent;
                    const itemToRemove = this.cart.find(i => i.name === itemName);
                    if (itemToRemove) {
                        if (button.textContent === "Remove One") {
                            this.removeFromCart(itemToRemove);
                        } else {
                            this.removeQuantityFromCart(itemToRemove, this.cart.filter(i => i.id === itemToRemove.id).length);
                        }
                    }
                });
            });
        });
    }
}

class Shop {
    static myUser: User | undefined;
    static items: Item[] = [];

    static loginUser(event: Event): void {
        event.preventDefault();
        Shop.myUser = User.createUser();
        if (Shop.myUser) {
            document.getElementById('login')?.remove();
            new Shop();
        }
    }
    

    constructor() {
        Shop.items.push(
            new Item('Laptop', 600.95, 'For learning'),
            new Item('Shoes', 200.45, 'Jordan retro 4s'),
            new Item('iPhone', 1001.23, 'Everyday need')
        );

        Shop.createCart();
        Shop.showItems();
    }

    static createCart(): void {
        const cartDiv = document.getElementById("cart");
        if (cartDiv) {
            cartDiv.innerHTML = "";
            if (this.myUser) {
                cartDiv.appendChild(this.myUser.cartHTMLElement());
                this.myUser.addRemoveEventListeners();
            } else {
                cartDiv.textContent = "Please login to view your cart.";
            }
        }
    }

    static showItems(): void {
        const shopDiv = document.getElementById("shop");
        if (shopDiv) {
            shopDiv.innerHTML = "";
            Shop.items.forEach(item => {
                const itemElement = item.itemElement();
                shopDiv.appendChild(itemElement);
            });
        }
    }

    static updateCart(): void {
        const cartSection = document.getElementById("cart");
        if (cartSection) {
            cartSection.innerHTML = "";
            cartSection.appendChild(this.myUser?.cartHTMLElement() || document.createTextNode("Please login to view your cart."));
        }
    }
}

