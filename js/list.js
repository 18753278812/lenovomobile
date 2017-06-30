require.config({
	paths: {
		"style": "style.min",
		"jquery": "jquery-1.11.1",
		"cookie" : "jquery.cookie"
	}
})

require(["jquery"], function($){
	require(["cookie","style"], function(cookie,style){
		$(function(){
			style.language();
			style.Login();
			style.randomImg();
			style.gotoTop();
			style.proList();
			style.cartMount();
			style.List();
		})	
	})
})