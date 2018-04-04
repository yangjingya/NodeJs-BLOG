const express=require('express');
const router=express.Router();
var User=require('../models/User');
var Category=require('../models/Category');
var Content=require('../models/contents');

var allcategories=[];
var responseData;
router.use(function(req,res,next){
    if(!req.userInfor.isadmin){
        return;
    }
    responseData={
        code:0,
        message:''
    }
    Category.find().then(function(result){
        allcategories=result;
    });
    next();
});

router.get('/home',function(req,res){
    res.render('admin/index',{
        allcategories:allcategories
    });
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
                arr:arr,
                url:'/admin/userManage',
                allcategories:allcategories
            });
        });
    })
});

router.get('/categoryManage/categoryHome',function(req,res){
    var page=isNaN(req.query.page)?1:req.query.page||1;
    var limit=4;
    var skip=0;
    var totalPages=0;
    var arr=[];
    Category.count().then(function(count){
        totalPages=Math.ceil(count/limit);
        page=Math.min(page,totalPages);
        page=Math.max(1,page);
        skip=(page-1)*limit;

        for(var i=0;i<totalPages;i++){
            arr[i]=i+1;
        }

            Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(result){
            res.render('admin/categoryHome',{
                categories:result,
                page:page,
                arr:arr,
                url:'/admin/categoryManage/categoryHome',
                allcategories:allcategories
            });
        });
    })
});

router.get('/categoryManage/edit',function(req,res){
    var id=req.query.id||'';
    Category.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'分类信息不存在！'
            });
            return;
        }else{
            res.render('admin/categoryEdit',{
                category:result,
                id:id,
                allcategories:allcategories
            });
        }
    });
});

router.post('/categoryManage/edit',function(req,res){
    var id=req.query.id||'';
    var newCategory=req.body.newCategory||'';
    if(newCategory==''){
        res.render('error',{
            message:'输入不能为空！'
        });
        return;
    }
    Category.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'分类信息不存在！'
            });
            return;
        }else{
            if(newCategory==result.categoryName){
                res.render('success',{
                    message:'分类保存成功！',
                    url:'/admin/categoryManage/categoryHome'
                });
                return Promise.reject();
            }else{
                return  Category.findOne({
                    _id:{$ne:id},
                    categoryName:newCategory
                });
            }   
        }
    }).then(function(result){
        if(result){
            res.render('error',{
                message:'分类已经存在！'
            });
            return Promise.reject();
        }else{
            var condition={_id:id};
            var update={$set:{categoryName:newCategory}};
            return Category.update(condition,update);
        }
    }).then(function(result){
        res.render('success',{
            message:'分类保存成功！',
            url:'/admin/categoryManage/categoryHome',
            allcategories:allcategories
        })
    });
});

router.get('/categoryManage/delete',function(req,res){
    var id=req.query.id||'';

    Category.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'分类信息不存在！'
            });
            return;
        }else{
            Category.remove({
                _id:id
            }).then(function(){
                res.render('success',{
                    message:'分类删除成功！',
                    url:'/admin/categoryManage/categoryHome',
                    allcategories:allcategories
                })
            });
        }
    });
});

router.get('/categoryManage/categoryAdd',function(req,res){
    res.render('admin/categoryAdd',{
        allcategories:allcategories
    });
});

router.post('/categoryManage/categoryAdd',function(req,res){
    var category=req.body.category||'';
    if(category==''){
        res.render('error',{
            message:'输入不能为空！'
        });
        return;
    }

    Category.findOne({
        categoryName:category
    }).then(function(result){
        if(result){
            res.render('error',{
                message:'分类已经存在！'
            });
            return Promise.reject();
        }else{
            var categorySave=new Category({categoryName:category});
            return categorySave.save();
        }
    }).then(function(result){
        res.render('success',{
            message:'分类保存成功！',
            url:'/admin/categoryManage/categoryHome',
            allcategories:allcategories
        })
    });
});

router.get('/articleManage/articleHome',function(req,res){
    var id=req.query.id||'';
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
                    res.render('admin/articleHome',{
                    contents:result,
                    page:page,
                    arr:arr,
                    url:'/admin/articleManage/articleHome',
                    allcategories:allcategories
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
    
                Content.find({
                    category:id
                }).sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function(result){
                    res.render('admin/articleHome',{
                    contents:result,
                    page:page,
                    arr:arr,
                    url:'/admin/articleManage/articleHome',
                    allcategories:allcategories
                });
            });
        })
    }
    
});

router.get('/articleManage/articleAdd',function(req,res){
    Category.find().then(function(result){
        res.render('admin/articleAdd',{
            categories:result,
            allcategories:allcategories
        });
    });
});

router.post('/articleManage/articleAdd',function(req,res){
    if(req.body.category==''){
        res.render('error',{
            message:'分类内容不能为空'
        });
        return;
    }
    if(req.body.title==''){
        res.render('error',{
            message:'内容标题不能为空'
        });
        return;
    }
    var time=new Date().getTime();
    var content=new Content({
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        time:time
    });
    content.save().then(function(result){
        res.render('success',{
            message:'内容保存成功！'
        });
    });
});

router.get('/articleManage/edit',function(req,res) {
    var id=req.query.id||'';
    var categories=[];
    Category.find().then(function(result){
        categories=result;
        return  Content.findOne({
            _id:id
        });
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'此博客不存在！'
            });
            return;
        }else{
            res.render('admin/articleEdit',{
                content:result,
                categories:categories,
                id:id,
                allcategories:allcategories
            });
        }
    });
});

router.post('/articleManage/edit',function(req,res){
    var id=req.query.id||'';
    var newCategory=req.body.category||'';
    var newTitle=req.body.title||'';
    var newDescription=req.body.description||'';
    var newContent=req.body.content||'';
    console.log(id);
    if(newCategory==''){
        res.render('error',{
            message:'分类输入不能为空！'
        });
        return;
    }
    if(newTitle==''){
        res.render('error',{
            message:'标题输入不能为空！'
        });
        return;
    }
    Content.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'博客信息不存在！'
            });
            return;
        }else{
            if(newCategory.toString()==result.category.toString()&&newTitle==result.title&&newDescription==result.description&&newContent==result.content){
                res.render('success',{
                    message:'博客保存成功！',
                    url:'/admin/categoryManage/categoryHome'
                });
                return Promise.reject();
            }else{
                var condition={_id:id};
                var update={$set:{category:newCategory,title:newTitle,description:newDescription,content:newContent}};
                return Content.update(condition,update);
            }   
        }
    }).then(function(result){
        res.render('success',{
            message:'分类保存成功！',
            url:'/admin/articleManage/articleHome'
        })
    });
});

router.get('/articleManage/delete',function(req,res){
    var id=req.query.id||'';
    Content.findOne({
        _id:id
    }).then(function(result){
        if(!result){
            res.render('error',{
                message:'博客不存在！'
            });
            return;
        }else{
            Content.remove({
                _id:id
            }).then(function(){
                res.render('success',{
                    message:'博客删除成功！',
                    url:'/admin/articleManage/articleHome'
                })
            });
        }
    });
});

router.get('/comment',function(req,res){
    res.send('评论');
});

module.exports=router;