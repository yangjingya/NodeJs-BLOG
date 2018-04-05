const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    time:String,
    //引用
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        default:''
    }
});