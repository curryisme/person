    var searchHeader = document.getElementsByClassName('searchHeader')[0];       
    var touchTime = null;     
    var posY = null;
    var url ='http://47.107.224.220/wx/';
    //var url ='http://localhost:80/wx/';
       
    mui.init({
        pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
	      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
	      height:'50px',//可选,默认50px.下拉刷新控件的高度,
	      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
	      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
	      auto: false,//可选,默认false.首次加载自动上拉刷新一次
	      callback :refresh//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
        }
    });
    
	$.ajax({   
        type : "GET",       
        url: url+'wx_userindex.php',
        data : {
            loginId:localStorage.getItem('Myid')
        },
        dataType: 'json',  
        success : function(data) { 
             		for(var num in data){
					loadNews(data[num]['wx_friendId'],data[num]['wx_friendName'],'新消息',data[num]['tr_img']+'.jpg','晚上7:00');					
	                }   
	                refresh();
        }, 
        error : function(msg) {
            mui.toast('请求失败'); 
        }
    });
    function refresh(){
        $.ajax({ 
        type : "GET",
        url: url+'wx_userindex.php',
        data : {
            newMsg:localStorage.getItem('Myid')
        },
        dataType: 'json', 
        success : function(data) {
        	    for(var num in data){
                var newsMsg = '<span class="Msgout"> <span class="Msgin">'+data[num]['wx_msgNum']+'</span></span>';             	
        	    $('#newmsg'+data[num]['wx_friendId']).html(newsMsg);
        	    }        	  
        },
        error : function(msg) {
            mui.toast('2请求失败'); 
        }
    }); 
      mui('#refreshContainer').pullRefresh().endPulldown(); 
    }
    
    
	//再加入这段代码
	(function($){
	    $(".mui-scroll-wrapper").scroll({
	        //bounce: false,//滚动条是否有弹力默认是true
	        //indicators: false, //是否显示滚动条,默认是true
	    }); 
	})(mui);		
				      	   	   		
	function loadNews(friendId,fiendName,msg,hpic,time) {				
		var news = document.getElementById('news');	
		var li = document.createElement('li');
		var picUrl = "./hpic/";
		var picHed = picUrl + hpic;
		li.setAttribute('class','mui-table-view-cell mui-media');		
		li.setAttribute('friendName',fiendName);
		li.setAttribute('friendId',friendId);
		li.setAttribute('friendImg',hpic)
        li.innerHTML = '<a href="javascript:;"><img class="mui-media-object mui-pull-left" src="../' + picHed + '"><div class="mui-media-body friends">' + fiendName + '<h6 style="float: right;">'
        + time + '</h6></div><div id="msg"><h5>' + msg + '<h5></div><div class="newmsg" id="newmsg'+friendId+'"></div></div></a>';
		news.appendChild(li);		 
		li.addEventListener('tap',openChat);
	}
	
	function openChat(e) {
	    $('#newmsg'+$(this).attr('friendId')).html(''); 
	    $.ajax({ 
		    async:false, 
			url:url+'wx_userindex.php',
			type:"GET", 
			dataType:"html",
			ontentType:'utf8',   
			data: {
				  myId:localStorage.getItem('Myid'),
				  friendId:$(this).attr('friendId')
				  },
			success: function(data){	
				    $('#newmsg'+$(this).attr('friendId')).html('');					
			}, 
			error: function(){
				mui.toast("error");
			} 
		});
		mui.openWindow({		  	
		    url: 'news.html', 	    
    	    id:'news.html',	    
		    extras:{
					friendName:$(this).attr('friendName'),
					friendId:$(this).attr('friendId'),
					friendImg:$(this).attr('friendImg')
					},		    
		    createNew:false	
        });
	}
	
    function seach_img(btn_name,js_name){
    	if(btn_name==js_name)
    	{
    		return true;
    	     console.log(js_name);
    	}
    }
	