//初始化页面
function initHtml() {
    // var list = JSON.parse(localStorage.values);
    var list = JSON.parse(localStorage.values);
    var tb = document.getElementById('tb');
    tb.innerHTML = '';
    list.forEach(function(item) {
        tb.innerHTML += `
        <tr>
            <td>${item.title}</td>
            <td>${item.sort}</td>
            <td>${item.content}</td>
            <td><input type="button" value="删除" onclick="deletes()" class="deletes"></td>
        </tr>
    `;

    });
    //每次删除的时候绑定事件都被删除 所以要在初始化的时候再删除一次事件
    deletes();
}
initHtml();

//删除记录
function deletes() { 
    
    var deleList = document.getElementsByClassName('deletes');
    // var tb = document.getElementById('tb');
    var list = JSON.parse(localStorage.values);
       for(var i = 0;i < deleList.length;i++){
        var tb = document.getElementById('tb');
           deleList[i].index = i;
           deleList[i].onclick = function() {
              list.splice(this.index,1);
            
              localStorage.values = JSON.stringify(list);
              
              initHtml();
           }
           
       }
       
}

//查询文章
function doSearch(){
    var searchWord = document.getElementById('aContent').value;
    var list = JSON.parse(localStorage.values);
    tb.innerHTML='';
    list.forEach(function(item) {
        
        if(item.title.indexOf(searchWord) > -1){
          
               console.log(item)
                    tb.innerHTML += `
                    <tr>
                        <td>${item.title}</td>
                        <td>${item.sort}</td>
                        <td>${item.content}</td>
                        <td><input type="button" value="删除" onclick="deletes()" class="deletes"></td>
                    </tr>
                `;
             }
        });
        
    }   







