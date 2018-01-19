$(".red").click(function () {
    var formData = new FormData();
    var comments = $("#addcontent").val();

    //--------------------  开始
    console.log(comments);
    if (comments.trim() == '') {
        $('.ErrorTipsBox').css('display', 'block').addClass('slideInUp');
        $('.errorBox').css('display', 'block').addClass('zoomIn');
        $('.ErrorTips').text('您什么都没输入哦');
    } else {
        formData.append("myfile", document.getElementById("uploadA").files[0]);
        formData.append("comments", comments);
        formData.append("names", "jasper");
        $.ajax({
            url: "http://lininn.cn/study/upload/",
            type: "POST",
            data: formData,
            /**
            *必须false才会自动加上正确的Content-Type
            */
            contentType: false,
            /**
            * 必须false才会避开jQuery对 formdata 的默认处理
            * XMLHttpRequest会对 formdata 进行正确的处理
            */
            processData: false,
            success: function (data) {
                console.log(data);
                // alert("发布成功！");
                window.location.href = 'share.html'
            },
            error: function () {
                alert("上传失败！");
                $("#imgWait").hide();
            }
        });
    };

})
function imgchange(obj) {

    if (navigator.userAgent.indexOf("MSIE") > -1) {
        $("#news_img").attr("src", obj.value);
    } else {
        $("#news_img").attr("src", URL.createObjectURL(obj.files[0]));
    }

}
$("#uploadA").change(function () {
    imgchange(document.getElementById("uploadA"));
});
//-------------------- 结束

//--------------------  开始
$('.close').click(function () {
    $('.ErrorTipsBox').removeClass('slideInUp').addClass('fadeOut').css('display', 'none');
    $('.errorBox').removeClass('zoomIn').addClass('rotateOut').css('display', 'none');
})
 //--------------------  结束