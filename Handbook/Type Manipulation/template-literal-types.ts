// 模板字面量类型

// 类似于 JavaScript 中的模板字符串，但是是针对类型
type World = 'world'
type Greeting = `hello ${World}`

// 模板配合联合类型实现两两组合:
type EmailLocaleIDs = 'welcome_email' | 'email_heading'
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff'

// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`



// String Union in Types  
/*
  考虑这种情况：
  通过一个函数: makeWatchedObject(obj: any) => void 
  为传入的对象 obj 添加一个 on 属性，
  同时 on 属性是一个函数，接收一个事件名 eventName , 以及一个处理该事件的 callback 参数，
  并且 callback 本身也是一个函数，接收一个 newValue 作为参数：
  on(eventName: string , callback: (newValue: any) => void): void
  eventName 需要对象 obj 的键名加上 'Changed' 后缀， newValue 的类型是对应键的类型
*/

// 通过使用 模板字面量类型 ， 我们可以为 on 指定健壮的类型约束:

// 版本一： 约束 eventName 为 string & 键名列表字符串联合类型  + Changed 后缀
// & 将几个类型组合成一个新类型，新类型拥有几个类型的方法和属性
type PropEventSource1<Type> = {
  on(eventName: `${string & keyof Type}Changed` , callback: (newValue: any)=> void): void
}

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource1<Type>

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
})

// legal
person.on('firstNameChanged' , () => {})

// error
// person.on('firstNameChang' , () => {})


// 版本二：
// 将eventName 和 callback中的参数都做约束
type PropEventSource2<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`, 
    callback:(newValue: Type[Key]) => void
  ): void
}

declare function makeWatchedObject2<Type>(obj: Type): Type & PropEventSource2<Type>

const person2 = makeWatchedObject2({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
})

person2.on('ageChanged' , newvalue => {
  console.log(typeof newvalue) // number
})



// 内置字符串操作类型
type Greet = 'hellO worlD'
type UpperGreet = Uppercase<Greet>

type LowerGreet = Lowercase<Greet>

type ASCIICacheKey<Str extends string> = `ID_${Uppercase<Str>}`
type MainID = ASCIICacheKey<Greet>

/*
首字母大写:
Capitalize<StringType>

首字母小写:
Uncapitalize<StringType>
*/