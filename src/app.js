const express=require('express')
const dotenv=require('dotenv')
const app=express()
const jwt = require('jsonwebtoken');
const userRoute=require("../src/route/userRoute")
const logRoute=require("../src/route/logRout")

const hbs=require('hbs')
const path=require('path');
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt')
var cookieParser = require('cookie-parser')

// dotenv.config({path:'./.env'})

// console.log('mongo db path',process.env.MONGO_URL);
// console.log('secret key',process.env.SECRET);


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())
// create path for views
const viewPath=path.join(__dirname,"/views/template")

app.set('view engine','hbs')
console.log(viewPath);
app.set('views',viewPath)
 
const muMiddleware=(req,res,next)=>{
     const msg="middleware function"
     console.log(msg);
     
     next()
}



var token;



app.get('/',(req,res)=>{
     res.send("hello from goutam gurjar");
})
// app.get('/login',(req,res)=>{
//      res.render('singin');
// })
// app.get('/signup',(req,res)=>{
//      res.render('signup')
// })

app.use('/api',userRoute)
app.use('/login',logRoute)


app.listen(8000,()=>{
     console.log('server is running on port 8000');
})