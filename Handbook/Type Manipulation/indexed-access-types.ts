// 索引访问类型

// 索引访问类型可以用来查看某个类型中具体属性的类型
type Person = {
  name: string
  age: number
  gender: string
  alive: boolean
}
// number
type Age = Person['age']

// 可以使用联合类型或者keyof
type I1 = Person['age' | 'gender']
type I2 = Person[keyof Person]

type AliveOrName = 'alive' | 'name'
type I3 = Person[AliveOrName]

// 无法用索引访问一个不存在的属性
// type I4= Person['alve'] // error



// 可以用 number 和 typeof 关键字获取数组的一个元素的类型
const MyArray = [
  {
    name: 'Alice',
    age: 23
  },
  {
    name: 'Bob',
    age: 24,
    alive: true
  }
]

type Person2 = typeof MyArray[number]
type Age2 = typeof MyArray[number]['age']

// 不可以使用变量作为索引访问类型

// error
// const key = 'age'
// type Age3 = Person[key]

// 可以使用 type
type key = 'age'
type Age3 = Person[key]