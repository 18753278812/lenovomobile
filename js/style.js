//下拉菜单
define(function(){
	function List(){
		$("#nav").find("a").slice(0,4).hover(function(){
			var index = $(this).index();
			// console.log(index);
			$.ajax({
				url : "data/list-style.json",
				type: "GET",
				success : function(data){
					// console.log(data);
					var arr = data["list" + index];
					// console.log(arr);
					$("#nav-list").html("");
					for(var i = 0; i < arr.length; i++){
						$('<div class="goods"><a href="' + arr[i].src + '" ><img src = ' + arr[i].img + ' /><h4>' + arr[i].title + '</h4><div class="price-box"><span>￥' + arr[i].price + '起</span>  <del>' + arr[i].old_price + '</del></div></div>').appendTo("#nav-list");
						$(".goods").animate({left: 0},150 * i + 150).animate({opacity : 1},100);
					}
				}
			});
			//下拉菜单滑动
			$("#nav-list").hover(function(){
				$("#nav-list").stop().animate({top:130},300);
			},function(){
				$("#nav-list").stop().animate({top:-90},300);
			});
			//下拉菜单
			$("#nav-list").stop().animate({top:130},300);
		},function(){
			//回收菜单
			$("#nav-list").stop().animate({top:-90},300);
		})
	}
	//返回顶部
	function gotoTop(){
		$(".fixed-layer").find("div").click(function(){
			$("body,html").animate({scrollTop : 0},500);
			console.log(1);
		})
	}
	//轮播图
	function Banner(){
		this.count = 0;
		this.img = $(".imgs").find("li");
		this.btn = $(".btnBox").find("button");
		this.pager = $(".pager").find("a");
		var _this = this;
		//点击按钮停止轮播
		this.btn.click(function(){
			clearInterval(_this.timer);
			clearTimeout(_this.timer1);
			_this.timer1 = setTimeout(function(){
				_this.timer = setInterval(function(){
					_this.count++;
					_this.roll();		
				},3000);
			},3000);// 五秒后启动轮播
		})
		this.btn.eq(0).click(function(){
			_this.count--;
			if(_this.count < 0){
				_this.count = 4;
			}
			_this.roll();
		});
		this.btn.eq(1).click(function(){
			_this.count++;
			if(_this.count > 4){
				_this.count = 0;
			}
			_this.roll(_this.count);
		});
		this.pager.click(function(){
			_this.count = $(this).index();
			_this.roll();
			clearInterval(_this.timer);
			clearTimeout(_this.timer1);
			_this.timer1 = setTimeout(function(){
				_this.timer = setInterval(function(){
					_this.count++;
					_this.roll();		
				},3000);
			},5000);// 五秒后启动轮播
		});
		this.timer = setInterval(function(){
			_this.count++;
			_this.roll();
		},3000);
	}
	Banner.prototype.roll = function(count){
		if(this.count == 5){
			this.count = 0;
		}
		this.pager.attr("class","");
		this.pager.eq(this.count).attr("class","active");
		this.img.css("top",-468 * this.count + "px").css("opacity","0.6");
		this.img.animate({opacity : 1},1000);
	}

	//侧边栏
	function Slide(){
		$(".content").find(".list").hover(function(){
			$(".goodsList").css("display","block");
			$(".slide-list").find("li").hover(function(){
				var index = $(this).index();
				$.ajax({
					url : "data/slide-json.json",
					type : "get",
					success : function(data){
						// console.log(data);
						var arr = data["list" + index];
						$(".goodsList").html("");
						for(var i = 0; i < arr.length; i++){
							$('<li class="lis"><a href="' + arr[i].src + '"><img src =' + arr[i].img + ' /><span>' + arr[i].title + '</span></a></li>').appendTo(".goodsList");
							$(".lis").animate({top: 0},150 * i).animate({opacity : 1},100);
						}
						
					}
				})
			},function(){
				$(".lis").stop(true);
			})
		},function(){
			$(".goodsList").css("display","none");
		})
	}

	//数据加载
	function HotProduct(){
		$.ajax({
			url : "data/mian.json",
			type : "get",
			success : function(data){
				// console.log(data);
				var arr = data.hot;
				for(var i = 0; i < arr.length; i++){
					$('<li><a href = ' + arr[i].src + ' ><div class= "imgBox"><img src = ' + arr[i].img + ' /></div><span class = "icon" style = "background : ' + arr[i].icon + '"></span><h4>' + arr[i].title + '</h4><p>' + arr[i].desc + '</p><div class="price-box"><span>' + arr[i].price + '</span><del>' + arr[i].old_price + '</del></div></a></li>').appendTo(".hot-product");
				}
				var arr = data.phone;
				var arr2 = data.hardware;
				var arr3 = data.part;
				for(var i = 0; i < arr.length; i++){
					$('<li><a href = ' + arr[i].src + ' ><div class= "imgBox"><img src = ' + arr[i].img + ' /></div><span class = "icon" style = "background : ' + arr[i].icon + '"></span><h4>' + arr[i].title + '</h4><p>' + arr[i].desc + '</p><div class="price-box"><span>' + arr[i].price + '</span><del>' + arr[i].old_price + '</del></div></a></li>').appendTo(".phone-product");
					$('<li><a href = ' + arr2[i].src + ' ><div class= "imgBox"><img src = ' + arr2[i].img + ' /></div><span class = "icon" style = "background : ' + arr2[i].icon + '"></span><h4>' + arr2[i].title + '</h4><p>' + arr2[i].desc + '</p><div class="price-box"><span>' + arr2[i].price + '</span><del>' + arr2[i].old_price + '</del></div></a></li>').appendTo(".hardware-product");
					$('<li><a href = ' + arr3[i].src + ' ><div class= "imgBox"><img src = ' + arr3[i].img + ' /></div><span class = "icon" style = "background : ' + arr3[i].icon + '"></span><h4>' + arr3[i].title + '</h4><p>' + arr3[i].desc + '</p><div class="price-box"><span>' + arr3[i].price + '</span><del>' + arr2[i].old_price + '</del></div></a></li>').appendTo(".part-product");	
				}
				bigImg();
			}
		});
	}
	function bigImg(){
		$(".main").find("img").hover(function(){
			$(this).stop().animate({width : 184,height : 184,top : 0, left : 0}, 50);
		},function(){
			$(this).stop().animate({width : 180,height : 180,top : 2, left : 2}, 50);
		})
	}
	//选择语言
	function language(){
		$(".language").hover(function(){
			// console.log($(".language").find("a"));
			$(".language").find("a").eq(1).css("display","block");
		},function(){
			$(".language").find("a").eq(1).css("display","none");
		})
	}

	//登录
	var login = (function(){
		var loginBox = null;
		var psdLogin = null;
		var mesLogin = null;
		var creatDiv = function(){
			if(!loginBox){
				loginBox = $('<div class="login"><div class="title"><h3>登录联想账号<a></a></h3></div><div class="loginForm"><div class="way"><a id="wayActive">密码登录</a><a>短信登录</a></div><div class="loginBox"></div></div></div>');
				psdLogin = $('<div class=".psdLogin"><div class="username"><label></label><span></span><input type="text" placeholder="邮箱或手机号" /><i></i></div><div class="password"><label></label><span></span><input type="password" placeholder="密码" /><i></i></div><div class="extras"><span><input type="checkbox" id="re"/><label for="re">自动登录</label></span><span><a href="" >忘记密码</a>|<a>立即注册</a></span></div><div class="loginBtn"><div class="errorMessage"></div><button>登录</button></div><div class="thirdLogin"><a>QQ</a><a>微博</a></div></div>');
				mesLogin = $('<div class=".mesLogin"><div class="phone"><label></label><span></span><input type="text" placeholder="手机号" /><i></i></div><div class="code"><label></label><span></span><input type="text" placeholder="验证码" /><i></i></div><div class="getCodeImg"></div><div class="mesCode"><label></label><span></span><input type="text" placeholder="短信验证码" /><i></i></div><div class="getCode"><button>获取验证码</button></div><div class="loginBtn"><div class="errorMessage"></div><button>登录</button></div></div>');
				$("body").append(loginBox);
				psdLogin.appendTo($(".loginBox"));
				$(".way").find("a").click(function(){
					$(".loginBox").html("");
					$(".way").find("a").attr("id","");
					$(this).attr("id","wayActive");
					var index = $(this).index();
					var arr = [psdLogin,mesLogin];
					arr[index].appendTo($(".loginBox"));
					randomImg();
					$(".getCodeImg").click(function(){
						randomImg();
					});
					test();
					$(".extras").find("span").eq(1).find("a").eq(1).click(function(){
						register();
						$(".register").css("display","block");
						$(".login").css("display","none");
						$(".shade").css("display","block");
					});
				});
				test();
				$(".title").find("a").click(function(){
					$(".login").css("display","none");
					$(".shade").css("display","none");
				});
				$(".extras").find("span").eq(1).find("a").eq(1).click(function(){
					register();
					$(".register").css("display","block");
					$(".login").css("display","none");
					$(".shade").css("display","block");
					$(".register").css("position","absolute");
				});
				$(document).scroll(function(){
					/*$(".login").css("top",$(document).scrollTop() + $(window).height() / 2);
					$(".shade").css("top",$(document).scrollTop());*/
					$(".login").css("position","fixed");
					$(".shade").css("top",$(document).scrollTop());
				})
			}
		}
		return creatDiv;
	})();
	//注册
	var register = (function(){
		var registerBox = null;
		var creatDiv = function(){
			if(!registerBox){
				registerBox = $('<div class="register"><div class="title"><h3>注册联想账号<a></a></h3></div><div class="registerForm"><div class="phone"><label></label><span></span><input type="text" placeholder="手机号" /><i></i></div><div class="password"><label></label><span></span><input type="password" placeholder="密码" /><i></i></div><div class="txt"><span>密码长度8~20位，数字、字母、字符至少包含两种</span></div><div class="code"><label></label><span></span><input type="text" placeholder="验证码" /><i></i></div><div class="getCodeImg"></div><div class="mesCode"><label></label><span></span><input type="text" placeholder="短信验证码" /><i></i></div><div class="getCode"><button>获取验证码</button></div><div class="loginBtn"><div class="errorMessage"></div><button>注册</button></div></div>')
				$("body").append(registerBox);
				test();
				randomImg();
				$(".getCodeImg").click(function(){
					randomImg();
				});
				$(".title").find("a").click(function(){
					$(".register").css("display","none");
					$(".shade").css("display","none");
					$(".register").css("position","absolute");
				});
				$(document).scroll(function(){
					$(".register").css("position","fixed");
					$(".shade").css("top",$(document).scrollTop());
				})
			}
		}
		return creatDiv;
	})();
	function Login(){	
		$(".top-login").find("a").eq(1).click(function(){
			login();
			$(".login").css("display","block");
			$(".shade").css("display","block");
		});
		$(".top-login").find("a").eq(0).click(function(){
			register();
			$(".register").css("display","block");
			$(".shade").css("display","block");
		})
	}
	//随机图片验证码
	function randomImg(){
		var index = parseInt(Math.random() * 10);
		$(".getCodeImg").html("");
		$('<img src = "image/code/0' + index + '.jpg" />').appendTo($(".getCodeImg"));	
	}
	function test(){
		console.log($(".username").find("input"));
		$(".username").find("input").blur(function(){
			var tel = $(".username").find("input").val();//获取输入的手机号
	　　　　var yidongreg = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
	　　　　var dianxinreg = /^1[3578][01379]\d{8}$/;
	　　　　var liantongreg = /^1[34578][01256]\d{8}$/;
			var emailreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	　　　　//var reg = /^1[3|4|5|7|8]\d{9}$/;//这一种也可以
	　　　　if (!(yidongreg.test(tel) || dianxinreg.test(tel) || liantongreg.test(tel) || emailreg.test(tel)))
	　　　　{
				$(".errorMessage").html("");
				var txt = $("<span>请输入正确的手机或邮箱</span>");
				txt.appendTo(".errorMessage");
	　　　　}else{
				$(".errorMessage").html("");
			}
		});
		$(".phone").find("input").blur(function(){
			var tel = $(".phone").find("input").val();//获取输入的手机号
			console.log(tel);
			var yidongreg = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
	　　　　var dianxinreg = /^1[3578][01379]\d{8}$/;
	　　　　var liantongreg = /^1[34578][01256]\d{8}$/;
			if (!(yidongreg.test(tel) || dianxinreg.test(tel) || liantongreg.test(tel)))
	　　　　{	
				$(".errorMessage").html("");
				var txt = $("<span>请输入正确的手机号</span>");
				txt.appendTo(".errorMessage");
	　　　　}else{
				$(".errorMessage").html("");
			}
		})
	}
	//加载详情页
	function detail(){
		$.ajax({
			url : "data/data.json",
			type : "get",
			success : function(data){
				var index = $("#pro-id").html();
				var arr = data[index];
				$(".product-summary").find(".pro-title").html(arr[0].title);
				$(".product-discript").find("span").html(arr[0].act);
				$(".product-discript").append(arr[0].desc);
				$(".price").find("span").html(arr[0].price).next().html(arr[0].old_price);
				for(var i = 0; i < arr[1].donation.length; i++){
					$('<li><a href=' + arr[1].src[i] + '><img src=' + arr[1].donation[i] + ' />' + arr[1].desc[i] + '</a></li>').appendTo($(".gifts-list"));
				}
				for(var i = 0; i < arr[1].support.length; i++){
					$('<span><img src=' + arr[1].supSrc[i] + ' />' + arr[1].support[i] + '</span>').appendTo($(".support"));
				}
				for(var i = 0; i < arr[2].version.length; i++){
					$('<li>' + arr[2].version[i] + '</li>').appendTo($(".version"));
				}
				index = 0;
				loadColor(0,arr);
				loadCapacity(0,arr);
				loadImg(0,arr);
				activeSelect();
				$(".version").find("li").click(function(){
					var index = $(this).index();
					loadColor(index,arr);
					loadCapacity(index,arr);
					$(".img-box").html("");
					loadImg(index,arr);
					activeSelect();
					$(this).parent().find("li").attr("class","")
					$(this).attr("class","active");
					loadPrice(arr,index);
					selectClick(arr,index);
					$(".product-total").find("span").html("￥" + (price + price2 + parseInt($(".price").find("span").html().slice(1))));
				})
				selectClick(arr,index);
				$(".product-total").find("span").html("￥" + (price + price2 + parseInt($(".price").find("span").html().slice(1))));

			}
		})
	}
	function activeSelect(){
		$(".color").find("li").eq(0).attr("class","active");
		$(".version").find("li").eq(0).attr("class","active");
		$(".capacity").find("li").eq(0).attr("class","active");
		price = 0;
		price2 = 0;
	}
	function selectClick(arr,index){
		var _index = index;
		$(".color").find("li").click(function(){
			$(this).parent().find("li").attr("class","")
			$(this).attr("class","active");
			var index = $(this).index();
			loadPrice2(arr,index,_index);
		});
		$(".capacity").find("li").click(function(){
			$(this).parent().find("li").attr("class","")
			$(this).attr("class","active");
			var index = $(this).index();
			loadPrice3(arr,index,_index);
		});
	}
	function loadColor(index,arr){
		$(".color").html("")
		for(var i = 0; i < arr[2].color[index].length; i++){
			$('<li>' + arr[2].color[index][i] + '</li>').appendTo($(".color"));
		}
	}
	function loadCapacity(index,arr){
		$(".capacity").html("");
		for(var i = 0; i < arr[2].capacity[index].length; i++){
			$('<li>' + arr[2].capacity[index][i] + '</li>').appendTo($(".capacity"));
		}
	}
	function loadPrice(arr,index){
		var price = arr[2].verSpread[index] + parseInt(arr[0].price.slice(1));
		var old_price = arr[2].verSpread_old[index] + price;		
		$(".price").find("span").html("￥" + price).next().html("￥" + old_price);
		if(arr[2].verSpread_old[index] == 0){
			$(".price").find("span").next().html("");
		}
	}
	//加载图片以及图片放大镜
	function loadImg(index,arr){
		var obj = arr[3][index];
		var index = 0;
		// console.log(!($(".img-box").find("img") == null));
		if(!($(".img-box").find("img") == null)){
			$('<img src = '+ obj.bigImg[index][0] + ' />').appendTo($(".img-box"));
		}
		simgload(obj,index);
		$(".version").find("li").click(function(){
			let index = $(this).index();
			obj =  arr[3][index];
			$(".img-box").find("img").attr("src",obj.bigImg[0][0]);
			simgload(obj,index);
			console.log("123");
		});
		$(".color").find("li").click(function(){
			index = $(this).index();
			$(".img-box").find("img").attr("src",obj.bigImg[index][0]);
			simgload(obj,index);
		});	
		$('<div class="lens"><div class="lens-img"><div class="lens-bigImg"></div></<div></div>').appendTo($(".img-box"));
		$(".img-box").mousemove(function(ev){
			var l = ev.pageX - $(".img-box").offset().left - $(".lens").width() / 2;
			var t = ev.pageY - $(".img-box").offset().top - $(".lens").height() / 2;
			if(l > $(".img-box").width() - $(".lens").width()){
				l = $(".img-box").width() - $(".lens").width();
			}else if (l < 0){
				l = 0;
			}
			if(t > $(".img-box").height() - $(".lens").height()){
				t = $(".img-box").height() - $(".lens").height();
			}else if(t < 0){
				// console.log($(".img-box").offset().top);
				// console.log($(".lens").css("top"));
				t = 0;
			}
			$(".lens").css({left : l,top : t});
			$(".lens-bigImg").css({background:"url(" + $(this).find("img").attr("src") + ") no-repeat",backgroundSize : "contain",left : -l / 86 * 172 + "px",top : -t / 86 * 172 + "px"});
		})
		$(".img-box").hover(function(){
			$(".lens").css("display","block");
		},function(){
			$(".lens").css("display","none");
		})
	}
	function simgload(obj,index){
		$(".simg-box").html("");
		var isfirst = true;
		for(var i = 0; i < obj.smallImg[index].length; i++){
			if(isfirst){
				isfirst = false;
				$('<li class="active"><img src = ' + obj.smallImg[index][i] + ' /></li>').appendTo($(".simg-box"));
				continue;
			}
			$('<li><img src = ' + obj.smallImg[index][i] + ' /></li>').appendTo($(".simg-box"));
		}
		$(".simg-box").find("li").hover(function(){
			var act = $(this).index();
			$(".img-box").find("img").attr("src",obj.bigImg[index][act]);
			$(".simg-box").find("li").attr("class","");
			$(".simg-box").find("li").eq(act).attr("class","active");
		})
	}
	var price = 0;
	var price2 = 0;
	function loadPrice2(arr,index,_index){
		price = parseInt(arr[2].colorSpread[_index][index]);
		// console.log(price);
		$(".product-total").find("span").html("￥" + (price + price2 + parseInt($(".price").find("span").html().slice(1))));

	}
	function loadPrice3(arr,index,_index){
		price2 = parseInt(arr[2].capSpread[_index][index]);
		console.log(price2);
		$('<p>' + arr[0].title + arr[2].version[_index] + arr[2].color[_index][index] + '</p>').appendTo($(".choose-result"));
		$(".product-total").find("span").html("￥" + (price + price2 + parseInt($(".price").find("span").html().slice(1))));
	}
	function cartCookie(){
		$(".product-total").find("a").click(function(){
			var first = $.cookie("cart") == null ? true : false;
			if(first){
				$.cookie("cart",'[{id:' + $("#pro-id").html() + ',verStyle:' + $(".version").find(".active").index() + ',colorStyle:' + $(".color").find(".active").index() + ',capacityStyle:' + $(".capacity").find(".active").index() + ',num : 1,price : ' + $(".product-total").find("span").html().slice(1) + '}]',{expires : 7,path : "/"});
			}else{
				var cookieStr = $.cookie("cart");
				var arr = eval(cookieStr);
				console.log(cookieStr);
				let isYes = false;
				for(var i in arr){
					var decide = arr[i].id == $("#pro-id").html() && arr[i].verStyle == parseInt($(".version").find(".active").index()) && arr[i].colorStyle == parseInt($(".color").find(".active").index()) &&  arr[i].capacityStyle == parseInt($(".capacity").find(".active").index());
					//console.log(arr[i].id == $("#pro-id").html());
					//console.log(arr[i].verStyle == parseInt($(".version").find(".active").index()));
					//console.log(arr[i].colorStyle == parseInt($(".color").find(".active").index()));
					//console.log(arr[i].capacityStyle == parseInt($(".capacity").find(".active").index()));
					if(decide){
						arr[i].num++;
						isYes = true;
					}
				}
				if(!isYes){
					var obj = {id: $("#pro-id").html(),verStyle: $(".version").find(".active").index(),colorStyle:$(".color").find(".active").index(),capacityStyle:$(".capacity").find(".active").index(),num : 1,price : $(".product-total").find("span").html().slice(1)};
					arr.push(obj);
				}
				$.cookie("cart", JSON.stringify(arr), {expires: 7,path : "/"});
			}
		})
		// console.log($.cookie("cart"));
	}
	//购物车cookie
	function cart(){
		if($.cookie("cart") == null || eval($.cookie("cart")).length == 0){
			$(".shopping-cart").css("display","none").prev().css("display","block");
		}
		$.ajax({
			url : "data/data.json",
			type : "get",
			success : function(data){
				// console.log(data);
				// console.log($.cookie("cart"));
				// loadCart(data);
				var arr = eval($.cookie("cart"));
				for(var i = 0; i < arr.length; i++){
					// console.log(arr[i].id);
					// console.log(data[arr[i].id]);
					var title = data[arr[i].id][0].title;
					var price = arr[i].price;
					var num = arr[i].num;
					var subtotal = num * price;
					$('<li><div><div class="img-box"><img src = ' + data[arr[i].id][3][arr[i].verStyle].smallImg[arr[i].colorStyle][0] + ' /></div><a href=' + data[arr[i].id][0].src + '>' + title + "/" + data[arr[i].id][2].color[arr[i].verStyle][arr[i].colorStyle] + "/" + data[arr[i].id][2].version[arr[i].verStyle] + "/" + data[arr[i].id][2].capacity[arr[i].verStyle][arr[i].capacityStyle] + '</a></div><div>'+ "￥" + price + '</div><div><span>-</span><input type = "text" value = ' + num + ' /><span>+</span></div><div>'  +"￥"+ subtotal + '</div><div><button>X</button></div></li>').appendTo($(".shopping-cart-list"));
				}
				checkout();
				//删除按钮
				$(".shopping-cart-list").find("li").find("button").click(function(){
					var index = $(this).parent().parent().index();
					// console.log(index);
					arr.splice(index,1);
					// console.log(arr);
					$.cookie("cart", JSON.stringify(arr), {expires: 7,path : "/"});
					$(".shopping-cart-list").find("li").eq(index).remove();
					checkout();
					if($(".shopping-cart-list").find("li").size() == 0){
						$(".shopping-cart").css("display","none").prev().css("display","block");
					}
				})
				//数量按钮
				//console.log($(".shopping-cart-list").find("li").find("div").eq(2).find("span"));
				$(".shopping-cart-list").find("li").find("div").find("span").click(function(){
					;
					var index = $(this).index();
					var parIndex = $(this).parent().parent().index();
					var num = $(this).parent().find("input").val();
					if(index == 0){
						num--;
						num = num < 1 ? 1 : num; 
						$(this).parent().find("input").val(num);
						$(this).parent().next().html("￥" + num * parseInt($(this).parent().prev().html().slice(1)));
					}else if(index == 2){
						num++;
						$(this).parent().find("input").val(num);
						$(this).parent().next().html("￥" + num * parseInt($(this).parent().prev().html().slice(1)));
					}
					arr[parIndex].num = num;
					$.cookie("cart", JSON.stringify(arr), {expires: 7,path : "/"});
					checkout();
				})
				$(".shopping-cart-list").find("input").keypress(function(ev){
					var val = ev.which;
					var value = $(this).val();
					$(this).val(value.replace(/[^0-9]/g,""));
				
					$(".shopping-cart-list").find("input").keyup(function(ev){
						var val = ev.which;
						var value = $(this).val();
						if(!(val >= 48 && val <= 57)){
							$(this).val(value.replace(/[^0-9]/g,""));
						}
					})
				})
				$(".shopping-cart-list").find("input").blur(function(){
					var num = $(this).val();
					var parIndex = $(this).parent().parent().index();
					$(this).parent().next().html("￥" + num * parseInt($(this).parent().prev().html().slice(1)));
					arr[parIndex].num = num;
					$.cookie("cart", JSON.stringify(arr), {expires: 7,path : "/"});
					checkout();
				})
			}
		})
	}
	//结账
	function checkout(){
		let arr = $(".shopping-cart-list").find("li");
		var count = 0;
		for(var i = 0; i < arr.length; i++){
			count += parseInt(arr.eq(i).find("div").eq(4).html().slice(1));
			// console.log(arr.eq(i).find("div").eq(4).html());
		}
		$(".checkout").find("em").html("￥" + count);
	}

	//列表页
	function proList(){
		$.ajax({
			url: "data/mian.json",
			type: "get",
			success: function(data){
				// console.log(data);
				for(var attr in data){
					var arr = data[attr];
					for(var i = 0; i < arr.length; i++){
						// console.log(arr[i]);
						$('<li><a href=' + arr[i].src + '><div class="imgBox"><img src=' + arr[i].img + ' /></div><h4>' + arr[i].title + '</h4><span>' + arr[i].desc +'</span><p>' + arr[i].price + '</p></li>').appendTo($(".list-warp"));
					}
				}
				$(".product-sort").find("a").click(function(){
					var arr = ["phone","hardware","part","hot","","hardware",""];
					var index = $(this).index() - 1;
					$(this).parent().find("a").attr("class","");
					$(this).attr("class","icur");
					arr = data[arr[index]];
					console.log(data);
					$(".list-warp").html("");
					if(arr != undefined){
						for(var i = 0; i < arr.length; i ++){
							$('<li><a href=' + arr[i].src + '><div class="imgBox"><img src=' + arr[i].img + ' /></div><h4>' + arr[i].title + '</h4><span>' + arr[i].desc +'</span><p>' + arr[i].price + '</p></li>').appendTo($(".list-warp"));
						}
					}else{
						$('<div class="hint">该分类下还没有商品，您可以看看其他分类</div>').appendTo($(".list-warp"));
					}
				
					$(".list-warp").find("li").find("img").hover(function(){
						$(this).css({width: 184,height : 184,left : -2,top : -2});
						$(this).parent().parent().parent().css("boxShadow","3px 3px 14px 5px rgba(0, 0, 0, 0.1)");
					},function(){
						$(this).css({width: 180,height : 180,left : 0,top : 0});
						$(this).parent().parent().parent().css("boxShadow","");
					})
				})
				$(".list-warp").find("li").find("img").hover(function(){
					$(this).css({width: 184,height : 184,left : -2,top : -2});
					$(this).parent().parent().parent().css("boxShadow","3px 3px 14px 5px rgba(0, 0, 0, 0.1)");
				},function(){
					$(this).css({width: 180,height : 180,left : 0,top : 0});
					$(this).parent().parent().parent().css("boxShadow","");
				})
			}
		})
	}
	//购物车数量
	function cartMount(){
		if($.cookie("cart") == null){
			return;
		}
		var arr = eval($.cookie("cart"));
		var num = 0;
		for(var i = 0; i < arr.length; i++){
			num += arr[i].num;
		}
		$('<span>' + num + '</span>').appendTo($(".row"));
	}
	function imgContent(){
		// console.log(1);
		for(var i = 0; i < 18; i++){
			if(i < 10){
				var count = "0" + i;
			}
			else{
				count = i;
			}
			$('<img src = "image/detail/' + count + '.jpg" />').appendTo($(".img-content"));
		}
		$(".img-header").find("div").eq(0).find("span").eq(0).click(function(){
			$(".display").css("display","none");
			$(".img-content").css("display","block");
			$(this).parent().find("span").css("color","#121212");
			$(this).css("color","#10bad1");
		})
	}

	function headerScroll(){
		$(document).scroll(function(){
			if($(document).scrollTop() >= $(".product-introduce").find(".img-header").offset().top){
				$(".product-introduce").find(".img-header").css("position","fixed").css({"width":$(window).width(),left : 0,background: "rgba(255,255,255,0.9)"});
				$(".product-total").find("a").css({position : "fixed",right : $(window).width() - $(".product-total").offset().left - $(".product-total").width() - 30 + "px",top : "8px"});
				console.log($(window).width() - $(".product-total").offset().left - $(".product-total").width() - 30 + "px")
			}
			if($(document).scrollTop() <= $(".img-content").offset().top){
				$(".product-introduce").find(".img-header").css("position","static").css({"width":"1200px",background: "rgba(255,255,255,1)"});
				$(".product-total").find("a").css({position : "absolute",right: 0,top: 0})
			}
		})
	}

	function norms(){
		$(".img-header").find("div").eq(0).find("span").eq(1).click(function(){
			$(this).parent().find("span").css("color","#121212");
			$(this).css("color","#10bad1");
			if($(".norms").find("*").length == 0){
				$.ajax({
					url : "data/data.json",
					type : "get",
					success : function(data){
						
						$(".display").css("display","none");
						$(".norms-content").css("display","block");
						var obj = data[0][4];
						var lis = obj.list;
						var content = obj.list2;
						console.log(content);
						// console.log(lis.length);
						// console.log($(".norms"));
						for(var i = 0; i < lis.length; i++){
							$('<li><strong>'+ lis[i] +'</strong>'+ content[i] +'</li>').appendTo($(".norms"));
						}
					}
				})

			}else{
				$(".display").css("display","none");
				$(".norms-content").css("display","block");
			}

			
		})
	}
	function banner(){
		new Banner();
	} 
	return {
		HotProduct : HotProduct,
		language : language,
		Login : Login,
		randomImg : randomImg,
		cartCookie : cartCookie,
		cartMount : cartMount,
		gotoTop : gotoTop,
		banner : banner,
		Slide : Slide,
		List : List,
		cart : cart,
		detail : detail,
		imgContent : imgContent,
		headerScroll : headerScroll,
		proList : proList,
		norms : norms
	}
})