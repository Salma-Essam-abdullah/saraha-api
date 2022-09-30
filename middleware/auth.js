
const jwt = require('jsonwebtoken');
const userModel = require('../DB/models/user.model');
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');

const roles = {
    user: 'user',
    admin: 'admin'
   
}

const auth = (accessRoles) =>{
    return (req, res, next) => {
       req.headers
       if(req.headers==null ||!req.headers["authorization"] ||!req.headers["authorization"].startsWith("Bearer ")){
           return res.json({message:"Unauthorized"})
       }
       else{
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, async(err, decoded) =>{
         if(decoded){
            let user = await userModel.findById(decoded.id);
            if(user){
                if(accessRoles.includes(decoded.role)){
                req.user = user;
                next();
                }
                else{
                    // res.status(403).json({message:"Unauthorized access"})
                    res.status(StatusCodes.FORBIDDEN).json({message:"Unauthorized access",extraInf:getReasonPhrase(StatusCodes.FORBIDDEN)})
                }
            }
            else{
                return res.status(422).json({message:"Unauthorized"})
            }
         }
         else{
             res.status(422).json({message:"invalid token"})
         }

       });
    }
}
}

module.exports = {auth,roles};