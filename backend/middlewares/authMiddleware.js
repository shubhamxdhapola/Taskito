import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

export const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({message : "Unauthorized! No token provided!"})
        }

        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if(err) return res.status(401).json({message : "Unauthorized! Invalid token!"})
            
            const user = await User.findById(decodedToken.id).select('-password')
            if(!user) return res.status(404).json({message : "User not found!"})

            req.user = user
            next()
        })
    } catch (err) {
        console.log("Error in protect middleware : ", err)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === 'admin') next()
    else res.status(403).json({message : "Access denied, admin only!"})
}