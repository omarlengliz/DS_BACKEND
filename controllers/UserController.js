const User = require("../models/User");
const bcrypt = require("bcrypt")
const addAdmin=async (req,res)=>{

    const {nom , prenom , telephone, login , password} = req.body ; 
    if(!nom) {
        return res.status(400).json({msg:"nom est obligatoire"}) ;  
    }
    if(!prenom) {
        return res.status(400).json({msg:"prenom est obligatoire"}) ;  
    }
    if(!telephone) {
        return res.status(400).json({msg:"telephone est obligatoire"}) ;  
    }
    if(!login) {
        return res.status(400).json({msg:"login est obligatoire"}) ;  
    }
    if(!password) {
        return res.status(400).json({msg:"password est obligatoire"}) ;  
    }
    const existedUser =await  User.findOne({login:login})   ; 
    if(existedUser){
        return res.status(400).json({msg:"Ce Login est deja utiliser "})
    }
    try {
        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt) ; 
        console.log(hashedPass)
        const user=await User.create({
            nom,
            prenom,
            telephone,
            login,
            password:hashedPass,
            role:"admin",
            status:"V"
    
        })
        return res.status(201).json({
            id:user._id , 
            nom:user.nom ,
            prenom:user.prenom,
            login:user.email,
            status : user.status,
            role:user.role
    
        })        
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
  

}

const validateUser = async (req,res) =>{
    const {id} = req.params  ;
    const {password} = req.body 
    if(!password) {
        return res.status(400).json({msg:"mot de passe est obligatoire"})
    }
    try {
        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt) ; 
        const user=await User.findByIdAndUpdate(id,{
            status:"V",
            password:hashedPass
        })
        return res.status(200).json({
            id:user._id , 
            nom:user.nom ,
            prenom:user.prenom,
            login:user.email,
            status : "v",
            role:user.role
    
        })
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }

}

module.exports={
    addAdmin,validateUser
}