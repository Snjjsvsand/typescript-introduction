// keyof 关键字

// keyof Type 返回的是由 Type 的属性的键名组成的字符串字面量联合类型
type Point = {
    x: number
    y: number
}

type P = keyof Point // 'x' | 'y'

let p: P = 'x'
p = 'y'
// p = 'z' // error

// 如果 Type 拥有字符串索引或者数字索引标识符
// 那么 keyof 返回的是他们的类型
type Arrayish = {
    [index: number]: any
}
type A = keyof Arrayish // number

// 由于 obj[0] 会被转化为 obj['0'] , 所以 typeof 字符串索引返回的是 string | number
type Mapish = {
    [key: string]: any
}
type M = keyof Mapish // string | number