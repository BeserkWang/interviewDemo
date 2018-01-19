// 当用户点击图标以后等待一秒后进入主页面

var a = document.querySelector('a');
a.onclick  = function() {
    setTimeout(function() {
        location.href = 'leadpage.html';
    }, 1000);
}