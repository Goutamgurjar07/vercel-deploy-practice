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

dotenv.config({path:'./.env'})

console.log('mongo db path',process.env.MONGO_URL);
console.log('secret key',process.env.SECRET);


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

app.get('/setcookie',muMiddleware, function (req, res) {
     // Cookies that have not been signed
      token=jwt.sign({
          uname: 'rohit'
        }, process.env.SECRET, { expiresIn: '5m' });

        console.log(token);
        
    res.cookie('Goutam',token).send("cookie created")
   })
app.get('/getcookie', function (req, res) {
     // Cookies that have not been signed
     var decoded = jwt.verify(token, process.env.SECRET);
     console.log(`decoded token is ${decoded.uname}`) 
     if(decoded.uname=='rohit'){
          res.render('home',{uname:decoded.uname})
     }
//     res.send(req.cookies)
   })
   
   app.get('/clearcooki', function (req, res) {
    res.clearCookie('Goutam').send('succssefull logout')
   })

app.get('/',(req,res)=>{
     res.send("hello from goutam gurjar");
})
app.get('/login',(req,res)=>{
     res.render('singin');
})
// app.get('/signup',(req,res)=>{
//      res.render('signup')
// })

app.use('/api',userRoute)
app.use('/login',logRoute)


app.listen(8000,()=>{
     console.log('server is running on port 8000');
})