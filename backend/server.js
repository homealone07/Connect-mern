import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./Routes/seedRoutes.js";
import productRouter from "./Routes/poductRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import smeRouter from "./Routes/smeRoutes.js";


dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to db");
})
.catch((error)=>{
    console.log(error.message);
})


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/keys/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/api/seed',seedRouter);

app.use("/api/products",productRouter);
app.use("/api/SME",smeRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message});
})


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localport:${port}`);
})
