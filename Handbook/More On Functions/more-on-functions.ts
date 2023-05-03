// 函数声明，写法类似箭头函数：

type funcDeclare = (name: string)=> void

// 调用标识符:
// 用来声明一个可以被调用且拥有属性的函数
// 拥有调用标识符的类型可以被()调用
// 写法类似于函数声明但是将 => 换成 :
type DescribableFunction = {
    description: string
    (someArg: number): void
}

const desc: DescribableFunction = function(someArg: number) { console.log(someArg) }
desc.description = 'good joe'

// 构造标识符
// 拥有构造标识符的类型应该可以 new 一个对象
type ConstructorTyppe = {
    new (s: string): Object
}

function fn(date: ConstructorTyppe) {
    return new date('20230502')
}

//类似于 Date 类型可以直接调用也可以 new Date
type likeDate = {
    (n?: number): number
    new (s: string): Date
}

// 泛型
// 将类型当作参数,可以将传参和返回值的类型联系起来
function firstElement<T>(arr: Array<T>): T | undefined {
    return arr[0]
}
// 这样ts可以推断出 n 和传入参数数组类型一致
const n = firstElement([1 , 2 , 3])

function myMap<Input , Output>(arr: Input[] , func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}

const parsed = myMap(['1' , '2' , '3'] , e => parseInt(e))

// 约束
// 可以使用 extends 关键字来约束泛型的取值范围:
function longer<Type extends {length: number}>(a: Type , b: Type): Type {
    if(a.length > b.length) return a
    return b
}
// 此时 Type 只能取拥有 length 属性的类型
const res = longer([1 , 2 , 3] , [3 , 2 , 1])

// Type制定了必须返回和传入一致的类型 ，而不仅仅只是一个符合约束的类型
/*
function mininumLength<Type extends {length: number}>(obj: Type , mininum: number):Type {
    if(obj.length >= mininum) return obj
    return {length: mininum}
}
*/

// 这里没有报错是因为本身传入的就是两个类型的联合类型
const res2 = longer([1 , 2 , 3] , ['1' , '2' , '3'])

// 如果 ts 推断不出联合类型， 可以显示指定
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"])

// 使用泛型的几个要点：
// 1. 尽量使用类型本身而不是对类型的约束
// 方法1可以推断出返回值是Type , 而方法二只能知道返回类型是符合any约束的any
function firstElement1<Type>(arr: Array<Type>) {
    return arr[0]
}
function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0]
}

// 2. 尽量少的使用泛型中的类型参数
// 方法1简洁易懂
function filter1<Type>(arr: Type[] , func:(arg: Type) => boolean): Type[] {
    return arr.filter(func)
}
function filter2<Type , Func extends (arg: Type) => boolean>(arr: Type[] , func: Func): Type[] {
    return arr.filter(func)
}

// 3. 参数类型应该出现两次
// 如果参数类型只出现一次，那么可能根本没有使用的必要
function greet1<Str extends string>(s: Str) {
    console.log(s)
}
function greet2(s: string) {
    console.log(s)
}



// 可选参数
function f(n?: number) {
    console.log(n)
}
// legal
f()
f(3)
// 参数同JavaScript一样可以带默认值，代表参数可选，不填则为默认值
function f2(n = 3) {
    console.log(n)
}

// 永远不要在回调函数中使用可选参数，比如：
function myForEach(arr: any[] , callback: (arg: any , index?: number) => void) {
    for(let i = 0; i < arr.length; i++) callback(arr[i]) // 没传index
}
// 这里的index是undefined因为在真正的 117 行调用 callback时没有传第二个参数，和我们的本意不同
// myForEach([1 , 2 , 3] , (item , index) => console.log(index.toFixed()))

// 这样是对的
function myForEach2(arr: any[] , callback: (arg: any , index: number) => void) {
    for(let i = 0; i < arr.length; i++) callback(arr[i] , i)
}
// 即使真正的回调函数没有使用 index , 只是将多余的参数忽略罢了
myForEach2([1 , 2 , 3] , (item) => console.log(item))



// 函数重载
// 使用函数重载标识符：
function makeDate(timeStamp: number): Date
function makeDate(timeStamp: number , d: number , y: number): Date
function makeDate(timeStamp: number , d?: number , y?: number): Date {
    if(d !== undefined && y !== undefined) return new Date(y , timeStamp , d)
    return new Date(timeStamp)
}

// 注意，前两个函数的声明可以被直接调用，第三个是实现部分，不能被直接调用
// 所以两个参数会报错：
// makeDate(1 , 2) // error
// 同时，最后一个函数作为实现必须拥有兼容前面声明的参数列表和返回类型
function func(x: boolean): boolean
function func(x: string): string
function func(x: boolean | string): boolean | string {
    return x
}

// 尽量使用联合类型代替函数重载



// this
// JavaScript 规范不允许为函数声明一个叫做 this 的参数
// TypeScript 在函数列表中使用 this 来声明真正 this 的类型 , 而且 this 必须处于列表第一个位置

interface User {
    name: string
    age: number

}

interface DB {
    mapUsers(filter: (this: User) => string): string[]
    // filterUsers: (filter: (this: User) => boolean) => User[]
}

const db: DB = {
    mapUsers(func) {
        const users: User[] = [{name: 'joe' , age: 20} , {name: 'alice' , age: 20}]
        const res: string[] = []
        for(let i = 0; i < users.length; i++) {
            res.push(func.apply(users[i]))
        }
        return res
    }
}

db.mapUsers(function(this: User) { 
    return this.name
})



// 其余类型

// void
// 如果函数没有 return 语句或者写出 return ; 则返回类型为void
function nope() {
    return ;
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
function multiply(n: number , ...m: number[]) {
    return m.map(x => n * x)
}
// ...m 如果不显示声明类型，默认为 any[] , 并且 rest参数的类型只能为 T[] 或 Array<T>

// 展开数组
// as const 表示 args 数组为只读 , 这样展开后才能保证参数数量一定符合要求
const args = [1 , 2] as const
const angle = Math.atan2(...args)



// 参数解构
function sum({a , b , c} : {a: number , b: number , c: number}) {
    console.log(a + b + c)
}
// 或者使用 type
type ABC = {a: number , b: number , c: number}

function sum2({a , b , c} : ABC) {
    console.log(a + b + c)
}


// void 
// 返回类型为 void 的函数可以返回一些值，不过会被忽略，并且返回值类型仍然保持为 void 

type voidFunc = () => void
const f1: voidFunc = () => true
const v1 = f1()

// 所以一些期望收到返回 void 类型的回调可以传入返回类型不是 void 的函数
const arr2: Array<number> = [];
([1 , 2 , 3] as Array<number>).forEach((e) => arr2.push(e))

// 但如果直接写一个函数字面量并返回值为 void , 那么最好不要返回任何东西
