function type(target){
	var ret = typeof(target);
	var template = {
		"[object Array]" : "array",
		"[object Object]" : "object",
		"[object Number]" : "number - object",
		"[object Boolean]" : "boolean - object",
		"[object String]" : "string - object"
	}
	if(target == null){return "null"}
	else if(ret == "object") {
		var str = Object.prototype.toString.call(target);
		return template[str];
	}else{
		return ret;
	}
}
/*
数组去重
 */
Array.prototype.unique = function () {
	var temp = {},
		arr = [],
		len = this.length;
		for(var i = 0; i < len; i ++){
			if (!temp[this[i]]){
				temp[this[i]] = "abc";
				arr.push(this[i]);
			}
		}
		return arr;
}
/*
	Description:
	得出当前页面滚动条的位置
*/
function getScrollOffset(){
	if(window.pageXOffset){
		return {
			x : window.pageXOffset,
			y : window.pageYOffset
		}
	}else{
		return {
			x : document.body.scrollLeft + document.documentElement.scrollLeft,
			y : document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}
// 脚本话css
// 操作css只有style是写入  其他的方法都是间接操作不是直接写入
function getStyle(elem,prop) {
	if(window.getComputedStyle){
		return window.getComputedStyle(elem,null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}
//给你个dom添加一个该事件类型的处理函数
//elem：对象
//type：事件处理类型
//handle：事件的处理函数
function addEvent(elem, type, handle) {
	if(elem.addEventListener){
		elem.addEventListener(type, handle, false);
	}else if(elem.attchEvent){
		elem.attachEvent('on' + type, function(){
			handle.call(elem);
		})
	}else{
		elem['on' + type] = handle;
	}
}
//解除事件函数
function removeEvent(elem, type, handle) {
	if(elem.removeEventListener){
		elem.removeEventListener(type, handle, false);
	}else if(elem.detachEvent){
		elem.detachEvent('on' + type, function(){
			handle.call(elem);
		})
	}else{
		elem['on' + type] = null;
	}
}
// 封装阻止事件冒泡的函数
function stopBubble(event){
	if(event.stopPropagation) {
		event.stopPropagation();//w3c标准
	}else{
		event.cancelBubble = true;//ie独有
	}
}
//阻止默认事件函数的封装
function cancelHandler(event) {
	if(event.preventDefault) { //preventDefault()事件是w3c标准 阻止默认时间的发生
		event.preventDefault();
	}else{
		event.returnValue = false; //ie专有 ie9以下能用 .returnValue = false;
	}
}
//实现dom元素的拖拽
//利用了许多自己封装的方法
function drag(elem) {
	var disX,
		disY;
	addEvent(elem, 'mousedown', function (e) {
		var event = e || window.event;
		disX = event.clientX - parseInt(getStyle(elem, "left"));
		disY = event.clientY - parseInt(getStyle(elem, "top"));
		addEvent(document, 'mousemove', mouseMove);
		addEvent(document, 'mouseup', mouseUp);
		stopBubble(event);
		cancelHandler(event);
	});
	function mouseMove (e) {
		var event = e || window.event;
		elem.style.left = event.clientX - disX + "px";
		elem.style.top = event.clientY - disY + "px";
	}
	function mouseUp(){
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}
}
function loadScript (url, callback) {//封装的异步加载js方法
	var script = document.createElement('script');
	script.type = "text/javascript";
	if(script.readyState) {
		script.onreadystatechange = function () {//ie独有
			if(script.readyState == "complate" || script.readyState == "loaded") {//script.readyState是状态码
				callback();//外部使用方法  loadScript（url ，function(){test();}）
			}
		}
	}else{
		script.onload = function () {//Safari chrome firefox opera
			callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}
//js时间线 DOMContentLoaded事件也是在dom元素全部解析完执行的事件  比 winow.onload（是dom加载完执行，土鳖式写法快
//二叉树算法
//生成，遍历以及还原
Node.prototype.addleft = function (data){
	this.left = new Node(data, null, null);
}
Node.prototype.addright = function (data){
	this.right = new Node(data, null, null);
}
function Node(data, left, right){
	this.data = data;
	this.left = left;
	this.right = right;
}
function setTree(){
	var root = new Node(1, null, null);
	var left2 = new Node(2,null,null);
	var right3 = new Node(3,null,null);
	var left4 = new Node(4,null,null);
	var right5 = new Node(5,null,null);
	var left6 = new Node(6,null,null);
	var right7 = new Node(7,null,null);
	root.left = left2;
	root.right = right3;
	left2.left = left4;
	left2.right = right5;
	right3.left = left6;
	right3.right = right7;
	return root;
}
function pre(root){//前序遍历
	if(root == null)return;
	console.log(root.data);
	pre(root.left);
	pre(root.right);
}
function mid(root){//前序遍历
	if(root == null)return;
	mid(root.left);
	console.log(root.data);
	mid(root.right);
}
function preMid(pre, mid){//前中序遍历还原
	if(pre.length == 0 || mid.lenght == 0){
		return null;
	}
	if(pre.length != mid.length){
		throw Error("参数不正确！！！");
	}
	var rootData = pre[0];
	var midRootIndex = mid.indexOf(rootData);
	var midLeft = mid.slice(0, midRootIndex);
	var midRight = mid.slice(midRootIndex + 1);
	var preLeft = pre.slice(1, midLeft.length + 1);
	var preRight = pre.slice(midLeft.length + 1);

	var left = preMid(preLeft, midLeft);
	var right = preMid(preRight, midRight);
	var node = new Node(pre[0], left, right);
	return node;
}

//创建一个轮播图 参数为图片路径有几个传几个
HTMLDivElement.prototype.createTurnPage = function (srcArr) {
	var ul, liArr = [], imgArr = [], len = srcArr.length;
	ul = document.createElement('ul');
	this.appendChild(ul);
	this.style.position = 'relative'
	this.style.height = 400 + 'px';
	this.style.width = 600 + 'px';
	this.style.overflow = 'hidden';
	for(var i = 0; i < len; i ++){
		liArr[i] = document.createElement('li');
		imgArr[i] = document.createElement('img');
		imgArr[i].src = srcArr[i];
		liArr[i].appendChild(imgArr[i]);
		ul.appendChild(liArr[i]);
		liArr[i].style.float = "left";
		liArr[i].style.width = '6s00px';
	}
	ul.style.height = 400 + 'px';
	ul.style.width = len * 600 + 'px';
	ul.style.position = 'absolute';
	ul.style.top = "0px";
	ul.style.left = '0px';
	var timer = null;
	timer = setTimeout(autoMove, 1500);
	function autoMove(direction) {
		clearTimeout(timer);
		if(!direction || direction == 'left->right'){
			startMove(ul, {left: ul.offsetLeft - liArr[0].offsetWidth}, function () {
				if(ul.offsetLeft == - (len-1) * liArr[0].offsetWidth){
					ul.style.left = '0px';
				}
			});
		}
		timer = setTimeout(autoMove, 1500);
	}
}