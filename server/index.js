require('dotenv').config();

const express=require("express")
const cors =require('cors')
const app=express();
const connectdb=require('./db/db');
const  productRoutes = require('./routes/ProductRoutes');
app.use(express.json());
app.use(cors())
connectdb();
app.use('/api',productRoutes)
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('server is running on port 3001')
})