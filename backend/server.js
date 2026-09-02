const express=require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:", error);
        process.exit(1); 
    }
};
ConnectDB();
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs',require('./routes/jobRoutes'));
app.use('/api/applications',require('./routes/applicationRoutes'));
app.get("/health",(req,res)=>{
    res.send({ message: "HireAI Backend API is up and running!" });
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing successfully on port ${PORT}`));