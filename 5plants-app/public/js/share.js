var str="";
    $(function(){
    		
 			$(".comment-btn").bind("click",function(){
 				$(".commenting").show();
 			})
 			
 			$.getJSON("http://lininn.cn/study/article/",function(data){
 				var lenth=data.length;
 				
   				for(var i=0;i<lenth;i++){
   					renderTable(data[i]);
					
   				}
   				$(".container").append(str);
   				str="";
 			});
    });
 			function addStart(id,obj){
 			 var num=parseInt($(obj).siblings(".startnum").html())+1;
 				$(obj).siblings(".startnum").html(num);
 			 $.get("http://lininn.cn/study/addstart/",{"id":id,"start":num},function(data){
 			
 			});

 				
 			}
 			function Tshow(obj){
 			
 				$(obj).parent(".comment").siblings(".commenting").css("display","block");
 			}
 			function renderTable(obj){
			 var arr=obj[0];
			//  console.log(arr)
 			// console.log(obj.length);
 				if(obj.length>1){
 					var mon="";
 					for(var j=1;j<(obj.length);j++){
 						mon+="<div><span>"+obj[j].postuser+"：</span>"+obj[j].contents+"</div>";
 					}
 					
 					str+='<div class="card"> \
                <div class="username">'+arr.user1+'</div> \
                <p class="user-content">'+arr.art+'</p> \
                <div class="user-pic"> \
                    <img src="'+arr.pic+'" alt="">   \
                    <div class="clearfloat"></div>   \
                </div>  \
                <p class="time">'+arr.shijian+'</p>  \
                <div class="comment">  \
                    <button class="comment-btn" onclick="Tshow(this)">评论</button>  \
                    <button class="like"> \
                        <i class="iconfont icon-xing" onclick="addStart('+arr.id+',this)"></i><span class="startnum">'+arr.start+'</span> \
                    </button>   \
                </div>    \
                <div class="comment-show">'+mon+' </div>   \
                <div class="commenting" style="display:none;">   \
                    <input type="text" class="comments">     \
                    <button class="btn-sure" onclick="comments('+arr.id+',this)">确定</button>  \
                </div>\
            </div>'
 				}else{
 				str+='<div class="card"> \
                <div class="username">'+arr.user1+'</div> \
                <p class="user-content">'+arr.art+'</p> \
                <div class="user-pic"> \
                    <img src="'+arr.pic+'" alt="">   \
                    <div class="clearfloat"></div>   \
                </div>  \
                <p class="time">'+arr.shijian+'</p>  \
                <div class="comment">  \
                    <button class="comment-btn" onclick="Tshow(this)">评论</button>  \
                    <button class="like"> \
                        <i class="iconfont icon-xing" onclick="addStart('+arr.id+',this)"></i><span class="startnum">'+arr.start+'</span> \
                    </button>   \
                </div>    \
                <div class="comment-show"></div>   \
                <div class="commenting" style="display:none;">   \
                    <input type="text" class="comments">     \
                    <button class="btn-sure" onclick="comments('+arr.id+',this)">确定</button>  \
                </div>\
            </div>'
           }
 			}
 			
 			
 	/*确认提交评论*/
 	
 	function comments(theId,obj){
 	
 		var comments=$(obj).siblings(".comments").val();
 		$(obj).parent().siblings('.comment-show').html($(obj).parent().siblings('.comment-show').html()+"<div><span>我：</span>"+comments+"</div>");
 		$(obj).parent(".commenting").hide();
 		$.ajax({
 			type:"get",
 			url:"http://lininn.cn/study/comments/",
 			data:{"user1":"我","id":theId,"comments":comments},
 			success:function(data){
 				console.log(data);
 			}
 		});
 	}