 
	 var more=document.getElementById('more');
	 document.getElementById('username').innerText=localStorage.getItem('username');
	 more.addEventListener('tap',function() {
	 	location.href='person_info_more.html';
	 });
	 user_name.addEventListener('tap',function(){
	 	location.href='person_info_name.html';
	 });
     mui.plusReady(function(){
        plus.key.addEventListener('backbutton', function() {
		    var mother_page = plus.webview.currentWebview().opener();
			mother_page.reload();
		}, false);
     }); 
	 
