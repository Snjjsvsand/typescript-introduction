// 对象类型

// 1.匿名对象类型
function greet(person: {name: string , age: number}) {
  console.log(person.name , person.age)
}
// 2. interface 声明一个对象类型
interface Person {
  name: string
  age: number
}
// 3. type 声明
type Person2 = {
  name: string
  age: number
}



// 可选属性
interface PaintOptions {
  shape: string
  xPos?: number
  yPos?: number
}

// 对象解构配合默认值
function paintShape({shape , xPos = 0 , yPos = 0} : PaintOptions) {
  console.log(shape , xPos , yPos)
}



// 只读属性
interface SomeType {
  readonly prop: string
}

const obj: SomeType = {
  prop: 'Boolean'
}
// 声明为只读的属性不能被赋值
// obj.prop = 'String'

interface Home {
  readonly resident: {name: string , age: number}
}

const home: Home = {
  resident: {
    name: 'joe',
    age: 20
  }
}
// 只读属性不可变
// home.resident = {}

// 但是只读属性的内容可以
home.resident.age = 23


// TypeScript 在查看类型是否匹配时，不会考虑 readonly 

interface WritablePerson {
  name: string,
  age: number
}

interface ReadonlyPerson {
  readonly name: string
  readonly age: number
}

const person: WritablePerson = {
  name: 'joe',
  age: 20
}

// legal
const readonlyPerson: ReadonlyPerson = person

person.age++
// readonlyPerson.age++



// 索引标识符
// 用于不知道类型的具体属性名但是知道类型的结构
// 拥有索引标识符的类型可以使用 [] 索引取值 , 并且索引和返回值的类型可以确定
interface StringArray {
  [index: number]: string
  length: number
}
const myArray: StringArray = []

console.log(myArray[0])

// 如果类型同时拥有数字索引和字符串索引
// 数字索引返回的类型必须是字符串索引的同类型或子类型
interface Animal {
  name: string
}
interface Dog extends Animal {
  bark: string
}

// error
// interface NotOkay {
//   [index: number]: Animal
//   [prop: string]: Dog
// }

interface Okay {
  [index: number]: Dog
  [prop: string]: Animal
}

// 字符串索引用来描述 “字典”
// 一旦一个类型拥有字符串索引，它的其他属性的类型必须符合字符串索引返回的类型
// 因为 obj['prop'] === obj.prop
interface NumberDictionary {
  [prop: string]: number
  // size: string // error
  size: number
}

// 但是可以使用联合类型:
interface NumberOrStringDictionary {
  [prop: string]: number | string
  size: number
  disc: string
}

// readonly 可以作用于索引
interface ReadonlyStringArray {
  readonly [index: number]: string
}

const myArray2: ReadonlyStringArray = ['joe']
// myArray2[0] = 'alice' // error



// 继承
interface BasicAddress {
  name?: string
  street: string
  city: string
}

interface AddressWithUnit extends BasicAddress{
  unit: string
}

const address: AddressWithUnit = {
  name: 'joe',
  street: 'shengyangdajie',
  city: 'shenyang',
  unit: '001'
}

// 允许多重继承
interface Colorful {
  color: string
}
interface Circle {
  radius: number
}

interface ColorfulCircle extends Colorful , Circle {}

const cc: ColorfulCircle = {
  color: 'red',
  radius: 1.0
}

// 类型交叉
// 类似于 interface 的继承，不过适用于 type
type ColorfulCircleType = Colorful & Circle

const cc2: ColorfulCircleType = {
  color: 'red',
  radius: 1.0
}



// 泛型对象类型
interface Box<T> {
  content: T
}

const stringBox: Box<string> = {
  content: 'content'
} 

const numberBox: Box<number> = {
  content: 23
}

// 配合泛型函数使用
function setContent<Type>(box: Box<Type> , content: Type) {
  box.content = content
}

// 使用 type :
type BoxType<T> = {
  content: T
}

// 使用 type 可以描述的不只是对象，也可以写出其他有用的泛型类型：
type OrNull<T> = T | null
type OneOrMany<T> = T | T[]
type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>
type OneOrManyOrNullStrings = OneOrManyOrNull<string>



// 常用泛型类型: Array
const arr: Array<any> = []
const arr2: any[] = [] // 简写

// 其余常用泛型类型：
const mapper: Map<number , string> = new Map<number , string>()
const bag: Set<number> = new Set<number>()
const promise: Promise<string> = new Promise<string>((res , rej) => {
  setTimeout(() => {
    res('Good Joe.')
  } , 1000)
})

// ReadonlyArray 描述了不可变的数组 , 但是 ReadonlyArray 不能 new
function doStuff(values: ReadonlyArray<string>) {
  // error
  // values[1] = 23
  // error
  // values.push(23)
}

// 可以将数组指派给 ReadonlyArray
const roArray: ReadonlyArray<string> = ['joe']
// ReadonlyArray 也有简写
const roArray2: readonly string[] = ['joe']



// 元组类型
// 类似于定长数组，并且每个元素的类型已经确定:
type StringNumberPair = [string , number]
const pair: StringNumberPair = ['joe' , 23]

function doSomething(pair: [string , number]) {
  const a = pair[0]
  const b = pair[1]
}

// 配合数组解构
function doSomething2(stringHash: [string , number]) {
  const [str , hash] = stringHash
  console.log(str , hash)
}

// 可选
type Either2dOr3d = [number , number , number?]

// rest运算符
type AnyBoolean = [number , string , ...boolean[]]

function doSomething3(...args: AnyBoolean) {
  const [num , str , ...bools] = args
}

// 只读
type ReadonlyTuple = readonly [string , number] 
const roPair: ReadonlyTuple = ['joe' , 23]
// roPair[1] = 24 // error

function doSomething4(pair: [string , number]) {
}

// doSomething4(roPair) error 
// function doSomething5(pair: readonly [string , number]) legal



