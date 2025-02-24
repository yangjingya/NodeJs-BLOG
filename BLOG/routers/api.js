const express=require('express');
const router=express.Router();
var User=require('../models/User');
var encrypt=require('../public/js/encrypt');

var responseData;

router.use(function (req,res,next) { 
    responseData={
        code:0,
        message:''
    }
    next();
 });

//  注册
router.post('/user/register',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;
    var address=req.body.address;

    if(username==''){
        responseData.code=1;
        responseData.message='用户名不能为空！';
        res.json(responseData);
        return;
    }
    if(password==''){
        responseData.code=2;
        responseData.message='密码不能为空！';
        res.json(responseData);
        return;
    }
    if(password!=repassword){
        responseData.code=3;
        responseData.message='两次输入的密码不一致!';
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username
    }).then(function(result){
        if(result){
            responseData.code=4;
            responseData.message='用户名已经被注册了';
            res.json(responseData);
            return;
        }
        var encryptPassword=encrypt.md5(password);
        var user=new User({username:username,password:encryptPassword,avatarUrl:'/public/images/avatar/default.jpg',address:address});
        return user.save();
    }).then(function(result){
        responseData.message='注册成功';
        responseData.userInfo={
            id:result._id,
            username:result.username,
            avatarUrl:result.avatarUrl,
            address:result.address
        }
        res.secret='shduegiubibdsuaud';
        res.cookie('userInfor',{
            id:result._id,
            username:result.username,
            avatarUrl:result.avatarUrl,
            address:result.address
        },{'signed':true});
        res.json(responseData);
    });
});
//  注册

// 登录
router.post('/user/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    if(username==''){
        responseData.code=1;
        responseData.message='用户名不能为空';
        res.json(responseData);
        return;
    }
    if(password==''){
        responseData.code=2;
        responseData.message='密码不能为空！';
        res.json(responseData);
        return;
    }
    var encryptPassword=encrypt.md5(password);
    User.findOne({
        username:username,
        password:encryptPassword
    }).then(function(result){
        if(!result){
            responseData.code=2;
            responseData.message='用户名或密码错误！';
            res.json(responseData);
            return;
        }
        responseData.message='登录成功';
        responseData.userInfo={
            id:result._id,
            username:result.username,
            avatarUrl:result.avatarUrl,
            address:result.address
        }
        res.secret='shduegiubibdsuaud';
        res.cookie('userInfor',{
            id:result._id,
            username:result.username,
            avatarUrl:result.avatarUrl,
            address:result.address
        },{'signed':true});
        res.json(responseData);
    });
});
// 登录

// 更换头像
router.post('/user/avatar',function(req,res){
    var conditions={username:req.userInfor.username};
    var updata={$set:{avatarUrl:req.body.avatarUrl}};

    User.update(conditions,updata).then(function(err,result){
        if(err){
            console.log(err);
        }else{
            responseData.message='头像修改成功';
        }
        return User.findOne({
            username:req.userInfor.username
        });
    }).then(function(result){
        res.secret='shduegiubibdsuaud';
        res.cookie('userInfor',{
            id:result._id,
            username:result.username,
            avatarUrl:result.avatarUrl,
            address:result.address
        },{'signed':true});
        res.json(responseData);
    });
});
// 更换头像

//退出登录
router.post('/user/signout',function(req,res){
    res.clearCookie('userInfor');
    responseData.message='退出成功';
    res.json(responseData);
});
//退出登录


module.exports=router;