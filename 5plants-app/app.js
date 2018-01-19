var exp = require('express');
var app = exp();
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var db = require('mongoose');

app.use('/', exp.static('./public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.text());

//设置数据库
db.connect('mongodb://localhost/app_data');
var Plant = db.model('user_data', {
	user: String,
	type: Object,

})

//自定义添加数据    
new Plant({
	"user": "18150600199",
	"type": {
		"子宝": {
			"record": [
				[{
					"soil": "false",
					"fer": "",
					"water": "较少",
					"color": "较好",
					"weather": "打雷",
					"date": "2017-11-18",
					'picUrl': 'C:\\fakepath\\6.png'
				}],
				[{
						"date": "2017-11-21",
						"weather": "多云",
						"color": "较好",
						"water": "较少",
						"fer": "较少",
						"soil": "false",
						'picUrl': 'C:\\fakepath\\6.png'
					},
					{
						"date": "2017-11-18",
						"weather": "打雷",
						"color": "很好",
						"water": "较少",
						"fer": "较少",
						"soil": "false",
						'picUrl': 'C:\\fakepath\\6.png'
					},

				],

			]
		},

	},
}).save()

//插入新数据


//new Plant({user:"user1",type:{
//	
//	"菊花":[{time:123,data:{day:'晴'}}],
//	
//	"百合":[{time:123,data:{day:'晴'}}]
//
//}}).save()
//{
//	类1:[{
//		
//			第一次种植的时间:startTime
//			已种植总时间:nowTime
//			记录：record[{
//  				日期：date
//					天气:weather
//				颜色:color
//				浇水:water
//				施肥:fer
//				松土:soil
//			},{},{}]			
//				
//			
//		},
//		第二个:{
//			...
//		},
//		...
//	},
//	类2:{
//		...
//	},
//	....]
//}



//注册部分的随机验证码
var confirmNum = {
	'confirmNum': ''
}
app.get('/register/cofirmNum', (req, res) => {
	var num = 0;
	confirmNum.confirmNum = '';
	for (var i = 0; i < 4; i++) {
		num = Math.floor(Math.random() * 10);
		confirmNum.confirmNum += num;
	}
	console.log(confirmNum.confirmNum);
	setTimeout(function () {
		confirmNum.confirmNum = 0;
		console.log('验证码已失效')
	}, 60000)
	res.status(200).send(JSON.stringify(confirmNum));
})

app.post('/register/user', (req, res) => {
	var data = [];
	// console.log(req.body);
	data.push(req.body);
	fs.exists(`./users/${req.body.phone}.json`, function (exists) {
		if (!exists) {
			fs.writeFile(`./users/${req.body.phone}.json`, JSON.stringify(data), function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('文件写入成功');
				}
			})
		} else {
			console.log('用户名已注册')
			res.json({
				status: 'y',
				data: '用户名已被注册'
			})
		}
	})

})

//登录部分
var loginData; //用户登录的用户名
app.post('/user/login', (req, res) => {
	console.log(req.body);
	fs.readFile(`./users/${req.body.loginNum}.json`, 'utf-8', function (err, datas) {
		if (err) {
			console.log(err);
			res.status(200).send({
				"state": "err"
			});
		} else {
			console.log(JSON.parse(datas)[0])
			var userData = JSON.parse(datas)[0];
			if (req.body.loginNum == userData.phone && req.body.loginPwd == userData.pwd) {
				loginData = req.body.loginNum;
				res.json({
					status: 'y',
					data: '登录成功'

				})
				console.log(loginData);
			}
		}
	})
})

//登录完成后的显示昵称部分
app.post('/user/me/index', (req, res) => {
	fs.readFile('./users/' + loginData + '.json', 'utf-8', function (err, meData) {
		if (err) {
			console.log(err);
			res.status(200).send({
				"state": "err"
			});
		} else {
			console.log(meData);
			res.json({
				status: 'y',
				data: meData,
			})
		}
	})
})

//用户登入，养护页面数据
app.get('/api/v1/data_all/:user', function (req, res) {
	console.log(req.params.user)
	Plant.find({
		user: req.params.user
	}, function (err, data) {
		res.json({
			type: data
		})
	})
})

//用户新增养护
app.post('/api/v1/save_data', function (req, res) {
	console.log(req.body)
	Plant.find({
		user: req.body.user
	}, function (err, data) {
		if (!data.length) {
			new Plant(req.body).save(function (err) {
				if (err) {
					res.json({
						status: 'y',
						logo: 'err-新增失败'
					})
				} else {
					res.json({
						status: 'y',
						logo: 'success-新增成功'
					})
				}
			})
		} else {
			for (var i in req.body.type) {
				if (data[0].type[i]) {
					console.log(req.body.type[i].record)

					data[0].type[i].record.push(req.body.type[i].record[0])
					console.log(data[0].type[i].record)
					Plant.update({
						user: req.body.user
					}, data[0], function (err) {
						if (err) {

							res.json({
								status: 'y',
								logo: 'err-新增失败'
							})
						} else {

							res.json({
								status: 'y',
								logo: 'success-新增成功'
							})
						}
					})



				} else {



					data[0].type[i] = {
						record: req.body.type[i].record
					}
					new Plant(data[0]).save(function (err) {
						if (err) {

							res.json({
								status: 'y',
								logo: 'err-新增失败'
							})
						} else {

							res.json({
								status: 'y',
								logo: 'success-新增成功'
							})
						}
					})

				}

			}
		}

	})

})


//点击数量跳转详情
app.get('/api/v1/type/:id', function (req, res) {

	var id = req.params.id
	Plant.find(function (err, data) {
		if (err) {
			res.json({
				status: 'y',
				logo: 'err'
			})
		} else {
			res.json({
				status: 'y',
				data: data,
				logo: 'success'
			})
		}
	})
})
//记录每天操作
app.post('/api/v1/type_num/jilu', function (req, res) {

	console.log(req.body)

	Plant.find({
		user: req.body.user.user
	}, function (err, data) {

		for (var i in req.body.user.type)

			data[0].type[i].record.forEach(function (item, index) {


				if (index == req.body.num) {
					data[0].type[i].record[index].push(req.body.user.type[i].record[0][0])
				}
			})


		new Plant(data[0]).save(function (err) {
			if (err) {

				res.json({
					status: 'y',
					logo: 'err-新增失败'
				})
			} else {

				res.json({
					status: 'y',
					logo: 'success-新增成功'
				})
			}
		})


	})



})

app.listen(3000, function () {
	console.log('run on 3000...')
})