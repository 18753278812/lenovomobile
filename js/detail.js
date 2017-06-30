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
			style.language();
			style.Login();
			style.randomImg();
			style.cartCookie();
			style.cartMount();
			style.gotoTop();
			style.detail();
			style.imgContent();
			style.headerScroll();
			style.norms();
			style.List();
		})	
	})
})