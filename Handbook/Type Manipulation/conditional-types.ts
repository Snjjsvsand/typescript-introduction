// 条件类型

interface Animal {
  live(): void
}
interface Dog extends Animal {
  woor(): void
}

type Example1 = Dog extends Animal ? number : string
type Example2 = RegExp extends Animal ? number : string


// 使用条件类型避免函数重载
interface IdLabel {
  id: number
}

interface NameLabel {
  name: string
}

function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: string | number): IdLabel | NameLabel
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  if(typeof nameOrId === 'number') return {id: nameOrId}
  else return {name: nameOrId}
}

type NameOrId<T extends string | number> = T extends number ? IdLabel : NameLabel

function createLabel2<T extends string | number>(nameOrId: T): NameOrId<T> {
  if(typeof nameOrId === 'number') return {id: nameOrId} as NameOrId<T>
  else return {name: nameOrId} as NameOrId<T>
}

const a = createLabel('joe') // a: NameLabel


// 使用约束配合条件类型
type MessageOf<T> = T extends {message: unknown} ? T['message'] : never
 
interface Email {
  message: string
}
interface Dog {
  bark(): void
}

type EmailMessage = MessageOf<Email>
type DogMessage = MessageOf<Dog>


type Flatten<T> = T extends any[] ? T[number] : T
type Str = Flatten<string[]>
type Str2 = Flatten<string>



// infer
// infer 关键字 ， 可以推导类型而不用显示指定
// 比如此处的 Item 可以被自动推导出来
type Flatten2<T> = T extends Array<infer Item> ? Item : T

type GetReturnType<T> = T extends (...args: never[]) => infer Return ? Return : never

type Num = GetReturnType<() => number>
type StringOrNum = GetReturnType<() => string | number>



// 分发条件类型
type ToArray<Type> = Type extends any ? Type[] : never

// 即 ToArray<string> | ToArray<number>
type StrArrOrNumArr = ToArray<string | number>


// 如果要阻止分发，比如想获得(string | number) []
// 需要在 extends两侧加上 []
type ToArrayNoDist<Type> = [Type] extends [any] ? Type[] : never

type StrArrOrNumArr2 = ToArrayNoDist<string | number>