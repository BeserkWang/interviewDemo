/** ----------------------------日历开始----------------------------------*/
var calenderBody = document.getElementsByClassName('calender')[0];
function Calender(month) {
    var div;
    this.currentMonth = month || new Date();
    this.currentMonth.setDate(1);

    this.getFirstDate = function () {
        var week = this.currentMonth.getDay();
        if (week == 0) {
            week = 7;
        }
        week = week - 2;
        var firstDate = new Date(this.currentMonth);
        firstDate.setDate(-week);
        return firstDate;
    }

    this.showCalenderMain = function () {
        div = document.createElement('div');
        div.style.width = '100%';
        div.style.minHeight = '1.33333333333rem';
        calenderBody.appendChild(div);
    }

    //展示日历的表头部分
    this.showHeader = function () {
        var table = document.createElement('table');
        table.style.width = '100%';
        table.style.border = "1px solid #88cb84";
        table.style.borderLeft = 'none';
        table.style.borderRight = 'none';
        var tr = table.insertRow();
        function getWeekName(week) {
            switch (week) {
                case 1:
                    return '一';
                case 2:
                    return '二';
                case 3:
                    return '三';
                case 4:
                    return '四';
                case 5:
                    return '五';
                case 6:
                    return '六';
                case 7:
                    return '七';

            }
        }
        for (var i = 1; i <= 7; i++) {
            var td = tr.insertCell();
            td.style.fontSize = '0.3733333rem';
            td.style.color = '#88cb84';
            td.style.textAlign = 'center';
            td.innerHTML = getWeekName(i);
        }
        div.appendChild(table);
    };


    //展示日历主体部分
    this.showBody = function () {
        var firstDate = this.getFirstDate().getTime();
        var table = document.createElement('table');
        table.style.paddingBottom = '0.26666667rem';
        table.style.width = '100%';
        table.style.borderCollapse = "collapse";
        for (var i = 0; i < 6; i++) {
            var tr = table.insertRow();
            for (var j = 0; j < 7; j++) {
                var td = tr.insertCell();
                
                td.style.textAlign = 'center';
                td.style.color = '#88cb84';
                td.style.fontWeight = 'bold';
                td.style.height = '0.26666667rem';
                td.style.border = "1px solid #88cb84";
                td.style.borderTop = "none";
                td.style.borderLeft = "none";
                td.style.padding = '0.16rem';
                var n = i * 7 + j;
                var cellDate = new Date(firstDate + n * 24 * 60 * 60 * 1000);
                td.innerHTML = cellDate.getDate();
                if (cellDate.getMonth() != this.currentMonth.getMonth()) {
                    td.style.color = '#bdbdbd';
                    
                }else {
                    var nowDate = new Date();
                    td.setAttribute('class','dateT')
                    if(cellDate.getDate() == nowDate.getDate()) {
                       td.setAttribute('class','nowDateT')
                        
                    }
                }
               
               if(j == 6) {
                   td.style.borderRight = "none";
               }

            }
        }

        div.appendChild(table);
    }



    //添加日历标题
    this.showToolbar = function () {
        var bar = document.createElement('div');
        bar.setAttribute('class','recordingMonth')
        bar.style.color = '#88cb84';
        bar.style.fontSize = '0.4666666667rem';
        bar.style.padding = '0.26666667rem';
        bar.style.textAlign = 'center';
        bar.innerHTML = (this.currentMonth.getMonth() + 1) + ' / ' + this.currentMonth.getFullYear() ;
        div.appendChild(bar);


        //切换至下个月
        var next = document.createElement('span');
        next.innerHTML = '&nbsp;&nbsp;&gt;';
        next.style.float = 'right';
        next.style.cursor = 'pointer';
        bar.appendChild(next);

        var calender = this;
        next.onclick = function () {
            var month = calender.currentMonth.getMonth();
            month++;
            calender.currentMonth.setMonth(month);
            calenderBody.innerHTML = '';
            calender.show();
        }

        //切换至上个月
        var prev = document.createElement('span');
        prev.innerHTML = '&nbsp;&nbsp;&lt;'
        prev.style.float = 'left';
        prev.style.cursor = 'pointer';
        bar.appendChild(prev);
        var calender = this;
        prev.onclick = function () {
            var month = calender.currentMonth.getMonth();
            month--;
            calender.currentMonth.setMonth(month);
            calenderBody.innerHTML = '';
            calender.show();
        }

    }

    this.show = function () {
        this.showCalenderMain();
        this.showToolbar();
        this.showHeader();
        this.showBody();
    }
}
var calen = new Calender();
calen.show();

/** ------------------------日历结束--------------------------------------*/


/** ------------------------品种输入开始--------------------------------------*/

