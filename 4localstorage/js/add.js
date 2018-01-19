
//获取数据
var obj = {};
function getData(){
    obj.title = document.getElementById('title').value.trim();
    obj.sort = document.getElementById('sort').value.trim();
    obj.content = document.getElementById('content').value.trim();

    return obj;

}

//保存数据

function saveData(){
    getData();
    var arr = [];
    if(localStorage.values){
       arr = JSON.parse(localStorage.values);
    }
   arr.push(obj);
   localStorage.values = JSON.stringify(arr);
   console.log(localStorage.values);
   location.href = 'index.html';
}