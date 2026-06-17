import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database Connected");
    } catch (err) {
        console.log("Error in connecting to the database",err.message)
    }
}
export default ConnectDB;
