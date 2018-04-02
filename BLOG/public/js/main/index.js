$(function(){
  
    var loginBox=$('#loginBox');
    var registerBox=$('#registerBox');
    var loginSuccess=$('#loginSuccess');
    var loginFail=$('#loginFail');

    var userInfo={
        username:'',
        avatarUrl:''
    }

    //登录、注册切换
    registerBox.find('a').on('click',function(){
        registerBox.hide();
        loginBox.show();
    });

    loginBox.find('a').on('click',function(){
        loginBox.hide();
        registerBox.show();
    });
    //登录、注册切换

    //注册
    registerBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:registerBox.find('[name="username"]').val(),
                password:registerBox.find('[name="password"]').val(),
                repassword:registerBox.find('[name="repassword"]').val(),
                address:remote_ip_info['country']+remote_ip_info['province']+remote_ip_info['city']
            },
            dataType:'json',
            success:function (result) { 
                registerBox.find('.warningInfo').html(result.message);
                userInfo.username=result.userInfo.username;
                window.location.reload();
             }
        });
    });
    //注册

    //登录
    loginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:loginBox.find('[name="username"]').val(),
                password:loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function(result){
                loginBox.find('.warningInfo').html(result.message);
                userInfo.username=result.userInfo.username;
                window.location.reload();
            }
        });
    });
    //登录    

    //更改头像
    $('#avatar-container ul li').each(function(){
        $(this).bind('click',function(){
            $('#avatar-container ul li').each(function(){
                $(this).css({'box-shadow':'none','border':'1px solid lightblue'});
            });
            $(this).css({'box-shadow':'0 0 10px 1px orange','border':'none'});
            userInfo.avatarUrl=$(this).find('img').attr('src');
        });
    });
    $('.btnChoose').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/avatar',
            data:{
                avatarUrl:userInfo.avatarUrl
            },
            dataType:'json',
            success:function(result){
                window.location.href='/';
            }
        });
    });
    //更改头像

    //退出
    $('#signout').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/signout',
            dataType:'json',
            success:function(result){
                window.location.reload();
            }
        });
    });
    //退出

    //跳转后台
    $('#jumpTo').on('click',function(){
        window.location="/admin/home";
    });
    //跳转后台
});