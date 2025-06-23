import express from "express";
import UserController from "./user.controller.js";


const userRouter = express.Router();
const usercontroller = new UserController()

userRouter.post('/signup', usercontroller.singUp);
userRouter.post('/signin', usercontroller.singIn);


export default userRouter;