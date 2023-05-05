// 映射类型

// 使用映射类型可以将已有类型映射为新的类型
// 例如将 Person 类型中所有属性映射为 boolean:
type Person = {
  name: string
  age: number
  gender: 'male' | 'female'
}

// 映射语法基于索引标识符
type MapToBoolean<T> = {
  [prop in keyof T]: boolean
}

/*
type BooleanPerson = {
  name: boolean;
  age: boolean;
  gender: boolean;
}
*/
type BooleanPerson = MapToBoolean<Person>

// 在映射时可以改变类型属性的 readonly 和 可选 状态
// 在原有的 readonly 和 ? 的前面加上 + / - 代表添加或删除属性的 readonly 和 ?
// 只写 readonly / ? 不写 +/- 代表添加
type LockedAccount = {
  readonly id: number
  readonly name: string
}

// 删除 readonly 并使属性可选
type Mutable<T> = {
  -readonly [prop in keyof T]?: T[prop]
}

type MutableAccount = Mutable<LockedAccount>


// TypeScript 4.1及以后，可以使用 as 关键字将键名也进行重新的映射
type CapitalGetter<Type> = {
  [prop in keyof Type as `get${Capitalize<prop & string>}`]: () => Type[prop]
}

type LazyPerson = CapitalGetter<Person>

type RemoveKindField<Type> = {
  [prop in keyof Type as Exclude<prop , 'kind'>]: Type[prop]
}

interface Circle {
  kind: 'circle'
  radius: number
}

type kindlessCircle = RemoveKindField<Circle>



// in 也可以作用于 unions 联合类型:

type EventConfig<Events extends {kind: string}> = {
  // 这里的 E 是 联合类型中的每个类型，而不是 keyof Type 
  [E in Events as E['kind']]: (event: E) => void
}

type SquareEvent = {
  kind: 'square',
  x: number,
  y: number
}

type CircleEvent = {
  kind: 'circle',
  radius: number
}

type Config = EventConfig<SquareEvent | CircleEvent>



// 映射配合条件类型
type ExtractPII<Type> = {
  [prop in keyof Type]: Type[prop] extends {pii: true} ? true : false
}

type DBFields = {
  id: {
    format: 'xxx'
  },
  name: {
    type: string,
    pii: true
  }
}

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>
