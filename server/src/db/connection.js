import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
       const connection =  await mongoose.connect(process.env.DB_URI)
       
       if(connection.STATES.connected){

           console.log("Database Connected");
       }
    } catch (err) {
        console.log("Error in connecting to the database",err.message)
        process.exit(1)
    }
}
export default ConnectDB;
