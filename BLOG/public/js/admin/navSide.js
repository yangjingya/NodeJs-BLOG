$(function(){

    var guideNav=$('#guide-nav');
    var home=$('#home');
    var userManage=$('#userManage');
    var categaryManage=$('#categaryManage li');
    var articleManage=$('#articleManage li');
    var comment=$('#comment');

    $($.cookie('choice')).addClass('choose');
    home.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
    userManage.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
    categaryManage.on('click',function(){
        alert($(this).attr('id'));
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });
    // categoryManage.each(function(){
    //     $(this).find('li').on('click',function(){
    //         alert(11);
    //         $($.cookie('choice')).removeClass('choose');
    //         $.cookie('choice','#'+$(this).attr('id'));
    //     });
    // });
    // articleManage.each(function(){
    //     $(this).find('li').on('click',function(){
    //         alert(11);
    //         $($.cookie('choice')).removeClass('choose');
    //         $.cookie('choice','#'+$(this).attr('id'));
    //     });
    // });
    comment.on('click',function(){
        $($.cookie('choice')).removeClass('choose');
        $.cookie('choice','#'+$(this).attr('id'));
    });

});