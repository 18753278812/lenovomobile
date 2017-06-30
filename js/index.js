require.config({
	paths: {
		"style": "style.min",
		"jquery": "jquery-1.11.1",
		"jquery.cookie" : "jquery.cookie"
	}
})

require(["jquery"], function($){
	require(["jquery.cookie","style"], function(cookie,style){
		$(function(){
			style.HotProduct();
			style.language();
			style.Login();
			style.randomImg();
			style.cartCookie();
			style.cartMount();
			style.gotoTop();
			style.banner();
			style.Slide();
			style.List();
		})	
	})
})