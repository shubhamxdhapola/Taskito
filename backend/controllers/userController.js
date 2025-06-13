import { Task } from "../models/Task.js"
import { User } from "../models/User.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "member" }).select('-password')
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Pending' })
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: 'In Progress' })
            const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Completed' })

            return {
                ...user._doc, // Includes all existing user data (Excludes the meta data of user document)
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
        }))
        res.status(200).json(userWithTaskCounts)
    } catch (err) {
        console.log("Error in getUsers controller : ", err)
        res.status(500).json({ message: "Internal sever error" })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user) {
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json(user)
    } catch (err) {
        console.log("Error in getUserById controller : ", err)
        res.status(500).json({ message: "Internal sever error" })
    }
}
