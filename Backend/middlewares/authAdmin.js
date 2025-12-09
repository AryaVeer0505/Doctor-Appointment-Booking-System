import jwt from 'jsonwebtoken'

const authAdmin=async(req,res,next)=>{
    try {
        const {authorization}=req.headers
        if(!authorization){
            return  res.json({
            success:false,
            message:"Not Authorised Login Again"
        })
        }
        const decodedToken=jwt.verify(authorization,process.env.JWT_SECRET)
        if(decodedToken.email  !== process.env.ADMIN_EMAIL){
            return  res.json({
            success:false,
            message:"Not Authorised Login Again"
        })
        }
        next()
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}
export default authAdmin