const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{
        console.log(req.headers.authorization)
        const token = req.headers.authorization;
        const decode =jwt.verify(token,process.env.JWT_KEY);
        req.userData = decode;
        next();
    }
    catch(e){
        console.log(e)
        res.status(401).json({msg:"Auth Failed"})
    }
}