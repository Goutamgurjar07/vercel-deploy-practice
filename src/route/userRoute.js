const express=require('express')

const router=express.Router()

const {getAllUsers,getUserById, getUserByName, updateUser, deleteUser, createUser, loginUser}=require("../controller/usercontroller")

router.route('/').get(getAllUsers)
router.route('/:id').get(getUserById)
router.route('/?nm').get(getUserByName)
router.route('/:id').patch(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/').post(createUser)


module.exports=router