const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// dotenv.config({path: './.env'})
const DBpath='mongodb+srv://abcd:1234@cluster0.gp2izzl.mongodb.net/'

const conn=mongoose.connect(DBpath)
.then(()=>console.log('connection with mongoDB is successful'))
.catch((err)=>console.log(err))

module.exports = conn