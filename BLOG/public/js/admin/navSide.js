$(function(){

    var guideNav=$('#guide-nav');
    var home=$('#home');
    var userManage=$('#userManage');
    var categoryManage=$('#categoryManage');
    var articleManage=$('#articleManage');
    var comment=$('#comment');
    var signout=$('#signout');
    
    if($.cookie('choice')=="null"){
        $.cookie('choice','#home');
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

    signout.on('click',function(){
        $.cookie('choice',null);
        window.location="/";
    });


});