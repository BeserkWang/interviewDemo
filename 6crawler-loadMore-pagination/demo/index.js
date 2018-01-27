var express = require('express'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    Crawler = require('crawler'),
    app = express();

app.use(express.static('./public'));



var c = new Crawler({
    maxConnections:10,
    callback: function(err,res,done) {
        if(err) {
            console.log(err);
        }else {
            var $ = res.$;
            var arr = [];
            var links = $('.product_ul [class^=line]');
            links.each(function(ele) {
                var obj = {};
                obj.img = $(this).find('a img').attr('src');
                obj.title = $(this).find('.name a ').text();
                obj.price = $(this).find('.price .rob').text();
                obj.author = $(this).find('.author').text();
                arr.push(obj);
            })
            fs.writeFileSync('./book.json',JSON.stringify(arr),function(err) {
               if(err) {
                   console.log(err);
               }else {
                   console.log('数据保存成功');
               }
            });
        }
        done();
    }
});
c.queue('http://book.dangdang.com/01.03.htm?ref=book-01-A');



app.post('/bookdetail',function(req,res) {
    var book;
    fs.readFile('./book.json','utf-8',function(err,data) {
        if(err) {
            console.log(err);
        }else {
            // console.log(1)
            book = data;
            // console.log(book);
            res.status(200).send(book);
        }
    })
    
})




app.listen(3030,() => {
    console.log("run on 3000 ...");
});
