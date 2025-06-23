import { UserModel } from "../user/user.model.js";

export default class ProductModel{
    constructor(id , name , descripton, price, imageUrl, category, sizes){
        this.id = id;
        this.name = name;
        this.description=descripton;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes
    }

    static get(){
        return products;
    }

    static add(name , descripton, price, sizeArray , category ,imageUrl){
        const newProduct = new ProductModel(
            products.length+1,
            name,
            descripton,
            price,
            imageUrl,
            category,
            sizeArray
        )
        products.push(newProduct);
    }
    static getById(id){
        const product = products.find(p=>p.id == id);
        return product
    }

    static filter(minPrice, maxPrice , category){
        const result = products.filter((product)=>{
            return (
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice) &&
                (!category || product.category == category)
            )
        })

        return result;
    }
    static rate(userId, productId, rating){
        const user = UserModel.getAll().find(u=>u.id == userId);
        if(!user){
            throw new Error('User Not Found') ;
        }

        const product = products.find(p=>p.id == productId);
        if(!product){
            throw new Error('Product Not Found');
        }
        
        if(!product.rating){
            product.rating= [];
            product.rating.push({
                userId:userId,
                rating:rating
            })
        }else{
            const index = products.findIndex(p=>p.id == userId);
            console.log(index)
            if(index>=0){
                products.rating[index] = 
                {userId:userId,
                rating:rating}
            }else{
                product.rating.push({
                    userId:userId,
                    rating:rating
                })
            }
        }
    }
}


var products = [
    new ProductModel(
        1,
        "Product 1",
        "Description of Product 1",
        10,
        "https://bindassbooks.com/cdn/shop/files/il_570xN.3693058786_md2b_1024x1024.jpg?v=1701361785" ,
        'Category1',

    ),
    new ProductModel(
        2,
        "Product 2",
        "Description of Product 2",
        39,
        "https://thetravelhack.com/wp-content/uploads/2022/02/Atomic-Habits-Book-Summary-540x720.jpeg.webp",
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        "Product 3",
        "Description of Product 3",
        19,
        "https://5.imimg.com/data5/SELLER/Default/2022/2/JN/OT/TH/147304712/whatsapp-image-2022-02-11-at-3-26-48-pm-1000x1000.jpeg",
        'Categor3',
        ['M', 'XL', "S"]
    )
]