const express=require('express');
const router=express.Router();

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
    res.render('admin/userManage');
});

module.exports=router;