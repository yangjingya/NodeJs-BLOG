const express=require('express');
const swig=require('swig');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const app=express();

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

app.use('/public',express.static('./public'));

app.use(bodyParser.urlencoded({extends:true}));

app.use(cookieParser('shduegiubibdsuaud'));

app.use(function(req,res,next){
    req.userInfor={};
    
    if(req.signedCookies.userInfor){
        try{
            req.userInfor=req.signedCookies.userInfor;
        }catch(e){
            console.log(e);
        }
    }
    next();
});

app.use('/',require('./routers/main'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8080);
    }
});

