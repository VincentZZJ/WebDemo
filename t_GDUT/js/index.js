// 获取样式方法
function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

window.onload = function () {
	var mLeft = document.getElementById('m_left');
	var mRight = document.getElementById('m_right');
	var side_right = document.getElementById('side_right');
	// 获取a标签（左/右侧滑动）
	var L_a = document.getElementById('side_left');
	var R_a = side_right.getElementsByTagName('a')[0];
	// var str = getStyle(mLeft,"left");
	L_a.onclick = function (ev) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="a"){
			// mRight.style.width = "1332px";
			side_right.style.display = "block";
			animate(mLeft,{"marginLeft":"-200"},function () {
				mRight.style.width = "1332px";
			});
		}
	}
	R_a.onclick = function (ev) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="a"){
			side_right.style.display = "none";
			mRight.style.width = "1238px";
			animate(mLeft,{"marginLeft":"0"});
		}
	}
	// 加载时间
	var nowTime = getTime();
	var h_right = document.getElementById('h_right');
	var date = h_right.getElementsByTagName('time')[0];
	date.innerText = nowTime;
	// alert(nowTime);
}

// 获取登录时间（或加载index.html的时间）
function getTime() {
	var date = new Date();
	var iYear = date.getFullYear();
	var iMon = setForm(date.getMonth()+1);
	var iday = setForm(date.getDate());
	var iHours = setForm(date.getHours());
	var iMinutes = setForm(date.getMinutes());
	var iSeconds = setForm(date.getSeconds());

	var nowTime = iYear+"-" + iMon + "-" + iday + "  " + iHours +":" + iMinutes + ":" + iSeconds;
	// console.log(iYear+"-" + iMon + "-" + iday + " " + iHours +":" + iMinutes + ":" + iSeconds);

	function setForm(num) {
		return num<10?"0"+num:num;
	}
	return nowTime;
}

// 运动方法
function animate(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var flag = true;	/*判断链式运动标识，默认全部完成*/
		for(var attr in json){
			// 获取当前样式
			if(attr=="opacity"){	/* 获取透明度的*/
				var curAttr = Math.round(parseFloat(getStyle(obj,attr)*100));
			}else{ /* 获取非透明度类*/
				var curAttr = parseFloat(getStyle(obj,attr));
			}
			// 设置递变幅度（采用缓冲运动）
			var speed = (json[attr]-curAttr)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			// 判断是否已经完成效果
			if(curAttr!=json[attr]){
				flag = false;
			}
			// 把变化的样式添加进对象
			if(attr=="opacity"){
				obj.style.filter = "alpha(opacity:" + (curAttr+speed) + ")";
				obj.style.opacity = (curAttr+speed)/100;
			}else{
				obj.style[attr] = curAttr + speed + "px";
			}
		}
		// 判断整个链式运动是否结束（这里注意一个点：每一次定时器周期会执行整个json,故只有当所有都已达到效果flag才为true
		if(flag){
			clearInterval(obj.timer);
			// 判断回调函数
			fn && fn();
		}
	},30);
}