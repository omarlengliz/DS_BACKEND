const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const Register = async (req,res)=>{
    const {nom , prenom ,telephone, login } = req.body ;
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
  
    const existedUser =await  User.findOne({login:login})   ; 
    if(existedUser){
        return res.status(400).json({msg:"Ce Login est deja utiliser "})
    }
   
   
    try {
        const user=await User.create({
            nom,
            prenom,
            telephone,
            login,
            role:"author",
            status:"EA"
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
        res.status(500).json({msg:error.message})
    }
   
}
const SignIn = async (req,res) =>{
    const {login , password } = req.body  
    if(!login) {
        return res.status(400).json({msg:"login est obligatoire"})
    }
    if(!password) {
        return res.status(400).json({msg:"mot de passe est obligatoire"})
    }
    try {
        const ExistedUser = await User.findOne({login: login }) 
        if(!ExistedUser) {
                res.status(404).json({message : "Mot de passe ou login incorrecte "})
        }
        const isMatch = await bcrypt.compare(password , ExistedUser.password) ;
        if(!isMatch) {
            res.status(400).json({message:"Mot de passe ou login incorrecte "})
        }   
        const token  = jwt.sign({
            id: ExistedUser._id,
        }, process.env.SECRET_KEY, { expiresIn: "30d" })
       
       
        res.status(200).json({token})


    } catch (error) {
        res.json({message : error.message}) 
    }

}

module.exports = {
    Register , 
    SignIn
}