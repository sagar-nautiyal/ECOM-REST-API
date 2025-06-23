import jwt from 'jsonwebtoken';

const jswtAuth = (req, res, next)=>{
    //read the token
    const token = req.headers['authorization'];

    //check if this is valid token
    if(!token){
        res.status(401).send("Unauthorized")
    }

    //check

    try{
        const payload = jwt.verify(token, "IbiA6amtui");
        console.log(payload)
        req.userId = payload.userId;
    }catch(err){
        console.log(err)
        return res.status(401).send("Unauthorized")
    }

    next();
}

export default jswtAuth;