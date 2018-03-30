const express=require('express');
const router=express.Router();
var User=require('../models/User');

router.use(function(req,res,next){
    if(!req.userInfor.isadmin){
        return;
    }
    next();
});

router.get('/home',function(req,res){
    res.render('admin/index');
});

router.get('/userManage',function(req,res){
    User.find().then(function(result){
        res.render('admin/userManage',{
            users:result
        });
    });
});

module.exports=router;