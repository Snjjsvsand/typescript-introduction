// 函数声明，写法类似箭头函数：
var desc = function (someArg) { console.log(someArg); };
desc.description = 'good joe';
function fn(date) {
    return new date('20230502');
}
// 泛型
// 将类型当作参数,可以将传参和返回值的类型联系起来
function firstElement(arr) {
    return arr[0];
}
// 这样ts可以推断出 n 和传入参数数组类型一致
var n = firstElement([1, 2, 3]);
function myMap(arr, func) {
    return arr.map(func);
}
var parsed = myMap(['1', '2', '3'], function (e) { return parseInt(e); });
// 约束
// 可以使用 extends 关键字来约束泛型的取值范围:
function longer(a, b) {
    if (a.length > b.length)
        return a;
    return b;
}
// 此时 Type 只能取拥有 length 属性的类型
var res = longer([1, 2, 3], [3, 2, 1]);
// Type制定了必须返回和传入一致的类型 ，而不仅仅只是一个符合约束的类型
/*
function mininumLength<Type extends {length: number}>(obj: Type , mininum: number):Type {
    if(obj.length >= mininum) return obj
    return {length: mininum}
}
*/
// 这里没有报错是因为本身传入的就是两个类型的联合类型
var res2 = longer([1, 2, 3], ['1', '2', '3']);
// 如果 ts 推断不出联合类型， 可以显示指定
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
var arr = combine([1, 2, 3], ["hello"]);
// 使用泛型的几个要点：
// 1. 尽量使用类型本身而不是对类型的约束
// 方法1可以推断出返回值是Type , 而方法二只能知道返回类型是符合any约束的any
function firstElement1(arr) {
    return arr[0];
}
function firstElement2(arr) {
    return arr[0];
}
// 2. 尽量少的使用泛型中的类型参数
// 方法1简洁易懂
function filter1(arr, func) {
    return arr.filter(func);
}
function filter2(arr, func) {
    return arr.filter(func);
}
// 3. 参数类型应该出现两次
// 如果参数类型只出现一次，那么可能根本没有使用的必要
function greet1(s) {
    console.log(s);
}
function greet2(s) {
    console.log(s);
}
// 可选参数
function f(n) {
    console.log(n);
}
// legal
f();
f(3);
// 参数同JavaScript一样可以带默认值，代表参数可选，不填则为默认值
function f2(n) {
    if (n === void 0) { n = 3; }
    console.log(n);
}
// 永远不要在回调函数中使用可选参数，比如：
function myForEach(arr, callback) {
    for (var i = 0; i < arr.length; i++)
        callback(arr[i]); // 没传index
}
// 这里的index是undefined因为在真正的 117 行调用 callback时没有传第二个参数，和我们的本意不同
// myForEach([1 , 2 , 3] , (item , index) => console.log(index.toFixed()))
// 这样是对的
function myForEach2(arr, callback) {
    for (var i = 0; i < arr.length; i++)
        callback(arr[i], i);
}
// 即使真正的回调函数没有使用 index , 只是将多余的参数忽略罢了
myForEach2([1, 2, 3], function (item) { return console.log(item); });
function makeDate(timeStamp, d, y) {
    if (d !== undefined && y !== undefined)
        return new Date(y, timeStamp, d);
    return new Date(timeStamp);
}
function func(x) {
    return x;
}
var db = {
    mapUsers: function (func) {
        var users = [{ name: 'joe', age: 20 }, { name: 'alice', age: 20 }];
        var res = [];
        for (var i = 0; i < users.length; i++) {
            res.push(func.apply(users[i]));
        }
        return res;
    }
};
db.mapUsers(function () {
    return this.name;
});
// 其余类型
// void
// 如果函数没有 return 语句或者写出 return ; 则返回类型为void
function nope() {
    return;
}
// object , object 类型是除了几个原始类型：
// number , boolean , string , undefined , null , symbol , bigint
// 之外的类型，包括函数
// 注意不是 Object 哦
// unknown , 类似于 any 但是更安全，因为不能对 unknown 类型的值做任何事
// never ， 用于描述函数不会返回任何值，通常这个函数会抛出异常或者终止程序
// Function 类型描述了一个可以被调用且返回 any 的函数
// Rest运算符
// 函数参数
function multiply(n) {
    var m = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        m[_i - 1] = arguments[_i];
    }
    return m.map(function (x) { return n * x; });
}
// ...m 如果不显示声明类型，默认为 any[] , 并且 rest参数的类型只能为 T[] 或 Array<T>
// 展开数组
// as const 表示 args 数组为只读 , 这样展开后才能保证参数数量一定符合要求
var args = [1, 2];
var angle = Math.atan2.apply(Math, args);
// 参数解构
function sum(_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    console.log(a + b + c);
}
