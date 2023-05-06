// 类


class Point {
    x: number // 成员变量
    y: number
}

// 类的初始化
// x , y 的类型会被自动推断
class Point2 {
    x = 0 // 成员变量初始化语法糖
    y = 0
}

const pt = new Point2()
pt.x // 0

// strictPropertyInitialization 选项
// 此选项规定了类的所有变量都要在构造器或者语法糖中被初始化

// 构造器初始化
class GoodGreeter {
    name: string
    
    constructor() {
        this.name = 'joe'
    }
}

// !代表此成员会被正确初始化，也许不在构造器中，但是一定会。
class OKGreeter {
    name!: string
}

// readonly 标识的变量只能在构造器及初始化语法糖中被初始化
class Greeter {
    readonly name: string = 'joe'

    constructor(name?: string) {
        if(name !== undefined) this.name = name
    }

    setName(name: string) {
        // this.name = name // error
    }
}

const greeter = new Greeter('alice')
console.log(greeter.name)
// greeter.name = 'bob' // error



// 构造器
// 构造器基本与函数相同，但是不能拥有类型参数，也不能拥有返回类型注解
class Point3 {
    // 构造器重载
    constructor(s: string)
    constructor(x: number , y: number)
    constructor(sx: string | number , y?: number) {
        //...
    }
}



// super
// 在 JavaScript 中，子类必须在构造器中使用 this. 前调用父类构造器 super()
class Base {
    k: number = 3
}

class Derived extends Base {
    constructor() {
        super()
        // console.log(this.k)
    }
}



// 方法
// 类中的函数被称为方法，与普通的函数基本相同
class Point4 {
    x: number = 10
    y: number = 10

    scale(n: number): void {
        this.x *= n
        this.y *= n
    }
}

// 注意方法仍然遵从词法作用域，要用this调用类中的其他方法及成员
const x = 'bye'
class C {
    x: string = 'hello'
    printf() {
        console.log(this.x) // hello
        console.log(x) // bye
    }
}



// Getter / Setter
// 如果一个成员变量 只有 getter 没有 setter ， 自动变为 readonly
// 如果 setter 的参数没有指明类型，则会参考 getter 的返回类型
// getter 与 setter 的访问修饰符必须相同
class GS{
    _length = 0
    get length():number {
        return this.length
    }
    set length(v) {
        this._length = v
    }
}



// 类的继承

// implements 实现接口 
interface Pingable {
    ping(): void
}

class Sonar implements Pingable {
    ping() {
        console.log('ping!')
    }
}

// error
// class Ball implements Pingable {
//     pong() {
//         console.log('pong')
//     }
// }

// TypeScript 允许多重实现 class C implements A, B 

// implements 只是检查一个类是否可以被认为是一个接口的实现
// 他不改变类或者类中方法的类型
// 类中没有实现可选类型就没有这个属性
interface Checkable {
    x: number
    y?: number
    check(name: string): boolean
}

class NameCheck implements Checkable {
    x:number = 0
    check(name) { // name: any 
        return true
    }
}

// nameCheck: NameCheck
const nameCheck = new NameCheck()
// nameCheck.y // error



// extends 继承

class Animal {
    move () {}
}

class Dog extends Animal {
    woof() {}
}

const dog = new Dog()
dog.move() , dog.woof()

// 函数重写
// 可以使用 super. 调用父类的方法
class BaseClass {
    greet() {}
}

class DerivedClass extends BaseClass {
    greet(name?: string) {
        if(name === undefined) {
            super.greet()
        }else {
            console.log(name)
        }
    }
}

// 并且可以将一个子类变量声明为父类类型
let derived: BaseClass = new DerivedClass()
// 但这要求子类同名函数的参数列表要兼容父类，否则:
// v如果 greet(name: string): void , name非可选，那么这个调用会报错
derived.greet() 

// 初始化顺序
// 基类初始化语句执行
// 基类构造器执行
// 子类初始化语句执行
// 子类构造器执行

class BaseInit {
    name = 'base'
    constructor() {
        console.log('My name is: ' + this.name)
    }
}

class DerivedInit extends BaseInit {
    name = 'derived'
}

// My name is: base
const di: DerivedInit = new DerivedInit()


// Inheriting Built-in Types SKIP~



