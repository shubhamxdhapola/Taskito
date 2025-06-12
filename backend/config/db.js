import mongoose from "mongoose";

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error in connecting to DB : ", err))
}

export default connectToDb