// typeof 类型关键字

// 使用 typeof 可以获得变量的类型:
let s = 'hello'
let t: typeof s // t: string

// 比如， ReturnType<T> 用于提取出函数类型的返回值类型
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate>

// 但是如果我们只有一个函数本身，而没有ts的函数类型声明：
function fn() {
    return {
        x: 10,
        y: 20
    }
}
// type P = ReturnType<fn> // error

// 那么我们可以使用 typeof 获得函数的类型
type FuncReturnedType = ReturnType<typeof fn>