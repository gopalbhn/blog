import jwt from "jsonwebtoken"


const generateJwt =  (email) => {
    const payload = { email }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
    return token
}

const authenticateJWT = (req,res,next) =>{
    console.log("control here")
    const authHeader = req.cookies?.token
   
    if(!authHeader){
        return res.status(400).json({
            success:false,
            message:"missing auth header"
        })
    }
    if(authHeader){
        const token = authHeader
       
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({
                    message:err.message
                })
            }
            if(user){
                
                req.user = user;
            next()

            }
        })
    }
}

export {generateJwt,authenticateJWT}