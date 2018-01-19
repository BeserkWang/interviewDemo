//显示昵称
$.post('http://localhost:3000/user/me/index',function(res) {
    console.log(res.data);
    var meIndexData = JSON.parse(res.data);
    console.log(meIndexData[0].name);
    $('.username').text(meIndexData[0].name);
})

//上传照片
$('#uploadA').html5Uploader({
    //name:上传字段标识
    name:'avater',
    //上传地址
    postUrl:'/uploader/file',
    //上传成功时候调用此回调函数
    onSuccess:function(msg) {
        //try{}..catch(){}  测试代码块
        try {
            //获取服务器返回的url
            var url = JSON.parse(msg.target.responseText).url;
            //然后把返回的url设置为Img的url
            $('img').attr('src',img)
        } catch(error) {
            console.log(error);
        }
    },
    //onServerReadyStateChange:
    //一个javascript 功能对象无论任何时候readyState属性变化时
    onServerReadyStateChange:function(e) {
        if(e.target.readyState == 4) {
            try {
                //获取服务器返回的url
                var url = JSON.parse(e.target.responseText).url;
                //然后把返回的url设置为Img的url
                $('img').attr('src',url)
            } catch (error) {
                console.log(error);
            }
        }
    }
})