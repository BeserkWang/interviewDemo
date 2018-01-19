window.onload = function() {
    var canvas = document.querySelector('#folding');
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //绘制一个三角形
        ctx.beginPath();  //开始一条路径
        ctx.moveTo(0,0);   //确定开始坐标
        ctx.lineTo(375,0);
        ctx.lineTo(0,120);
        ctx.strokeStyle = "#88cb84";
        ctx.stroke();//空心三角形

    }
}