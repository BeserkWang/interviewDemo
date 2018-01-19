//轮播图
$(function () {
	var x = 0;
	var oldLength = 0;
	var lengthTime = 0;
	var num = 0; //移几次
	var imgRight = false;
	var imgLeft = true;
	var imgTime;
	startTime();

	function startTime() {
		imgTime = setInterval(function () {
			if (imgLeft) {
				num += 1;
				lengthTime += 10;
				$('.slider-img img').css({
					"transform": "translateX(" + '-' + lengthTime + "rem) scale(0.8)",
					'transition': '0.5s'
				});
				$('.slider-img img').eq(num).css({
					"transform": "translateX(" + '-' + lengthTime + "rem) scale(1)",
					'transition': '0.5s'
				});
				if (num > 1) {
					imgRight = true;
					imgLeft = false;
				}

			} else if (imgRight) {
				num -= 1;
				lengthTime -= 10;
				$('.slider-img img').css({
					"transform": "translateX(" + '-' + lengthTime + "rem) scale(0.8)",
					'transition': '0.5s'
				});
				$('.slider-img img').eq(num).css({
					"transform": "translateX(" + '-' + lengthTime + "rem) scale(1)",
					'transition': '0.5s'
				});
				if (num <= 0) {
					imgRight = false;
					imgLeft = true;
				}
			}
		}, 2000);
	}
})

//遮罩层事件部分
var add = document.getElementsByClassName('icon-iconjia')[0];
var mask = document.getElementById('mask');
var firstTab = document.getElementsByClassName('firstTab')[0];
var firstTabI = document.getElementsByClassName('icon-bangbangtang')[0];
console.log(firstTabI);
add.onclick = function () {
	mask.style.display = 'block';
	mask.classList.add('animated');
	$('#mask').addClass('fadeInUp')
	firstTab.classList.remove('active');
	firstTabI.classList.remove('active');
	add.classList.add('active');
}

//遮罩层的关闭按钮事件
$('.Indexclose').click(function () {
	$('#mask').removeClass('fadeInUp')
	$('#mask').css('display', 'none');
	$('.icon-iconjia').removeClass('active');
	$('.icon-bangbangtang').addClass('active');
	$('.firstTab').addClass('active');
})

//获取当天的日期
var dates = new Date();
var year = dates.getFullYear();
var month = dates.getMonth() + 1;
var datee = dates.getDate();
var day = dates.getDay();
console.log(day)
var Chday = "";
switch (day) {
	case 1:
		Chday = '星期一';
		break;
	case 2:
		Chday = '星期二';
		break;
	case 3:
		Chday = '星期三';
		break;
	case 4:
		Chday = '星期四';
		break;
	case 5:
		Chday = '星期五';
		break;
	case 6:
		Chday = '星期六';
		break;
	case 0:
		Chday = '星期日';
		break;

}

var oDate = document.querySelector('.dating');
var oDay = document.querySelector('.day');
var oMonth = document.querySelector('.month');
var oYear = document.querySelector('.year');
oDate.innerText = datee;
oDay.innerText = Chday;
oMonth.innerText = month;
oYear.innerText = year;

//获取实时天气
$.ajax({

	type: 'GET',
	url: 'http://restapi.amap.com/v3/weather/weatherInfo?key=19b1955b37ebeb893c4687735e7158ef&city=350200&extensions=all',
	success: function (data, status, xhr) {
		var obj = {};
		//	                console.log(data);
		//	                console.log(data.forecasts[0].city);
		data.forecasts[0].casts.find(function (item) {

			obj.daytemp = item.daytemp;
			obj.dayweather = item.dayweather;
			return obj;
		});

		//	             console.log(obj);
		var district = document.getElementsByClassName('district')[0];
		var tempWord = document.getElementsByClassName('tempWord')[0];
		var temp = document.getElementsByClassName('temp')[0];
		district.innerText = data.forecasts[0].city;
		tempWord.innerText = obj.dayweather;
		temp.innerText = obj.daytemp;
	},

	complete: function (xhr, str) {
		console.log('本次请求完成');
	}
})

