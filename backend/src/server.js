import express from "express"
import dotenv from "dotenv";


const app = express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"JalSetu Backend is running!"
    })
})

app.get("api/health",(req,res)=>{
    res.json({
        success:true,
        message:"JalSetu API is healthy"
    })
})

app.listen(3000,()=>{
    console.log(`Server running on http://localhost:3000`)
})