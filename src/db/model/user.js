const mongoose=require('mongoose')

const userScheme=new mongoose.Schema(
     {
          FullName: {
               type: String,
               required: true,
               unique: true
          },
          phoneNo: String,
          email: String,
          password: String,
         cpassword:String,
         Gender:String,
         Terms:String
     }
)

const userModel=new mongoose.model('User',userScheme)

module.exports=userModel