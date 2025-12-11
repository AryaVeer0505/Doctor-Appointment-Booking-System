import jwt from 'jsonwebtoken'

const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return  res.json({
            success:false,
            message:"Not Authorised Login Again"
        })
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
       req.user={userId:decodedToken.id}
        next()
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}
export default authUser