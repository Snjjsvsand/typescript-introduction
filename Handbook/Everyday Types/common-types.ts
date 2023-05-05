
// 常用原始类型
const str: string = 'Hello World'
const num: number = 123
const bool: boolean = true


// 固定类型数组
// 指定方式1: 
const numArr1: number[] = [1 , 2 , 3]

// 指定方式2: 泛型
const numArr: Array<number> = [1 , 2 , 3]

// any类型: 如果不想指定一个具体的类型，可以使用 any
// 你可以从 any 类型的变量中取任何属性并且 typescript 不会报语法错误
const obj: any = {
    foo: 'foo',
    bar: 'bar'
}
console.log(obj.good)

/*
    noImplicitAny:
    当我们不为变量指定一个明确类型并且 typescript 也无法推断它的类型时，它的默认类型为 any
    可以通过指定 noImplicitAny 使所有的 any类型 在使用时被明确指定为 any , 避免变量被隐式指定为 any 
*/

// 变量类型注解 ， 当我们在声明变量时，可以选择添加显式的类型注解来为变量指定类型:
let myName: string = 'Good Joe'
/*
    typescript 没有采用 int x = 0 这种左侧类型，而总是将类型注解放在后面 =. =
*/
// 如果不标注类型，ts会尽量推断：
let myName2 = 'Good Joe'



// 函数

// 参数类型指定方式如下：
function greet(name: string) {
    console.log(`Hello , ${name.toLocaleUpperCase()} !`)    
}
// greet(37) params type error

// 函数返回类型指定方式如下：
function greet2(name: string): string {
    return `Hello , ${name.toLocaleUpperCase()} !`
}

/*
    匿名函数
    如果函数出现在 TypeScript 能弄清楚它是如何被调用的地方，
    这个函数的参数类型会被自动指定：
*/

const names: string[] = ['Alice' , 'Bob']
// item 被自动推断为 string 类型 , 箭头函数和普通函数都可以:
names.forEach((item) => {
    item.toUpperCase()
})



// 对象类型

// 定义一个对象类型需要指定该对象的属性以及属性的类型:
const coordinate: {x: number , y: number} = {
    x: 123,
    y: 321
}

// 如果某个属性是可选的，那么使用 ? 标注。
// 当我们希望如果某个对象中的属性不存在就返回 undefined 时，使用可选类型：
const nameType: {first: string , second?: string} = {
    first: 'Alice',
    // The second is optional.
}
console.log(nameType.second) // undefined
console.log(nameType.second?.toUpperCase()) // optional chaining operator in ES2020


// 联合类型 Union 

// TypeScript 允许我们使用一系列运算符将单一的类型组合起来,使得变量可以被指定为多种值：
const employee: {id: number | string , name: string} = {
    id: 1,
    // id: '1' // 也可以.
    name: 'Joe'
}

// 但是我们只能使用联合类型中所指定类型都拥有的属性:
function printId(id: number | string) {
    // console.log(id.toUpperCase()) // 报错,因为 number 类型没有 toUpperCase 属性
    console.log(id.toString())
}

// 解决方法是对类型特判: typeof 及 Array.isArray 等
function printStringOrStringArray(str: string[] | string) {
    if(Array.isArray(str)) str.forEach(e => console.log(e))
    else console.log(str)
}



// 类型别名

// 我们可以为对象的类型及联合类型指定别名来方便的使用类型注解：
// 使用 type 关键字：
type Coordinate = {
    x: number
    y: number
}

const coordinate2: Coordinate = {
    x: 123,
    y: 321
}

type ID = number | string

const id: ID = '9527'


// 使用 Interface 定义为接口：
interface Point {
    x: number
    y: number
}

const point: Point = {
    x: 123,
    y: 321
}


/*
    type 与 interface 关键字的区别:
    1. interface 可以被 extends 关键字所继承 , type 不可以
    2. type 可以使用 & 参与联合类型的运算
    3. interface 可以添加新的字段
    4. type 在指定后不能修改
*/



// 类型断言

// 有些时候一个值的类型 typescript 无法推断，但是开发人员清楚，这时我们可以使用断言
// 断言可以将变量指定为更具体或者更不具体的版本，但不能直接转变为不可能成为的类型
const assertVariable = {} as Point
// const assertVariable = '123' as Point // impossible
console.log(assertVariable.x)

// 写法2
const assertVariable2 = <Point> {}

// 使用 any 将不可能变为可能
const a = ('impossible' as any) as Point



// 字面量类型

// 可以将 string 或 number 类型的值直接指定为一个取值为该值的类型
// 如果这样指定,取值只能是固定的字面量
type Method = "GET" | "POST" | "HEAD"
type Level = 1 | 2 | 3

// const 声明的 number , string 常量，其类型为字面量类型
const constStr = 'hello'
const constNum = 123

// const method: Method = "PUT" // error


// null & undefined

const none: null = null
let uninit: undefined

// ! 非 none 断言
function assertNotNull(x?: number | null) {
    return x!.toFixed()
}

// BigInt & Symbol
const infinite: bigint = BigInt(0x3f3f3f3f)
const unique: symbol = Symbol('unique')
