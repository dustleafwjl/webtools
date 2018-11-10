// Array的实用方法:
var personArr = [
    {name: '王港', src: './src/img/3.png', des: '颈椎不好', sex: 'm', age: 20}, 
    {name: '刘莹', src: './src/img/5.png',des: '我是谁', sex: 'f', age: 25},
    {name: '王秀莹', src: './src/img/4.png', des: '我很好看', sex: 'f', age: 16}, 
    {name: '刘金雷', src: './src/img/1.png', des: '你没有见过陌生的脸', sex: 'm', age: 35}, 
    {name: '刘飞翔', src: './src/img/2.png', des: '瓜皮刘', sex: 'm', age: 40}
];

// forEach(function (ele, index, self){函数实体}) 定义在Array.prototype = []
// 第一个参数为函数，第二个参数为this指向的对象
// ele：本轮循环中数组的当前元素
// index：本轮循环中数组的当前索引
// self：数组本身 
// personArr.forEach(deal);
// function deal (ele, index, self) {
//     // 函数实体
// }
// forEach()的实现 自己定义一个myForEach
// 目的：数组实例可以调用该方法，要达到循环遍历的作用
// 参数：一个函数，函数实现一系列功能。函数在执行的时候也会接收参数 ele 元素 index 索引 self 本身
Array.prototype.myForEach = function (func) {
    // this => personArr
    var len = this.length;
    var _this = arguments[1] != undefined ? arguments[1] : window;
    for(var i = 0; i < len; i ++) {
        func.apply(_this, [this[i], i, this]);
    }
}


// Filter
// Array.prototype.filter
// 第一个参数为函数，第二个参数为this指向的对象和forEach一样
// 对数组过滤的作用，基于遍历
// filter 参数是函数 =>定义ele index self
// filter执行完以后会返回一个新的数组
// 在函数实体中返回ture 或者 false 来决定本次循环的元素是否留在返回的新数组中（true留，flase不留）
// var newArr = personArr.filter(function (ele, index, self){
//     console.log(ele, index, self);
//     return true;
// });
Array.prototype.myFilter = function (func) {
    var _this = arguments[1] || window;
    var newArr = [];
    var len = this.length;
    for(var i = 0; i < len; i ++){
            func.apply(_this, [this[i], i, this]) && newArr.push(this[i]);
    }
    return newArr;
}
// var newArr = personArr.myFilter(function (ele, index, self){
//     return ele.sex == 'm';
// });

// Map
// 映射 x->y Map 可以用来取值
// Array.prototype.map
// 第一个参数为函数，第二个参数为this指向的对象和forEach一样
// 映射作用 返回新数组 函数 ele index self
// 返回一个新的数组，数组的值为传入函数的返回值
// var newArr = personArr.map(function (ele, index, self){
//     return ele.name;
// }, obj);
Array.prototype.myMap = function (func) {
    var _this = arguments[1] || window;
    var len = this.length;
    var newArr = [];
    for(var i = 0; i < len; i ++) {
        var newArr = push(func.apply(_this, [this[i], i, this]));
    }
    return newArr;
}


// Every
// 目的：判断数组中全部元素是否都满足要求
// 返回值：true false
// 参数 函数（ele, index, self）,this指向
// Array.prototype.every
// var flag = personArr.every(function (ele, index, self) {
//     if(ele.age > 18) {
//         return true;
//     }else {
//         return false;
//     }
// });
Array.prototype.myEvery = function (func) {
    var flag = true;
    var _this = arguments[1] || window;
    var len = this.length;
    for (var i = 0; i < len; i ++) {
        if(func.apply(_this, [this[i], i, this]) == false) {
            flag = false;
            break;
        }
    }
    return flag;
}


// Some
// 目的：判断数组中是否有元素符合要求（一个或者多个）
// 返回值：true false
// 参数 函数（ele, index, self）,this指向
Array.prototype.mySome = function (func) {
    var flag = false;
    var _this = arguments[1] || window;
    var len = this.length;
    for (var i = 0; i < len; i ++) {
        if(func.apply(_this, [this[i], i, this]) == true) {
            flag = true;
            break;
        }
    }
    return flag;
}

// Reduce
// initialValue 基于原数组中的元素进行操作
// Array.prototype.reduce
// 原生reduce不提供改变this的能力
Array.prototype.myReduce = function (func, initialValue) {
    var len = this.length, 
    _this = arguments[2] || window, 
    nextValue = initialValue;
    for (var i = 0; i < len; i++) {
        nextValue = func.apply(_this, [nextValue, this[i], i, this]);
    }
    return nextValue;
}
var cookieStr = "PSTM=1526700942; BIDUPSID=554B58935726788C9635D849B5BC0A60; BD_UPN=12314753; sug=3; sugstore=1; ORIGIN=0; bdime=0; BAIDUID=DBACC7EB61231C6524A91ED28DA81748; pgv_pvi=6189348864; cflag=15%3A3; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; BDRCVFR[7JA7KA5iDWT]=mk3SLVN4HKm; BD_HOME=1; H_PS_PSSID=3333";
// //  name => value
function parseCookieStr (str) {
    var obj = {};
    var cookieArr = str.split('; ');
    return cookieArr.myReduce(function (prevValue, icurValue, index, self) {
        // console.log(index);
        // console.log(prevValue, icurValue);
        var arr = icurValue.split('=');
        prevValue[ arr[0] ] = arr[1];
        return prevValue;
    }, obj);
}
var cookieObj = parseCookieStr(cookieStr);

// ReduceRight 和reduce方法一样，只是遍历方向是从后往前，从右往左