const mongoose = require('mongoose');

const publicationSchema=mongoose.Schema({
    titre:{
        type:String,
        required:true,
        
    },
   
    date:{
        type:Date,
        default:Date.now() },

    contenu:{
        type:String,
        required:true,
        
    },
    resume:{
        type:String,
    }

})


module.exports=mongoose.model("Publication" , publicationSchema) ; 
