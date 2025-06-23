import { UserModel } from "./user.model.js";
import  jwt   from "jsonwebtoken";

export default class UserController{
    singUp(req, res){
        const {name, email , password, type} = req.body;
        const user = UserModel.signUp(name, email , password, type);
        res.status(201).send(user);
    }
    singIn(req, res){
        const {email , password} = req.body;
        const result = UserModel.singIn(email, password);
        console.log(result)
        if(!result){
            res.status(400).send("Invalid Crendetials");
        }else{
            const token = jwt.sign({userId:result.id , email: result.email}, "IbiA6amtui" , {
                expiresIn: '1h'
            })
            res.status(200).send(token); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbGxlckBlY29tLmNvbSIsImlhdCI6MTc0NDg3ODYzNywiZXhwIjoxNzQ0ODgyMjM3fQ.gt5lDduT4RQMEg8q85iQRKwI33qZaHsTej9Pon6XkEM
        }
    }
}