const express = require("express") 
const router =express.Router() 
const publicationController=require("../controllers/PublicationController")
const authMiddleware=require("../middleware/authMiddleware")

router.post("/addPub",authMiddleware.isLoggedIn ,publicationController.createPub) 
router.get("/getPub/:id",authMiddleware.isLoggedIn ,authMiddleware.isMyPub,publicationController.getPub) 
router.get("/author/details",authMiddleware.isLoggedIn ,publicationController.getUserPubs) 

module.exports= router