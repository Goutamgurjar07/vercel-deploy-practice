require("../db/conn/dbconn")
const userModel=require("../db/model/user")
const bcrypt=require('bcrypt')

const loginUser=async(req,res)=>{
try {
     const {name,pass}=req.body
     const user=await userModel.findOne({FullName:name})
     console.log(user);
     console.log(name,pass);
     
     const hash1=user.password
     console.log(hash1);
     
    if(!user){
     res.send("user not found")
    }else{

     bcrypt.compare(pass,hash1,async function (err, isMatch) {

          // Comparing the original password to
          // encrypted password
          if (isMatch) {
              console.log('Encrypted password is: ', hash1);
              console.log('Decrypted password is: ', pass);
              res.render('home',{uname:name})
          }

          if (!isMatch) {

              // If password doesn't match the following
              // message will be sent
              console.log("not matched");
              res.render('singin')
          }
      })
   
     
    }
} catch (error) {
     console.log(error);
     
}
}

const logPage=async(req,res)=>{
     try {
          res.render('singin')
     } catch (error) {
          
     }
}

const getAllUsers=async(req,res)=>{
     try {
          const users=await userModel.find()
          // res.render('signup')
      res.status(200).send(users)
     } catch (error) {
          res.send(error)
     }
}
const getUserById=async(req,res)=>{
     try {
          const _id=req.params.id
          const users=await userModel.findById(_id)
          res.status(200).send(users)
     } catch (error) {
          res.send(error)
     }
}
const getUserByName=async(req,res)=>{
     try {
          const _id=req.params.nm
          const users=await userModel.findOne({name:_id})
          res.status(200).send(users)
     } catch (error) {
          res.send(error)
     }
}

const updateUser=async(req,res)=>{
     try {
          const _id=req.params.id
          const updatedUser=req.body
          
          // const newUpdate={
          //      name:"rishabh"
          // }
          const upUser=await userModel.findByIdAndUpdate(_id,updatedUser,{
               new:true
          })
          res.status(201).send(upUser)
     } catch (error) {
          res.send(error)
     }
}
const deleteUser=async(req,res)=>{
     try {
          const _id=req.params.id
          // const updatedUser=req.body
     
          const delUser=await userModel.findByIdAndDelete(_id)
          res.status(200).send(delUser)
     } catch (error) {
          res.send(error)
     }
}

const createUser=async(req,res)=>{
     try {
          // const newUser=req.body
          const {FullName,
               phoneNo,
               email,
               password,
               cpassword,
               Gender,
               Terms,
               }=req.body     
        
          if(password===cpassword){
               const hashPass=await bcrypt.hash(password,10)
               const newUser={FullName,
                    phoneNo,
                    email,
                    password:hashPass,
                    cpassword:undefined,
                    Gender,
                    Terms,}
               const createNewUsr=new userModel(newUser)
                const savedUser=await createNewUsr.save()
                res.render('singin')
          }
          else{
               res.send("invalid password")
          }
          
     } catch (error) {
          res.send(error)
     }
}
module.exports={getAllUsers,getUserById,getUserByName,updateUser,deleteUser,createUser,loginUser,logPage}