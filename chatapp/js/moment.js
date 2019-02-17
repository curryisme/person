        mui('#sheet1').popover('toggle');
     	
     	var gallaryBtn = document.getElementById('gallary');
     	
     	var openSheetBtn = document.getElementById('openSheet');
     	
     	var openCamera = document.getElementById('openCamera');
			mui.init({
			  gestureConfig:{
			   tap: true, //默认为true
			   doubletap: true, //默认为false
			   longtap: true, //默认为false
			   swipe: true, //默认为true
			   drag: true, //默认为true
			   hold:false,//默认为false，不监听
			   release:false//默认为false，不监听
			  }
			});
     	
        mui.ajax('../moments.json',{
     	
				dataType:'json',
				type:'get',
				success:function(data){
					 
					var allInfo = JSON.parse(localStorage.getItem('$allInfo') || '[]');
							            	
		            for(var i=allInfo.length-1;i>=0;i--)
		            {
		            var sendinfonew = allInfo[i];
		            
		            if(sendinfonew.imgpath==''){
		            	
		            	var time=getTime_Diff(sendinfonew.time);
		            	
		            	var div = document.createElement('div');
				
						div.setAttribute('class','mui-card-header mui-card-media');
						
						div.innerHTML = '<img class="hpic" src="./hpic/me.jpg" />';
						
						div.innerHTML += '<div class="msgBox mui-media-body"><p>'+sendinfonew.sender+'</p><p>'+sendinfonew.content+'</p><h6 style="float: right;margin-right:10px;font-size:14px"><i class="fa fa-commenting-o" aria-hidden="true"></i><h6>'+time+'</h6>'
						
						document.body.appendChild(div);
		            }
		            
		            else{
		            	
		            	var time=getTime_Diff(sendinfonew.time);
		            	
	            	    var div = document.createElement('div');
					
					    div.setAttribute('class','mui-card-header mui-card-media');
							
						div.innerHTML = '<img class="hpic" src="./hpic/me.jpg" />';
							
						div.innerHTML += '<div class="msgBox mui-media-body"><p>'+sendinfonew.sender+'</p><p>'+sendinfonew.content+'</p><img src="'+sendinfonew.imgpath+'" alt="" /><h6>'+time+'<i style="float: right;margin-right:10px;font-size:14px" class="fa fa-commenting-o" aria-hidden="true"></i>'+ '</h6>'
							
						document.body.appendChild(div);
		            }
					
		            }
		             		    
		   
					mui.each(data,function(index,item){
						
					loadShare(item.name,item.msg,item.hpic,item.time,item.mpic);
					
					});
				}
		});
		
		function getTime_Diff(date1){
		date1 = new Date(date1);
		var date2 = new Date()		;
		var s1 = date1.getTime(),s2 = date2.getTime();
		var total = (s2 - s1)/1000;		 
		var day = parseInt(total / (24*60*60));//计算整数天数
		var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
		var hour = parseInt(afterDay/(60*60));//计算整数小时数
		var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
		var min = parseInt(afterHour/60);//计算整数分
//		document.write([day,hour,min].join(':'))   
        if(day>0){
        	time=day+'天前';
        }else if(hour>0){
        	time=hour+'小时前';
        }else if(min>0){
        	time=min+'分钟前';
        }else{
        	time='1分钟前';
        }
         return time;
		}
		
		function loadShare(name,msg,hpic,time,mpic){		
			if(mpic == null){
				
				time=getTime_Diff(time);
				
				var div = document.createElement('div');
				
				div.setAttribute('class','mui-card-header mui-card-media');
				
				div.innerHTML = '<img class="hpic" src="../hpic/'+hpic+'" />';
				
				div.innerHTML += '<div class="msgBox mui-media-body"><p>'+name+'</p><p>'+msg+'</p><h6 style="float: right;margin-right:10px;font-size:14px"><i class="fa fa-commenting-o" aria-hidden="true"></i><h6>'+time+'</h6>'
				
				document.body.appendChild(div);
			}else{
				
				time=getTime_Diff(time);
				
				var div = document.createElement('div');
				
				div.setAttribute('class','mui-card-header mui-card-media');
				
				div.innerHTML = '<img class="hpic" src="../hpic/'+hpic+'" />';
				
				div.innerHTML += '<div class="msgBox mui-media-body"><p>'+name+'</p><p>'+msg+'</p><img src="../mentPic/'+mpic+'" alt="" /><h6>'+time+'<i style="float: right;margin-right:10px;font-size:14px" class="fa fa-commenting-o" aria-hidden="true"></i>'+ '</h6>'
				
				document.body.appendChild(div);
			}
		}
		
		
		//Choose from Album
	    gallaryBtn.addEventListener('tap',function() {
		plus.gallery.pick(
			
			function(path) {
				
			var imgs = path;	
			
			mui.openWindow({
		  	
		    url: 'sureSend.html', 
		    
		    id:'sureSend.html',
		    
		    createNew:false,
		    
		    extras:{
				path:imgs
				  }
		   });
			
			},
            
            //error
			function(e) {
              mui.toast('Failed to get album') 
			},

			{
				filter:"image",
				multiple:true 
			}
		);
		
	})
	    
	    openCamera.addEventListener('tap',function() {		
		var cm = plus.camera.getCamera(1);//获取主摄像头
		
		cm.captureImage(
			function(path) {	
				 plus.io.resolveLocalFileSystemURL(path, function(entry) { 
				 	
				 var imgs=entry.toLocalURL();
				 
				mui.openWindow({
			  	
			    url: 'sureSend.html', 
			    
			    id:'sureSend.html',
			    
			    createNew:false,
			    
			    extras:{
					path:imgs
					  }		
			  });
				 });
			
			}
		);
	});
	
        window.addEventListener('refresh', function(e) {
		
		location.reload();
	});
	
	//长按发表文字
     openSheetBtn.addEventListener("longtap",function(){
     mui.openWindow({    	
     	
     	    url: 'sureSend.html',		  
		    id:'sureSend.html',
		    createNew:false,
	        extras:{
			        path:''
			       }
     });
});

      