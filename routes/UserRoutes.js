const express = require("express") 
const router =express.Router() 
const userController=require("../controllers/UserController")
const authMiddleware=require("../middleware/authMiddleware")
router.post("/add-admin" ,userController.addAdmin) 
router.patch("/validate/:id",authMiddleware.isLoggedIn , authMiddleware.isAdmin ,userController.validateUser) 

module.exports= router