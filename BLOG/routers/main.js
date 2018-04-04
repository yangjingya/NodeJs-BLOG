const express=require('express');
const router=express.Router();
var Category=require('../models/Category');
var Content=require('../models/contents');

router.get('/',function (req,res) {
    var page=isNaN(req.query.page)?1:req.query.page||1;
    var limit=4;
    var skip=0;
    var totalPages=0;
    var arr=[];
    var categories=[];
    Category.find().then(function(result){
        categories=result;
        return Content.count().then(function(count){
            totalPages=Math.ceil(count/limit);
            page=Math.min(page,totalPages);
            page=Math.max(1,page);
            skip=(page-1)*limit;
    
            for(var i=0;i<totalPages;i++){
                arr[i]=i+1;
            }
    
                Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function(result){
                    console.log(result.time);
                    result.time=(new Date().setTime(result.time*1000)).toLocaleString();
                    console.log(result.time);
                    console.log((new Date().setTime(result.time*1000)).toLocaleString());
                    res.render('main/index',{
                        userInfor:req.userInfor,
                        categories:categories,
                        contents:result
                });
            });
        })     
    });
});

module.exports=router;