var _a;
// 常用原始类型
var str = 'Hello World';
var num = 123;
var bool = true;
// 固定类型数组
// 指定方式1: 
var numArr1 = [1, 2, 3];
// 指定方式2: 泛型
var numArr = [1, 2, 3];
// any类型: 如果不想指定一个具体的类型，可以使用 any
// 你可以从 any 类型的变量中取任何属性并且 typescript 不会报语法错误
var obj = {
    foo: 'foo',
    bar: 'bar'
};
console.log(obj.good);
/*
    noImplicitAny:
    当我们不为变量指定一个明确类型并且 typescript 也无法推断它的类型时，它的默认类型为 any
    可以通过指定 noImplicitAny 使所有的 any类型 在使用时被明确指定为 any , 避免变量被隐式指定为 any
*/
// 变量类型注解 ， 当我们在声明变量时，可以选择添加显式的类型注解来为变量指定类型:
var myName = 'Good Joe';
/*
    typescript 没有采用 int x = 0 这种左侧类型，而总是将类型注解放在后面 =. =
*/
// 如果不标注类型，ts会尽量推断：
var myName2 = 'Good Joe';
// 函数
// 参数类型指定方式如下：
function greet(name) {
    console.log("Hello , ".concat(name.toLocaleUpperCase(), " !"));
}
// greet(37) params type error
// 函数返回类型指定方式如下：
function greet2(name) {
    return "Hello , ".concat(name.toLocaleUpperCase(), " !");
}
/*
    匿名函数
    如果函数出现在 TypeScript 能弄清楚它是如何被调用的地方，
    这个函数的参数类型会被自动指定：
*/
var names = ['Alice', 'Bob'];
// item 被自动推断为 string 类型 , 箭头函数和普通函数都可以:
names.forEach(function (item) {
    item.toUpperCase();
});
// 对象类型
// 定义一个对象类型需要指定该对象的属性以及属性的类型:
var coordinate = {
    x: 123,
    y: 321
};
// 如果某个属性是可选的，那么使用 ? 标注。
// 当我们希望如果某个对象中的属性不存在就返回 undefined 时，使用可选类型：
var nameType = {
    first: 'Alice',
    // The second is optional.
};
console.log(nameType.second); // undefined
console.log((_a = nameType.second) === null || _a === void 0 ? void 0 : _a.toUpperCase()); // optional chaining operator in ES2020
// 联合类型 Union 
// TypeScript 允许我们使用一系列运算符将单一的类型组合起来,使得变量可以被指定为多种值：
var employee = {
    id: 1,
    // id: '1' // 也可以.
    name: 'Joe'
};
// 但是我们只能使用联合类型中所指定类型都拥有的属性:
function printId(id) {
    // console.log(id.toUpperCase()) // 报错,因为 number 类型没有 toUpperCase 属性
    console.log(id.toString());
}
// 解决方法是对类型特判: typeof 及 Array.isArray 等
function printStringOrStringArray(str) {
    if (Array.isArray(str))
        str.forEach(function (e) { return console.log(e); });
    else
        console.log(str);
}
var coordinate2 = {
    x: 123,
    y: 321
};
var id = '9527';
var point = {
    x: 123,
    y: 321
};
/*
    type 与 interface 关键字的区别:
    1. interface 可以被 extends 关键字所继承 , type 不可以
    2. type 可以使用 & 参与联合类型的运算
    3. interface 可以添加新的字段
    4. type 在指定后不能修改
*/
// 类型断言
// 有些时候一个值的类型 typescript 无法推断，但是开发人员清楚，这时我们可以使用断言
// 断言可以完全决定变量的类型
var assertVariable = 'Gooe Joe';
console.log(assertVariable.x);
// 写法2
var assertVariable2 = 'Good Joe';
