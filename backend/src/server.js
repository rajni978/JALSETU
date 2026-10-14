import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js"
import waterDataRoutes from "./routes/waterDataRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoute.js";
import actionRoutes from "./routes/actionRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import panchayatRoutes from "./routes/panchayatRoutes.js";
import priorityRoutes from "./routes/priorityRoutes.js";
import monitoringRoutes from "./routes/monitoringRoutes.js";
import panchayatDashboardRoutes from "./routes/panchayatDashboardRoutes.js";
import rainfallRoutes from "./routes/rainfallRoutes.js";

dotenv.config()

const app = express()
app.use(express.json());

app.use(cors())

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
app.use("/api", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/panchayats", panchayatRoutes);
app.use("/api/priority", priorityRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use( "/api/panchayat-dashboard", panchayatDashboardRoutes);
app.use("/api/environment", rainfallRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use(errorMiddleware);

app.listen(5000,()=>{
    console.log(`Server running on http://localhost:5000`)
})