const express = require("express") 
const router =express.Router() 
const authController=require("../controllers/AuthController")

router.post("/signin",authController.SignIn) 
router.post("/register",authController.Register) 


module.exports= router