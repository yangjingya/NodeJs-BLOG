const express=require('express');
const swig=require('swig');

const app=express();

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

app.use('/public',express.static('./public'));

app.use('/',function(req,res){
    res.render('index');
})

app.listen(8080);