import CartItemsModel from "./cart.model.js";

export default class CartItemsController{
    add(req, res){
        const {productID,quantity} = req.query;
        const userId = req.userId;
        CartItemsModel.add(productID,userId,quantity);
        res.status(201).send("Cart has been updated");
    }
    get(req, res){
        const userId = req.userId;
        const item = CartItemsModel.get(userId);
        res.status(200).send(item)
    }
    delete(req, res){
        const userID = req.userId;
        const cartItemID = req.params.id;
        const error = CartItemsModel.delete(cartItemID, userID);
        if(error){
            res.status(404).send("Item not found");
        }else{
            res.status(200).send("Item Deleted Successfully")
        }
    }
}