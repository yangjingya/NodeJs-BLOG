const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    title:String,
    //引用
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    description:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    }
});