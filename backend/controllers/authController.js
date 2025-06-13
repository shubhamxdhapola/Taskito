import { User } from "../models/User.js"
import { generateJwtToken } from "../utils/generateJwtToken.js"
import { sendCookie } from "../utils/sendCookie.js"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body

        if (!name || !email || !password) {
            return res.status(401).json({ message: "All fields are required!" })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({ message: "Email already exists" })
        }

        let role = 'member'
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin'
        }

        const user = await User.create({ name, email, password, profileImageUrl, role })

        if (user) {
            const token = generateJwtToken(user._id)
            sendCookie(token, res)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
                token
            })
        } else {
            res.status(500).json({ message: "Error in creating user" })
        }
    } catch (err) {
        console.log("Error in registerUser controller : ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = generateJwtToken(user._id)
        sendCookie(token, res)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token
        })
    } catch (err) {
        console.log("Error in loginUser controller : ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', "", {maxAge : 0, secure : true, sameSite : "None" })
        res.status(200).json({message : "Logged out successfully"})
    } catch (err) {
        console.log("Error in logoutUser controller : ", err)
        res.status(500).json({message : "Internal server error"})
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (err) {
        console.log("Error in getUserProfile controller : ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateUserProfile = async (req, res) => {
    try {

        let user = await User.findById(req.user.id)
        if(!user) {
            return res.status(404).json({message : "User not found"})
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) user.password = req.body.password

        const updatedUser = await user.save()
        
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            role : updatedUser.role,
        })

    } catch (err) {
        console.log("Error in updateUserProfile controller : ", err)
        res.status(500).json({ message: "Internal server error" })
    }
}