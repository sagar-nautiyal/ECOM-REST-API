import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProducts(req, res){
        const products = ProductModel.get();
        res.status(200).send(products);
    }
    addProduct(req, res){
        console.log(req.body);
        const {name , descripton, price, sizes , category} = req.body;
        const sizeArray = sizes.split(',')
        const imageUrl = "images/" + req.file.filename;
        ProductModel.add(name , descripton, price, sizeArray , category ,imageUrl);
        const products = ProductModel.get();
        res.status(201).send(products);  //201- indicate resource has been created
    }
    getOneProduct(req, res){
        const id= req.params.id;
        const product = ProductModel.getById(id);
        if(!product){
            return res.status(400).send("product not found")
        }
        res.status(200).send(product);
    }
    rateProduct(req, res , next){
        console.log(req.query)
        try{
            const userId = req.query.userId;
            const productId = req.query.productId;
            const rating = req.query.rating;
            ProductModel.rate(userId , productId, rating);
            return res.status(200).send("Rating has been Added");
        }catch(err){
            next(err);
        }
    }
    filterProduct(req, res){
        console.log(req.query)
        const minPrice = req.query.minPrice
        const maxPrice = req.query.maxPrice
        const category = req.query.category
        const products = ProductModel.filter(minPrice , maxPrice, category)
        res.status(200).send(products);
    }
}