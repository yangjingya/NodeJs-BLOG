const express=require('express');
const router=express.Router();
var Category=require('../models/Category');
var Content=require('../models/contents');

var categories=[];
router.use(function(req,res,next){
    Category.find().then(function(result){
        categories=result;       
    });
    next();
})

router.get('/',function (req,res) {
    var id=req.query.id;
    var page=isNaN(req.query.page)?1:req.query.page||1;
    var limit=4;
    var skip=0;
    var totalPages=0;
    var arr=[];
    if(id=='all'){
        Content.count().then(function(count){
            totalPages=Math.ceil(count/limit);
            page=Math.min(page,totalPages);
            page=Math.max(1,page);
            skip=(page-1)*limit;
    
            for(var i=0;i<totalPages;i++){
                arr[i]=i+1;
            }
    
            Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function(result){
                for(var i=0;i<result.length;i++){
                    var date=new Date(parseInt(result[i].time));
                    result[i].time=date.getFullYear() + '/'+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/'+(date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '+
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'+(date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'+(date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                }
                res.render('main/index',{
                    userInfor:req.userInfor,
                    categories:categories,
                    page:page,
                    arr:arr,
                    contents:result
                });
            });
        })  
    }else{
        Content.count({category:id}).then(function(count){
            totalPages=Math.ceil(count/limit);
            page=Math.min(page,totalPages);
            page=Math.max(1,page);
            skip=(page-1)*limit;
    
            for(var i=0;i<totalPages;i++){
                arr[i]=i+1;
            }
    
            Content.find({category:id}).sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function(result){
                for(var i=0;i<result.length;i++){
                    var date=new Date(parseInt(result[i].time));
                    result[i].time=date.getFullYear() + '/'+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/'+(date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '+
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'+(date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'+(date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                }
                res.render('main/index',{
                    userInfor:req.userInfor,
                    categories:categories,
                    page:page,
                    arr:arr,
                    contents:result
                });
            });
        })  
    }
    
});

router.get('/contentDetail',function(req,res){
    var id=req.query.id;
    Content.findOne({_id:id}).populate('category').then(function(result){
        var date=new Date(parseInt(result.time));
        result.time=date.getFullYear() + '/'+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/'+(date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '+
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'+(date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'+(date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        
        res.render('main/content',{
            userInfor:req.userInfor,
            categories:categories,
            content:result
        })
    })
});

module.exports=router;