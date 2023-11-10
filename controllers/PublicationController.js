const Publication = require("../models/Publication");
const User = require("../models/User");

const createPub= async (req,res)=>{
    const {titre , contenu } = req.body ;
    if(!titre) {
        return res.status(400).json({msg:"titre est obligatoire"}) ;  
    }
    if(!contenu) {
        return res.status(400).json({msg:"contenu est obligatoire"}) ;  
    }
  
    try {
        const pub=await Publication.create({
            titre,
            contenu,
            resume:contenu.slice(10)
        })
        const user=await User.findByIdAndUpdate(req.auth.id , {
            $push : {publications : pub._id}
        })
        return res.status(201).json({
            id:pub._id , 
            titre:pub.titre ,
            contenu:pub.contenu,
            date:pub.date,
            resume:pub.resume
        })        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

const getPub = async (req,res) =>{
    const {id} = req.params 
    try {
        const post = await Publication.findById(id)
        if(!post) {
            res.status(404).json({message:"Axcune pub de ce id"})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
const getUserPubs = async(req,res)=>{
    
   try{
    const user=await User.findById(req.auth.id).populate("publications")
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
      return res.status(200).json(user)
   }catch(error){
    return res.status(500).json({message : error.message})
   }

}

module.exports={createPub,getPub,getUserPubs};
