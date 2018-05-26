// 通过className获取对象集合
function getByclass(obj,classname) {
	// 获取obj下所有元素
	var elements = obj.getElementsByTagName('*');
	// 初始化一个数组
	var result = [];
	for(var i=0;i<elements.length;i++){
		if(elements[i].className == classname){		 // 暂不考虑多个className的情况
			result.push(elements[i]);
		}
	}
	return result;
}
// 判断是否存在class
function hasClass(obj,classname) {
	return obj.className.match(new RegExp("(\\s|^)" + classname + "(\\s|$)"));			// 利用正则表达式判断是否存在
}

// 对class进行增删
function removeClass(obj,classname) {
	if(hasClass(obj,classname)){
		var reg = new RegExp("(\\s|^)" + classname + "(\\s|$)");
		obj.className = obj.className.replace(reg,"");
	}
}

function addClass(obj,classname) {
	if(!hasClass(obj,classname)){
		obj.className += " " + classname;
	}
}

window.onload = function () {
	window.onscroll = function () {
		// 获取滚动条下滑高度 (由于浏览器存在差异性，故以此判别来获取正确的值)
		// var top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(top);

		// 获取导航条信息
		var guide = document.getElementById('guide');
		var aLis = guide.getElementsByTagName('li');

	    // 获取内容框中模块
	    var content = document.getElementById('content');
	    // var items = content.getElementsByClassName('item');		存在问题，由于IE下不支持该DOM获取方式，故自己封装一个方法 
	    var items = getByclass(content,"item");
	    // 设置当前楼层
	    var currentFloor = "";

	    // 循环遍历每个内容框获取其offsetTop
	    for(var i=0;i<items.length;i++){
	    	var _item = items[i];
	    	var _itemTop = _item.offsetTop;
	    	// console.log(_itemTop);
	    	if(top>_itemTop-160){			/// 减一个数值是排除中间临界的尴尬
	    		currentFloor = _item.id;
	    	}else{
	    		break;
	    	}
	    }

	    // 判断是否为当前楼层，是则不用变化
	    if(currentFloor){
	    	// console.log(currentFloor);
	    	for(var i=0;i<aLis.length;i++){
	    		var oLink = aLis[i].getElementsByTagName('a')[0];
	    		var _href = oLink.href.split("#");
	    		// console.log(_href);
	    		// 判断楼层
	    		if(_href[_href.length-1]!=currentFloor){
	    			removeClass(aLis[i],"active");
	    		}else{
	    			addClass(aLis[i],"active");
	    		}
	    	}
	    }
	}
}