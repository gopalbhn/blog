import dotenv from "dotenv"
dotenv.config();
import ConnectDB from "./db/connection.js";
import app from "./app.js";

const PORT = process.env.PORT;

// ConnectDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         })
//         app.on("error", (err) => {
//             console.log("Error in running the server", err.message);
//         });
//     })
//     .catch((err) => {
//         console.log("Error in connecting to the database", err.message)
//     })


ConnectDB()
    .then(() => {

        console.log("Database Connected");

    })
    .catch((err) => {
        console.log("Database connection Error!!!", err.message)
    })

export default app