const express=require('express');
const router=express.Router();
var Category=require('../models/Category');

router.get('/',function (req,res) {
    Category.find().then(function(result){
        res.render('main/index',{
            userInfor:req.userInfor,
            categories:result
        });
    });
});

module.exports=router;