
const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "SYS34AEJZLVVPSHHW2O7OIAROELPDOTM"; // Put your CLIENT access token here.

    let availableItems = [];
    let itemsLowerCase = [];
    let amountPerItem = [];

    const handleInitialize = async () => {
        const res = await fetch("https://cs571.org/api/s24/hw10/items", {
            method: "GET",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            }
        })
        const items = await res.json();
        console.log(items);
        availableItems = items;
        itemsLowerCase = items.map(i => i.name.toLowerCase())
        amountPerItem = items.map(i => 0)
        console.log(availableItems);
        return "Welcome to BadgerMart Voice! :) Type your question, or ask for help if you're lost!"
    }

    const handleReceive = async (prompt) => {
        const res = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        })
        const data = await res.json();
        console.log(data);
        if (data.intents.length > 0) {
            switch(data.intents[0].name) {
                case "get_help": return getHelp(data);
                case "get_items": return getItems(data);
                case "get_price": return getPrice(data);
                case "add_item": return addItem(data);
                case "remove_item": return removeItem(data);
                case "view_cart": return viewCart(data);
                case "checkout": return checkout(data);
            }
        }
        return "Sorry, I didn't get that. Type 'help' to see what you can do!";
    }

    const getHelp = async (promptData) => {
        return "You can get the list of items, the price of an item, add/or remove an item from your cart, and/or checkout!"
    }

    const getItems = async (promptData) => {
        let whatsAvailable = "We have ";
        for (let i = 0; i < availableItems.length; i++) {
            i === availableItems.length - 1 ? whatsAvailable += " and " + itemsLowerCase[i] + "s!" : whatsAvailable += itemsLowerCase[i] + "s, ";
        }
        return whatsAvailable;
    }

    const getPrice = async (promptData) => {
        const itemExists = promptData.entities["item_type:item_type"] ? true : false;
        const item = itemExists ? promptData.entities["item_type:item_type"][0].value : null;
        const idx = item ? itemsLowerCase.indexOf(item) : null;
        console.log(idx)
        let lsPrice = "";
        if (idx < 0 || idx === null) {
            lsPrice = "The item you listed is not in stock!";
        } else {
            if (item === "egg" || item === "apple") {
                lsPrice = "The cost of an ";
            } else {
                lsPrice = "The cost of a ";
            }
            lsPrice += item + " is $" + availableItems[idx].price + ".";
        }
        return lsPrice;
    }

    const addItem = async (promptData) => {
        let addResp = "";
        // finding item
        const itemExists = promptData.entities["item_type:item_type"] ? true : false;
        const item = itemExists ? promptData.entities["item_type:item_type"][0].value : null;
        const idx = item ? itemsLowerCase.indexOf(item) : null;
        console.log(idx)

        // finding amount to add of item
        const amountExists = promptData.entities["wit$number:number"] ? true : false;
        const amount = amountExists ? Math.floor(promptData.entities["wit$number:number"][0].value) : 1;
        
        if (idx < 0 || idx === null) {
            addResp = "The item you listed is not in stock!"
        } else if (amount <= 0) {
            addResp = "The quantity you asked for is invalid!"
        } else {
            addResp = amount > 1 ? 
                ("Sure, adding " + amount + " " + item + "s" + " to your cart!") : 
                ("Sure, adding " + amount + " " + item + " to your cart!");
            amountPerItem[idx] = amount;
            console.log(amountPerItem[idx] + " " + item)
        }
        return addResp;
    }

    const removeItem = async (promptData) => {
        let removeResp = "";
        // finding item
        const itemExists = promptData.entities["item_type:item_type"] ? true : false;
        const item = itemExists ? promptData.entities["item_type:item_type"][0].value : null;
        const idx = item ? itemsLowerCase.indexOf(item) : null;
        console.log(idx)

        // finding amount to add of item
        const amountExists = promptData.entities["wit$number:number"] ? true : false;
        const amount = amountExists ? Math.floor(promptData.entities["wit$number:number"][0].value) : 1;
        
        if (idx < 0 || idx === null) {
            removeResp = "The item you listed is not in stock!"
        } else if (amount <= 0) {
            removeResp = "The quantity you asked for is invalid!"
        } else {
            removeResp = amount > 1 ? 
                ("Sure, removing " + amount + " " + item + "s from your cart!") : 
                ("Sure, removing " + amount + " " + item + " from your cart!");
            amount > amountPerItem[idx] ? amountPerItem[idx] = 0 : amountPerItem[idx] -= amount;
            console.log(amountPerItem[idx] + " " + item)
        }
        return removeResp;
    }

    const viewCart = async (promptData) => {
        let viewCartResp = "You have ";
        let amountInCart = 0;
        for (const amount of amountPerItem) {
            amountInCart += amount;
        }
        if (amountInCart === 0) {
            viewCartResp = "There's nothing in your cart!"
        } else {
            let totalPrice = 0;
            for (let i = 0; i < availableItems.length; i++) {
                totalPrice += availableItems[i].price * amountPerItem[i];
                if (i === availableItems.length - 1) {
                    viewCartResp += " and "
                    amountPerItem[i] > 1 || amountPerItem[i] === 0 ? 
                        viewCartResp += amountPerItem[i] + " " + itemsLowerCase[i] + "s, totaling $" + totalPrice + "." : 
                        viewCartResp += amountPerItem[i] + " " + itemsLowerCase[i] + ", totaling $" + totalPrice + ".";

                } else {
                    amountPerItem[i] > 1 || amountPerItem[i] === 0 ? 
                        viewCartResp += amountPerItem[i] + " " + itemsLowerCase[i] + "s, " : 
                        viewCartResp += amountPerItem[i] + " " + itemsLowerCase[i] + ", ";
                }
            }
        }  
        return viewCartResp;
    }

    const checkout = async (promptData) => {
        let checkoutResp = "";

        // find json body for fetch
        const jsonBody = {};
        console.log(amountPerItem);
        for (let i = 0; i < availableItems.length; i++) {
            jsonBody[availableItems[i].name] = amountPerItem[i]; // from chatGPT
        }
        console.log(jsonBody);

        const res = await fetch("https://cs571.org/api/s24/hw10/checkout", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                jsonBody
            )
        })
        
        let amountInCart = 0;
        for (const amount of amountPerItem) {
            amountInCart += amount;
        }
        if (amountInCart === 0) {
            checkoutResp = "There's nothing in your cart! Please shop some more before checking out!"
        } else {
            const fetchResp = await res.json();
            console.log(fetchResp)
            checkoutResp = "Success! Your confimation ID is " + fetchResp.confirmationId;
            amountPerItem = amountPerItem.map(n => 0);
        }
        return checkoutResp;
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;