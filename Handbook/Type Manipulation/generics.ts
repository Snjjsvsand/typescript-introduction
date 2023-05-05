// 泛型

// 泛型函数
function identity<Type>(arg: Type): Type {
    return arg
}

// 通常在类型比较简单时我们可以使用隐式的类型推断:
const str = identity('joe')

// 在类型比较复杂时显示声明类型:
interface User {
    name: string
    age: number
    gender: string
}
const user: User = identity<User>({name: 'joe' , age: 23 , gender: 'male'})

// Type 默认代表接受所有的类型，如果想要 Type 接收有限的类型或者接受拥有某些属性的类型
// 要使用约束

// 1. 使用 [] 或 Array
function identityLength<Type>(arg: Type[]):Array<Type> {
    console.log(arg.length)
    return arg
}
// 2. 使用 extends
function identityLength2<Type extends {length: number}>(arg: Type): Type {
    console.log(arg.length)
    return arg
}



// 泛型类型
type IdentityFunc = <Type>(arg: Type) => Type
const myIdentity: IdentityFunc = function<Type> (arg: Type): Type {
    return arg
}
// 使用调用标识符
const myIdentity2: {
    <Type>(arg: Type): Type
} = identity

// 使用 interface 
interface GenericIdentityFunc {
    <Type>(arg: Type): Type
}
const myIdentity3: GenericIdentityFunc = identity

// 将泛型作为整个 interface 的参数
interface GenericIdentityFn<Type> {
    (arg: Type): Type
}
const myIdentity4: GenericIdentityFn<number> = identity



// 泛型类
// 注意类的静态成员不能使用泛型
class GenericNumber<NumberType> {
    zeroValue: NumberType
    add:(x: NumberType , y: NumberType) => NumberType
}
let myGenericNumber: GenericNumber<bigint> = new GenericNumber<bigint>()
myGenericNumber.zeroValue = 0n
myGenericNumber.add = (a , b) => a + b


// 在泛型的约束中使用类型参数
// keyof Type: 返回 Type 的所有属性的字符串字面量的联合类型
function getProperty<Type , Key extends keyof Type>(obj: Type , key: Key): Type[Key] {
    return obj[key]
}

let x = {a: 1 , b: 2 , c: 3}

getProperty(x , 'a')
getProperty(x , 'b')



// 在泛型中使用类类型
// 参数 c 必须是一个可以创建 Type 类型的构造函数:
function create<Type>(c: {new(): Type}): Type {
    return new c()
} 

class BeeKeeper {
    hasMask: boolean = true
}

class ZooKeeper {
    nameTag: string = 'mikle'
}

class Animal {
    numLegs: number = 4
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper()
}

class Loin extends Animal {
    keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal>(c: new() => A): A {
    return new c()
}

createInstance(Loin).keeper.nameTag
createInstance(Bee).keeper.hasMask