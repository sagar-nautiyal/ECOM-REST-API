export default class CartItemsModel{
    constructor(id, productID, userID, quantity){
        this.id = id;
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
    }

    static add(productId, userId, quantity){
        const newitem = new CartItemsModel(
            cartItems.length+1,
            productId,
            userId,
            quantity
        )
        cartItems.push(newitem);
    }

    static get(userId){
        return cartItems.filter(c=>c.userID == userId);
    }
    static delete(cartItemID , userID){
        const index = cartItems.findIndex(i=>i.id == cartItemID && i.userID == userID)
        if(index == -1){
            return "Item not found";
        }else{
            cartItems.splice(index, 1)
        }
    }
}


const cartItems = [
    new CartItemsModel(
        1,
        1,
        2,
        1
    ),
    new CartItemsModel(
        2,
        2,
        2,
        23
    ),
    new CartItemsModel(
        3,
        3,
        1,
        2
    )
]