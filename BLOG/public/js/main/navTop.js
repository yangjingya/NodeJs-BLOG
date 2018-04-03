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
});