$(function(){
    //导航栏添加高亮
    var urlstr = location.href;  
    console.log(urlstr);
    var urlstatus=false;  
    $('#guide-nav a').each(function () {  
    if ((urlstr + '/').indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {  
    $(this).addClass('choose'); urlstatus = true;  
    } else {  
    $(this).removeClass('choose');  
    }  
    });  
    if (!urlstatus) {$('#guide-nav a').eq(0).addClass('choose'); }  
    //导航栏添加高亮

    //侧栏伸缩
    $('.inactive').click(function(){  
        var className=$(this).parents('li').parents().attr('class');  
        if($(this).siblings('ul').css('display')=='none'){  
            if(className=="yiji"){  
                $(this).parents('li').siblings('li').children('ul').slideUp(100);  
            }  
            $(this).siblings('ul').slideDown(100).children('li');  
        }else {   
            $(this).siblings('ul').slideUp(100);  
        }  
    })  
    //侧栏伸缩
    $('#signout').on('click',function(){
        window.location.href="/home";
    });


});