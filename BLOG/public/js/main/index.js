$(function(){
  
    var loginBox=$('#loginBox');
    var registerBox=$('#registerBox');
    var loginSuccess=$('#loginSuccess');
    var loginFail=$('#loginFail');

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
                repassword:registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function (result) { 
                registerBox.find('.warningInfo').html(result.message);
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
                if(!result.code){
                    setTimeout(() => {
                        //登录成功
                        loginBox.hide();
                        loginSuccess.show();
                        loginSuccess.find('.adminName').html(result.userInfo.username);
                        //登录成功
                    }, 1000);
                }
            }
        });
    });
    //登录

    
 
    
});