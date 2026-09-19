import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js"
import waterDataRoutes from "./routes/waterDataRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config()

const app = express()
app.use(express.json());

app.use(express.json())

connectDB()

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"JalSetu Backend is running!"
    })
})

app.get("/api/health",(req,res)=>{
    res.json({
        success:true,
        message:"JalSetu API is healthy"
    })
})


app.use("/api",reportRoutes);
app.use("/api", waterDataRoutes);

app.use(errorMiddleware);

app.listen(3000,()=>{
    console.log(`Server running on http://localhost:3000`)
})