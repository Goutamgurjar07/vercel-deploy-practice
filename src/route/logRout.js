const express=require('express')

const router=express.Router()

const { loginUser,logPage}=require("../controller/usercontroller")

router.route('/').post(loginUser)
router.route('/').get(logPage)


module.exports=router