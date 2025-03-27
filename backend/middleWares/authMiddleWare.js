import jwt from 'jsonwebtoken'

const secret = "wy8vcryeo8cbpiw4816481234567!@#$fgcx"


export const verifyToken = (req, res, next) => {
const token = req.cookies.jwt
if(!token) {
    return res.status(201).json({
        message:"Login first"
    })
}

jwt.verify(token, secret, async (err, payload) => {
    if(err) return res.status(201).json({message:"Token Expired"})
    req.email = payload.email
})

next();
}