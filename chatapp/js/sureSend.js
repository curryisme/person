var imgLst = document.getElementsByClassName('imgLst')[0];
			
			var send = document.getElementById('send');
			
			var msg = document.getElementById('msg');
			
			send.addEventListener('touchend',shareEvent);
			
			var imglg = null;
			
			mui.plusReady(function() {
				
				 //1.获取当前窗体  
				var cw = plus.webview.currentWebview();
				
                var path = cw.path;
                
                var img = '';            
                
                if(path!=''&&(typeof path )== 'object')
			    for(var i in path.files){
			    	
				img += '<img src="'+path.files[i]+'"alt="">';
				
				imgLst.innerHTML = img;
			    imglg = path.files.length;
			    
			    }if((typeof path )=='string'&& path.length>0){
			    			    
			    img += '<img src="'+path+'"alt="">';
				
				imgLst.innerHTML = img;
			    
			    imglg = 1;
			    }
			    				
			});
			
			function shareEvent() {
				if(imglg>=2){ 				
					 mui.toast('Do not support multi share！',{ duration:'long', type:'div' });
					 
				}else{
					var cw = plus.webview.currentWebview();
					var myDate = new Date();//获取系统当前时间
	                var path = cw.path;
	                var sendInfo = "";
	                if(path=='')
	                {
	                	sendInfo = {
	                		imgpath:'',
							sender: localStorage.getItem('username'),
							time: new Date(),
							content:msg.value
						};
	                }
	                
	                else if((typeof path )=='string'&& path.length>0) {
	                	console.log('sss');
	                    sendInfo = {
							imgpath: path,
							sender: localStorage.getItem('username'),
							time: new Date(),
							content:msg.value
						};
					}
	                
	                else{
	                	sendInfo = {
							imgpath: path.files,
							sender: localStorage.getItem('username'),
							time: new Date() ,
							content:msg.value
						};
	                }
					
					var allInfo = JSON.parse(localStorage.getItem('$allInfo') || '[]');
					allInfo.push(sendInfo);
	                localStorage.setItem('$allInfo',JSON.stringify(allInfo));	          
	                
	                var list = plus.webview.currentWebview().opener();
					//触发列表界面的自定义事件（refresh）,从而进行数据刷新
					mui.fire(list, 'refresh');              
				}
				
				
			}
			
        