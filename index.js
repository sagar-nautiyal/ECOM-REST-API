import  express from 'express';
import swagger from "swagger-ui-express";

import  ProductRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import jswtAuth from './src/middlewares/jwt.middlleware.js';

import loggerMiddleware from './src/middlewares/logger.middleware.js';

import apiDoc from "./swagger.json" with {type:'json'};
import { ApplicationError } from './src/error-handler/error.handler.js';

const app = express();
app.use(express.json())

app.use("/api-docs" , swagger.serve, swagger.setup(apiDoc));


app.use(loggerMiddleware);



// app.use((err, req, res, next)=>{
//     console.log(err)
//     res.status(500).send("Something went wrong. Please try again later!!")
// })



app.use('/api/products',jswtAuth, ProductRouter);
app.use('/api/cartItems',jswtAuth, cartRouter);
app.use('/api/user', userRouter);

app.use((req, res)=>{
    res.status(400).json({status:false, message:`Invalid Path ${req.originalUrl}`})
})




app.get('/', (req, res)=>{
    res.send("Welcome to API")
})


app.use((err, req, res, next)=>{
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message)
    }
    res.status(500).send("Something went wrong. Please try again later!!")
})


app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})