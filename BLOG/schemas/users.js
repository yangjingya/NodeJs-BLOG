const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    username:String,
    password:String,
    avatarUrl:String,
    isadmin:{
        type:Boolean,
        default:false
    }
});

