export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image provided" })
        }
        res.status(201).json({ profileImageUrl: req.file.path })
    } catch (err) {
        console.log("Error in uploadImage controller : ", err)
        res.status(500).json({ messaage: "Internal sever error" })
    }
}