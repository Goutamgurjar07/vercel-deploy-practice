const express=require('express')
const app=express()
const port =8000

app.get('/',(req,res)=>{
     res.send("hello from goutam")
})

app.listen(port,()=>{
     console.log("server is running on port ",port);
     
})