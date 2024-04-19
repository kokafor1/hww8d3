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

    public itemElement(): HTMLElement {
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
    readonly id: string;
    name: string;
    age: number;
    cart: Map<string, { item: Item, quantity: number }>;

    constructor(name: string, age: number) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.cart = new Map();
    }

    public addToCart(item: Item): void {
        if (this.cart.has(item.id)) {
            this.cart.get(item.id)!.quantity++;
        } else {
            this.cart.set(item.id, { item: item, quantity: 1 });
        }
    }

    public removeFromCart(item: Item): void {
        if (this.cart.has(item.id)) {
            const currentItem = this.cart.get(item.id)!;
            if (currentItem.quantity === 1) {
                this.cart.delete(item.id);
            } else {
                currentItem.quantity--;
            }
        }
    }

    public removeAllFromCart(item: Item): void {
        this.cart.delete(item.id);
    }

    public cartTotal(): number {
        let total = 0;
        for (const { item, quantity } of this.cart.values()) {
            total += item.price * quantity;
        }
        return total;
    }

    public cartHTMLElement(): HTMLElement {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-items");
        for (const { item, quantity } of this.cart.values()) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            const itemName = document.createElement("h3");
            itemName.textContent = item.name;
            itemDiv.appendChild(itemName);


            const itemQuantity = document.createElement("span");
            itemQuantity.textContent = `Quantity: ${quantity}`;
            itemDiv.appendChild(itemQuantity);

            const itemPrice = document.createElement("span");
            itemPrice.textContent = `Price: $${(item.price * quantity).toFixed(2)}`;
            itemDiv.appendChild(itemPrice);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove One";
            removeButton.addEventListener("click", () => {
            this.removeFromCart(item);
            Shop.updateCart(); 
            });
            itemDiv.appendChild(removeButton);

            const removeAllButton = document.createElement("button");
            removeAllButton.textContent = "Remove All";
            removeAllButton.addEventListener("click", () => {
                this.removeAllFromCart(item);
                Shop.updateCart();
            });
            itemDiv.appendChild(removeAllButton);

            cartDiv.appendChild(itemDiv);
        }

        const cartTotal = document.createElement("p");
        cartTotal.textContent = `Total: $${this.cartTotal().toFixed(2)}`;
        cartDiv.appendChild(cartTotal);

        return cartDiv;
    }

    static createUser(): User | undefined {
        const nameInput = <HTMLInputElement>document.getElementById("name");
        const ageInput = <HTMLInputElement>document.getElementById("age");
        
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value.trim());
        
        if (name && age) {
            return new User(name, age);
        } else {
            alert("Please provide valid name and age.");
            return undefined;
        }
    }

    static loginUser(event: Event): void {
        event.preventDefault();
        Shop.myUser = User.createUser();
        if (Shop.myUser) {
            document.getElementById('login')?.remove();
            new Shop();
        }
    }

    public addRemoveEventListeners(): void {
        const cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach(item => {
            const removeButtons = item.querySelectorAll("button");
            removeButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const itemName = item.querySelector("h3")?.textContent;
                    const itemToRemove = [...this.cart.values()].find(i => i.item.name === itemName)?.item;
                    if (itemToRemove) {
                        if (button.textContent === "Remove One") {
                            this.removeFromCart(itemToRemove);
                            Shop.updateCart();
                        } else {
                            this.removeAllFromCart(itemToRemove);
                            Shop.updateCart();
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

    constructor() {
        Shop.items.push(
            new Item('Laptop', 600.95, 'For learning'),
            new Item('Shoes', 200.45, 'Jordan retro 4s'),
            new Item('iPhone', 1001.23, 'Everyday need'),
            new Item('Watch', 350.00, 'Luxury timepiece'),
            new Item('Camera', 800.00, 'Professional camera for photography enthusiasts'),
            new Item('Speaker', 150.00, 'High-quality sound system for immersive audio experience')
        );

        Shop.createCart();
        Shop.showItems();
    }

    public static createCart(): void {
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

    public static showItems(): void {
        const shopDiv = document.getElementById("shop");
        if (shopDiv) {
            shopDiv.innerHTML = "";
            Shop.items.forEach(item => {
                const itemElement = item.itemElement();
                shopDiv.appendChild(itemElement);
            });
        }
    }

    public static updateCart(): void {
        const cartSection = document.getElementById("cart");
        if (cartSection) {
            cartSection.innerHTML = "";
            cartSection.appendChild(this.myUser?.cartHTMLElement() || document.createTextNode("Please login to view your cart."));
        }
    }
}

document.getElementById('loginbutton')!.addEventListener('click', (event: Event) => User.loginUser(event));