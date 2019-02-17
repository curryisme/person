    var send = document.getElementById('send');
	var chat_content = document.getElementById('chat_content');
	var returnid = document.getElementById('returnid');
	var tr_friend_id ;
	var refresh_num  = 0;
	var chatObj = {
		refresh_num:0,
		tr_friend_id:0,
		tr_me_id:localStorage.getItem('Myid'),
		tr_friend_img:"",
		flag:false
	}
	mui.plusReady(function(){
		var sData = plus.webview.currentWebview(); 
		chatObj.tr_friend_id = sData.friendId ;
		chatObj.tr_friend_img =sData.friendImg;
		load(chatObj.tr_me_id,chatObj.tr_friend_id,chatObj.refresh_num,chatObj.tr_friend_img); 		
	    returnid.addEventListener("tap",function(){
		mui.back();
	    });
	
	    send.addEventListener("tap",function(){
		var text_value = document.getElementById('text_value').value;
		if(text_value==""){
			mui.toast('没输入,发送失败！');
			return;
		}
		var html ="";
		var date=getNowFormatDate();
		html += '<div class="fsmsg mui-row">';
		html += '	<div class="mui-col-xs-2"></div>';
		html += '	<div class="mui-col-xs-8 fstext bs-bb">';
		html += '	<b class="fsborder"></b>';
		html += '	<span class="bdFontSize ta-r">'+text_value+'<br/><font style="font-size:14px;color:gray;">'+date+'</font></span>';
		html += '</div>';
		html += '	<div class="mui-col-xs-2 ta-r jkimg">';
		html += '		<img src="../hpic/'+localStorage.getItem('userimg')+'.jpg"  alt="" /> ';
		html += '	</div>';
		html += '</div>';							
		$.ajax({ 
	    async:false, 
		url:'http://47.107.224.220/wx/insert_chat.php',
		type:"GET",
		dataType:"html",
		  ontentType:'utf8',  
		data: {'tr_friend_id':chatObj.tr_friend_id, 'tr_me_id':chatObj.tr_me_id, 'tr_content':document.getElementById('text_value').value+""},
		success: function(data){
			console.log(data);
		},  
		error: function(){
			alert("error");
		}
       });   
        $('#chat_content').prepend(html);
		document.getElementById('text_value').value="";
	})	
	}); 
	
	mui.init({
	    pullRefresh : {
	    container:refreshContainer,
	    up : {
	      height:50,
	      auto:true,
	      contentrefresh : "正在加载...",
	      contentnomore:'',
	      callback :pullfresh_function 
	    }
	    }
    });
    
    function load(tr_me_id,tr_friend_id,tr_refresh,tr_friendimg){ 
    	$.ajax({ 
	    async:false, 
		url:'http://47.107.224.220/wx/chat_index.php',
		type:"GET",
		dataType:"json",
		ontentType:'utf8',  
		data: {'tr_friend_id':tr_me_id, 
				'tr_me_id':tr_friend_id, 
		 	    'tr_refresh':tr_refresh
		      },
		success: function(data){			
			chatObj.flag = true;
            chatObj.refresh_num +=8;
	        for(var num in data){      	
        	if(data[num]['tr_me_id']==localStorage.getItem('Myid')){    
        	var html ="";
			var date=getNowFormatDate(); 
			html += '<div class="fsmsg mui-row">';
			html += '	<div class="mui-col-xs-2"></div>';
			html += '	<div class="mui-col-xs-8 fstext bs-bb">';
			html += '	<b class="fsborder"></b>';
			html += '	<span class="bdFontSize ta-r">'+data[num]['tr_content']+'<br/><font style="font-size:14px;color:gray;">'+data[num]['tr_date']+'</font></span>';
			html += '</div>';
			html += '	<div class="mui-col-xs-2 ta-r jkimg">';
			html += '		<img src="../hpic/'+localStorage.getItem('userimg')+'.jpg" alt="" /> ';
			html += '	</div>';
			html += '</div>';
		    $('#chat_content').append(html);
        	}else{
		    var html ="";
        	html += '<div class="jkmsg mui-row">';
			html += '<div class="mui-col-xs-2 jkimg">';
			html += '	<img src="../hpic/'+tr_friendimg+'" id="img_src" class="imgbtn" alt="" />';		
			html += '</div>';
			html += '<div class="mui-col-xs-8 jktext bs-bb">';
			html += '	<b class="jkborder"></b>';			
			html += '	<span class="bdFontSize" >'+data[num]['tr_content']+'<br/><font style="font-size:14px;color:gray;">'+data[num]['tr_date']+'</font></span>';
			html += '</div>';
			html += '<div class="mui-col-xs-2"></div>';
		    html += '</div>	';
		    $('#chat_content').append(html);			   
        	}         	
        }
		},  
		error: function(){
			chatObj.flag = false;
		}
       });  		
       return chatObj.flag;
    }
    
    function pullfresh_function() {
      if(  load(chatObj.tr_me_id,chatObj.tr_friend_id,chatObj.refresh_num,chatObj.tr_friend_img)){
      	this.endPullupToRefresh(false);
      }else{
      	this.endPullupToRefresh(true);
      }
    
      
    }

	/**
	 * 获取当前时间 
	 */ 
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
    } 