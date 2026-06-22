import express from 'express';
import cors from 'cors';
import userRouter from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import cookieParser from "cookie-parser";



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
}));

app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/post", postRoute)

export default app;