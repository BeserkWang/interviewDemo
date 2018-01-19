
$('#loginSub').click(function() {
    var loginNum = $('#loginNum').val();
    var loginPwd = $('#loginPwd').val();
    var user = {};
    var data ;
    user.loginNum = loginNum;
    user.loginPwd = loginPwd;
    data = user;
    console.log(data);
    $.post('http://localhost:3000/user/login',data,function(res) {
        console.log(res.data);
        if(res.data == '登录成功') {
            sessionStorage.user = loginNum;
            window.location.href = './me-index.html';
            
        }else {
            $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
            $('.errorBox').css('display','block').addClass('zoomIn');
            $('.ErrorTips').text('您的用户名或者密码有误');
        }
    })
})

$('.close').click(function() {
    $('.ErrorTipsBox').removeClass('slideInUp').addClass('fadeOut').css('display','none');
    $('.errorBox').removeClass('zoomIn').addClass('rotateOut').css('display','none');
})
