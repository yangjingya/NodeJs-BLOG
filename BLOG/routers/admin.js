const express=require('express');
const router=express.Router();
var User=require('../models/User');
var Category=require('../models/Category');

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
    var page=isNaN(req.query.page)?1:req.query.page||1;
    var limit=4;
    var skip=0;
    var totalPages=0;
    var arr=[];
    User.count().then(function(count){
        totalPages=Math.ceil(count/limit);
        page=Math.min(page,totalPages);
        page=Math.max(1,page);
        skip=(page-1)*limit;

        for(var i=0;i<totalPages;i++){
            arr[i]=i+1;
        }

        User.find({isadmin:false}).limit(limit).skip(skip).then(function(result){
            res.render('admin/userManage',{
                users:result,
                page:page,
                arr:arr
            });
        });
    })
});

router.get('/categoryManage/categoryHome',function(req,res){
    res.render('admin/categoryManage');
});

router.get('/categoryManage/categoryAdd',function(req,res){
    res.render('admin/categoryAdd');
});

router.post('/categoryManage/categoryAdd',function(req,res){
    var categoryName=req.body.category||'';
    if(category==''){
        res.render('error',{
            message:'输入不能为空！'
        });
        return;
    }

    Category.findOne({
        categoryName=categoryName
    }).then(function(result){
        if(result){
            res.render('error',{
                message:'分类已经存在！'
            });
            return Promise.reject();
        }else{
            var categorySave=new Category({categoryName:categoryName});
            return categorySave.save();
        }
    }).then(function(result){
        res.render('success',{
            message:'分类保存成功！',
            url:'/categoryManage/categoryHome'
        })
    });
});

router.get('/articleManage',function(req,res){
    res.send('文章管理');
});

router.get('/comment',function(req,res){
    res.send('评论');
});

module.exports=router;