import jwt from 'jsonwebtoken'

const authDoctor=async(req,res,next)=>{
    try {
        const {dtoken}=req.headers
        if(!dtoken){
            return res.json({
                success:false,
                message:"Not Authorised Login again"
            })
        }
        const decodedToken=jwt.verify(dtoken,process.env.JWT_SECRET)
        req.doctor={docId:decodedToken.id}
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default authDoctor