// 成员可见性 （访问控制符）

// public : 默认取值 , public 属性任何地方都可以访问
class Member {
    public greet() {
        console.log('hi')
    }
}

const m = new Member()
m.greet()

// protected , 基类及子类可以访问
class Protected {
    protected greet() {
        console.log('hi')
    }
}

class DerivedProtected extends Protected {
    howdy() {
        // legal 
        this.greet()
    }

    // 子类可以将基类的protected 函数修改为 public (重写函数默认行为) 或者 protected 不变
    protected greet() {
        super.greet()
        console.log('hi hi ')
    }
}

const dp: DerivedProtected = new DerivedProtected()
// dp.greet() error


// 禁止访问声明为基类的protected属性
class BaseCross {
    protected x: number = 1
}

class Derived1 extends BaseCross {
    protected x: number = 2 
}

class Derived2 extends BaseCross {
    f1(other: Derived2) {
        other.x = 3
    }

    f2(other: Base) {
        // other.x = 5 // error
    }
}

// private , 只有类的内部可以访问
class BasePrivate {
    private x: number = 1
}

class DerivedPrivate extends BasePrivate {
    constructor() {
        super()
        // console.log(this.x) // error
    }
}

// TypeScript 允许访问跨实例的私有属性
class CrossInstance {
    private x: number = 10
    public equal(other: CrossInstance) {
        return this.x === other.x
    }
}

// private 和 protected 只是在类型检查中生效
// JavaScript in 关键字和 ['key'] 还是可以访问的
const ci = new CrossInstance()
for(let k in ci) console.log(k)



// 静态成员
class StaticMember {
    private static x: number = 0
    static printX() {
        console.log(StaticMember.x)
    }
}

StaticMember.printX()

// 静态成员不要起一些会覆盖 Function 原型链属性名字比如 name

// 静态成员不能使用泛型决定类型！



// this
// 要分清普通函数和箭头函数 this 绑定方式的差异
// 箭头函数不能使用 super 找到 （super 搜索的是原型链）

// 可以用this作为参数列表第一个以限制this指向的变量类型
class MyClass {
    name = 'MyClass'
    getName(this: MyClass) {
        return this.name
    }
}

const mc = new MyClass()
mc.getName() // legal

const windowThis = mc.getName
// windowThis() // error！


// this 作为返回类型 以及 参数类型
class Box {
    contents: string = ''

    set(value: string): this {
        this.contents = value
        return this
    }

    sameAs(other: this) {
        return this.contents === other.contents
    }
}

class ClearableBox extends Box {
    clear() {
        this.contents = ''
    }
}

const cBox: ClearableBox = new ClearableBox()
const res = cBox.set('good joe')
// type thisType = ClearableBox
type thisType = typeof res


// this is type guards SKIP



// 成员变量语法糖:
// 在构造器参数列表中带上 访问控制符 或者 readonly 
// 会创造同名的成员变量，并且赋一样的值
class ConstructCandy {
    constructor(
        public readonly x: number,
        protected y: string
    ) {
        // nothing
    }
}

const cc = new ConstructCandy(23 , 'joe')
cc.x // 23
// cc.y



// 抽象类 （拥有抽象函数的类）
abstract class BaseAbstarct {
    abstract getName(): string
    
    printName() {
        console.log(this.getName())
    }
}

// 继承抽象类需要实现抽象类中所有的抽象函数
class DerivedAbstarct extends BaseAbstarct {
    getName(): string {
        return 'good joe'
    }
}

// 抽象类不能 new 
// const ba = new BaseAbstarct() // error
const da = new DerivedAbstarct()
da.printName()



// 抽象构造标识符 new () => type
// 比如我们想接受一个 Base 类或 Base 的子类的构造函数
function greet(ctor: new () => Base) {
    const instance = new Base()
    console.log(instance.k)
}

// legal
greet(Base) , greet(Derived)



// 两个类之间的关系
// TypeScript 是通过结构来比较类的
class Person {
    name: string
    age: number
}

class Employee {
    name: string
    age: number
    salary: number
}

// 只要结构是满足类型的即可
// legal
const employee: Person = new Employee()



// 不要使用空的类!
// 因为任何类型都可以满足空的类型
class Empty {} // dont't use it!