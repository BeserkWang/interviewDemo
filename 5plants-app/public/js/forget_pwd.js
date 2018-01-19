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

var foPhone = $('#phone').val();
var foSend = $('#send').val();
$('#send').click(function(e) {
    time(this);
})

$('.sure').click(function(e) {

})