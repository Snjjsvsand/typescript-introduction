// 类型收窄
// 不可以直接将 number | string 当作 number使用
// 如果 repeat 接受 number 而不接受 string
/*
// error
function padLeft(padding: number | string , input: string) {
    return "*".repeat(padding) + input
}
*/
// 显式的检查会让 typescript 推断出更具体的类型
// 使用 typeof :
function padLeft(padding, input) {
    if (typeof padding === 'number') {
        // padding: number
        return '*'.repeat(padding) + input;
    }
    // padding: string
    return padding + input;
}
// typescript 会推测出可能出现的 null (JavaScript中 typeof null === 'object')
/*
function printAll(strs: string | string[] | null) {
    if(typeof strs === 'object') {
        // 'strs' is possibly 'null'.ts(18047)
        for(const str of strs) {}
    }else { }
}
*/
// 可以限定 strs 为 true 时进行处理： （Boolean(null) === false）
function printAll(strs) {
    if (strs && typeof strs === 'object') {
        // 'strs' is possibly 'null'.ts(18047)
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var str = strs_1[_i];
        }
    }
    else { }
}
// typescript 进行如下推断：
// 如果 x === y , 那么 x 和 y 的类型必然相等，唯一的可能就是两者类型都为 string 
function example(x, y) {
    if (x === y) {
        return x.toUpperCase() + y.toUpperCase();
    }
}
/*
    JavaScript 中 null == undefined // true
*/
function weirdEqual() {
    console.log(undefined == null); // true
}
// TypeScript 可以推断出含有 fly 属性的类型必然是 Bird
function move(animal) {
    if ('fly' in animal) {
        animal.fly();
    }
    else {
        animal.swim('swim');
    }
}
// 如果该属性几种类型都有，那么 TypeScript 会把范围缩小到对应的几种类型:
function move2(animal) {
    if ('fly' in animal) {
        // (parameter) animal: Bird | Person
        animal.fly();
    }
    else {
        animal.swim('swim');
    }
}
// instance 也可以用来缩小类型范围：
// instance 在 JavaScript 中用来检查 a 的原型链上是否有 b
function logValue(x) {
    if (x instanceof Date)
        console.log(x.toDateString());
    else
        console.log(x.toUpperCase());
}
// 赋值
// 可以给一个变量赋它被声明时的类型或符合声明类型范围的值
var x = Math.random() < 0.5 ? 1 : 'good joe';
x = 2;
x = 'goodbye joe';
// x = true // type error!
// TypeScript 可以在分支语句中缩小类型范围，
// 并且在分支结束后将类型重新合并：
function example2() {
    var x;
    x = Math.random() < 0.5;
    //let x: boolean
    console.log(x);
    if (Math.random() < 0.5) {
        x = "hello";
        // let x: string
        console.log(x);
    }
    else {
        x = 100;
        // let x: number
        console.log(x);
    }
    // let x: string | number
    return x;
}
// 使用类型预测语法来自定义类型守卫：
function isFish(pet) {
    // 判断根据
    return pet.swim !== undefined;
}
var pet = {
    swim: function (name) {
        console.log("".concat(name, " swimming!"));
    }
};
// 使用 isFish ， 可以让 typescript 断定变量不是 Fish 就是 Bird
function usePrediate(pet) {
    if (isFish(pet)) {
        pet.swim('Joe');
    }
    else {
        pet.fly();
    }
}
// 通过 kind 来锁定具体的 shape
function getArea(shape) {
    if (shape.kind === 'circle') {
        return Math.PI * Math.pow(shape.radius, 2);
    }
    else
        return Math.pow(shape.length, 2);
}
// never 代表不可能出现的类型，即一个空集，任何类型都可以被缩小为 never , never 类型不能被赋任何值
// 同理: number | string 可以被收窄为 number , 但是 number 不能被赋一个 number | string 的值
// 常用场景：确保我们所有的联合类型都被处理到
function getArea2(shape) {
    var res = 0;
    switch (shape.kind) {
        case 'circle':
            res = Math.PI * Math.pow(shape.radius, 2);
            break;
        case 'square':
            res = Math.pow(shape.length, 2);
            break;
        case 'triangle':
            res = shape.a * shape.h / 2;
            break;
        default:
            // 如果有类型未处理这里就会报错
            var impos = shape;
            break;
    }
    return res;
}
