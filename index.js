const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require ('dotenv').config();
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouters');
const ProductRouters=require('./Routes/ProductRouters');
const PORT = process.env.PORT || 8080;


app.get('/',(req,res)=>{
    res.send('ok');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouters)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})