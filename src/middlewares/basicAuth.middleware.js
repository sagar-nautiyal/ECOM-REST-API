import { UserModel } from "../features/user/user.model.js";


const basicAuth = (req, res ,next)=>{
    const basicAuthor = req.headers["authorization"];
    console.log("Basic Authorization", basicAuthor); //Basic Authorization Basic c2VsbGVyQGVjb20uY29tOlBhc3N3b3JkMQ==

    if (!basicAuthor || !basicAuthor.startsWith("Basic ")) {
        return res.status(401).send("Missing or invalid Authorization header");
    }

    const base64Credentials = basicAuthor.replace('Basic ', '');
    console.log('base64',base64Credentials) //base64 c2VsbGVyQGVjb20uY29tOlBhc3N3b3JkMQ==

    //decode
    const decodeCred = Buffer.from(base64Credentials , 'base64').toString("utf8"); //converts into raw binary buffer
    const cred = decodeCred.split(':') //[username:password]

    console.log(cred)  //[ 'seller@ecom.com', 'Password1' ]

    //check these cred with userModel

    const user = UserModel.getAll().find(u=>u.email == cred[0] && u.password == cred[1]);

    if(user){
        next();
    }else{
        return res.status(401).send('Invalid Credentials');
    }

}

export default basicAuth;