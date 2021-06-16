const express=require('express');
var cors = require('cors')
const path = require('path');
var app = express()
 
app.use(cors())

require("dotenv").config({ path: "./config/.env" });
const connectDB= require('./config/dbConnect');
connectDB(); 

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/signUp', require('./Routes/authRoutes/SignUp'));
app.use('/login', require('./Routes/authRoutes/login'));
app.use('/users', require('./Routes/authRoutes/users'));

app.use('/categories', require('./Routes/productsRoutes/Categories'))
app.use('/ingredients', require('./Routes/productsRoutes/ingredient'))
app.use('/shipping', require('./Routes/orderRoutes/Shipping'))
app.use ('/orders', require('./Routes/orderRoutes/order'))


const PORT= process.env.PORT || 5000
app.listen (PORT, ()=> console.log(`server connected on PORT: ${PORT}`))