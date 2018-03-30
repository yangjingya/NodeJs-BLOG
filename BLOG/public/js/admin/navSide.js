$(function(){

    var guideNav=$('#guide-nav');
    var home=$('#home');
    var userManage=$('#userManage');
    var categoryManage=$('#categoryManage');
    var articleManage=$('#articleManage');
    var comment=$('#comment');
    
    if($.cookie('fromAdmin')!=""){
        console.log(123);
        $.cookie('choice','#home');
        $.cookie('fromAdmin',"");
    }

    $($.cookie('choice')).addClass('choose');
    
    home.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
    userManage.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
    categoryManage.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });

    articleManage.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
  
    comment.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });

});