
var user = {
    phone:'',
    pwd:'',
    sendNum:'',
    name:''

};
//手机号部分
$('#phone').blur(function() {
    var phone = $('#phone').val();
    console.log(phone);
    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(phone))) {
        $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
        $('.errorBox').css('display','block').addClass('zoomIn');
        $('.ErrorTips').text('您输入的手机号格式不正确');
    }else {
        user.phone = phone;
    }
})
$('.close').click(function() {
    $('.ErrorTipsBox').removeClass('slideInUp').addClass('fadeOut').css('display','none');
    $('.errorBox').removeClass('zoomIn').addClass('rotateOut').css('display','none');
})

//昵称部分
$('#username').blur(function() {
    var username = $('#username').val();
    user.name = username;
})

//密码部分
$('#password').blur(function() {
    var pwd = $('#password').val();
    console.log(pwd);
    if(pwd.indexOf(' ') > -1) {
        $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
        $('.errorBox').css('display','block').addClass('zoomIn');
        $('.ErrorTips').text('您输入的密码有空格');
    }else {
        if(pwd.length < 6 || pwd.length > 12) {
            $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
            $('.errorBox').css('display','block').addClass('zoomIn');
            $('.ErrorTips').text('您输入的密码应大于6位且小于12位');
        }else {
            user.pwd = pwd;
        }
    }
})

//再次输入密码
$('#pswAgain').blur(function() {
    var pwdAgin = $('#pswAgain').val();
    console.log(user.pwd)
    if(pwdAgin != user.pwd) {
        $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
        $('.errorBox').css('display','block').addClass('zoomIn');
        $('.ErrorTips').text('您两次输入的密码不一致');
    }else {
        user.pwd = pwdAgin;
    }
})

//验证码部分
var wait = 60
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled")
        o.value = "点击获取"
        wait = 60
    } else {
        o.setAttribute("disabled", true)
        o.value = wait + "s"
        wait--
        setTimeout(function () {
            time(o)
        }, 1000)
    }
}

$('#send').click(function(e) {
    e.preventDefault();
    time(this);
    $.get('http://localhost:3000/register/cofirmNum',function(res) {
        console.log((JSON.parse(res)).confirmNum);
        console.log((JSON.parse(res)).confirmNum.toString())
        alert((JSON.parse(res)).confirmNum.toString());
        $('#sendNum').blur(function() {
            sendNum = $('#sendNum').val();
            if (sendNum == (JSON.parse(res.confirmNum))) {
                user.sendNum = sendNum;
            }
        })
    })
   
   
})
$('.sure').click(function(e) {
    e.preventDefault();
    console.log(user);
    window.location.href = 'login.html';
    var data = user;
    console.log(data)
    $.post('http://localhost:3000/register/user',data,function(res) {
        console.log(res.data)
        $('.ErrorTipsBox').css('display','block').addClass('slideInUp');
        $('.errorBox').css('display','block').addClass('zoomIn');
        $('.ErrorTips').text(res.data);
    })
})