//品种的点击事件 当点击写字符号的时候符号消失 横线出现
var variety = document.querySelector('.variety-write');
var varietyInput = document.querySelector('.variety-input');

    variety.style.display = 'none';
    varietyInput.style.display = 'block';


/** ----------------------------品种输入结束----------------------------------*/




/** ----------------------------显示天气开始----------------------------------*/

//天气 选择哪个天气 天气高亮 且鼠标滑过各个图标时显示该符号的含义 弹出小tips
var weatherArr = [
    '晴朗',
    '多云',
    '阵雨',
    '打雷',
    '下雪'
]
$('ul.level-weather li').on({
        click:function() {
            console.log($(this).index());
            var indexs = $(this).index();
            var left =  $(this).index()*$(this).width();
            $('#weather-tips').css('display','block');
            $('#weather-tips').css('left',left).text(weatherArr[indexs]);
            $(this).addClass('current').siblings().removeClass('current');
            setTimeout(function() {
                $('#weather-tips').css('display','none');
            },2000)
        } 
})



/** ----------------------------显示天气结束----------------------------------*/


/** ----------------------------显示叶子颜色开始----------------------------------*/
var leavesArr = [
    '病态',
    '较好',
    '正常',
    '好',
    '很好'
]
$('ul.level-leaves li').on({
    click:function() {
        console.log($(this).index());
        var indexs = $(this).index();
        var left =  $(this).index()*$(this).width();
        $('#leaves-tips').css('display','block');
        $('#leaves-tips').css('left',left).text(leavesArr[indexs]);
        $(this).addClass('current').children().removeClass('icon-yezi1').addClass('icon-icon1');
        $(this).siblings().removeClass('current');
        $(this).siblings().children().removeClass('icon-icon1').addClass('icon-yezi1')
        setTimeout(function() {
            $('#leaves-tips').css('display','none');
        },2000)
    } 
})
/** ----------------------------显示叶子颜色结束----------------------------------*/



/** ----------------------------显示浇水开始----------------------------------*/

function showing(num){
    for(var i = 0;i < $('ul.level-water li').length;i++){
        if(i <= num){
            $('ul.level-water li').eq(i).addClass('current').children().removeClass('icon-shape6').addClass('icon-shuiliangjibie6');
        }else{
           $('ul.level-water li').eq(i).removeClass('current').children().removeClass('icon-shuiliangjibie6').addClass('icon-shape6');
        }
    }

}


var waterArr = [
    '少',
    '较少',
    '正常',
    '较多',
    '多'
]
nums = -1;
$('ul.level-water li').on({
    click:function() {
        console.log($(this).index());
        var indexs = $(this).index();
        var left =  $(this).index()*$(this).width();
        $('#water-tips').css('display','block');
        $('#water-tips').css('left',left).text(waterArr[indexs]);
        nums =  $(this).index();
        showing(nums);
        setTimeout(function() {
            $('#water-tips').css('display','none');
        },2000)
    } 
})

/** ----------------------------显示浇水结束----------------------------------*/



/** ----------------------------显示施肥开始----------------------------------*/
function show(num){
    for(var i = 0;i < $('ul.level-fer li').length;i++){
        if(i <= num){
            $('ul.level-fer li').eq(i).addClass('current').children().removeClass('icon-icon-test').addClass('icon-shandian');
        }else{
           $('ul.level-fer li').eq(i).removeClass('current').children().removeClass('icon-shandian').addClass('icon-icon-test');
        }
    }

}


var waterArr = [
    '少',
    '较少',
    '正常',
    '较多',
    '多'
]
number = -1;
$('ul.level-fer li').on({
    click:function() {
        console.log($(this).index());
        var indexs = $(this).index();
        var left =  $(this).index()*$(this).width();
        $('#fer-tips').css('display','block');
        $('#fer-tips').css('left',left).text(waterArr[indexs]);
        number =  $(this).index();
        show(number);
        setTimeout(function() {
            $('#fer-tips').css('display','none');
        },2000)
    } 
})

/** ----------------------------显示施肥结束----------------------------------*/



//是否松土写一个开关  可以去网上找代码或者用插件 vue中有
var turn = document.querySelector('.turn');
var turnWrap = document.querySelector('.turn-wrap');
turn.onclick = function() {
    if(turn.classList.contains('fr')) {
        turn.classList.remove('fr');
        turn.classList.add('fl');
        turn.style.backgroundColor = '#dbdbdb';
        turnWrap.style.backgroundColor = '#eee';
    }else {
        turn.classList.add('fr');
        turn.style.backgroundColor = '#88cb84';
        turnWrap.style.backgroundColor = '#ccffcc';
    }
}




