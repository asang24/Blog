---
description: study notes about golang.
keywords: [go,golang]
---

# [Golang] 学习笔记

-   Go语言圣经 https://golang-china.github.io/gopl-zh/index.html
-   Go语言设计与实现 https://draveness.me/golang/
-   Go语言高级编程 https://chai2010.cn/advanced-go-programming-book/index.html



## 指针

> [指针理解](https://c.biancheng.net/view/21.html)

要明白指针，需要知道几个概念：**指针地址、指针类型、指针取值**

在变量名前面添加&操作符（前缀）来获取变量的内存地址（取地址操作）

- **&** 取地址操作
- **\*** 取值操作

变量、指针和地址三者的关系是，每个变量都拥有地址，指针的值就是地址。

```go
	str := "hello world"

	// 对字符串取地址, ptr类型为*string
	ptr := &str															// ptr为指针变量
	fmt.Printf("ptr typr is : %T\n ", ptr)  // ptr typr is : *string

	// 打印ptr的指针地址
	fmt.Printf("address: %p\n", ptr) 				// address: 0x14000112020

	// 对指针进行取值操作
	value := *ptr
	fmt.Printf("value type: %T\n", value) // value type: string

	// 指针取值后就是指向变量的值
	fmt.Printf("value: %s\n", value) // value: hello world
```

变量、指针地址、指针变量、取地址、取值的相互关系和特性如下：

- 对变量进行取地址操作使用`&`操作符，可以获得这个变量的指针变量。
- 指针变量的值是指针地址。
- 对指针变量进行取值操作使用`*`操作符，可以获得指针变量指向的原变量的值

```go
x := 1
p := &x                       // 取地址操作
fmt.Printf("type is : %T", p) // 指针变量 type is : *int
fmt.Println(*p)               // 取值操作 "1"
*p = 2                        //  修改指针指向的值
fmt.Println(x)                // "2"
```



## 函数、闭包、递归

### 匿名函数

```go
// 具名函数
func Add(a, b int) int {
    return a+b
}

// 匿名函数
var Add = func(a, b int) int {
    return a+b
}
```

匿名函数可`赋值给变量`，做为`结构字段`，或者在` channel` 里传送

```go
package main

func main() {
    // --- function variable ---
    fn := func() { println("Hello, World!") }
    fn()
  
    // --- function collection ---
    fns := [](func(x int) int){
        func(x int) int { return x + 1 },
        func(x int) int { return x + 2 },
    }
    println(fns[0](100))

    // --- function as field ---
    d := struct {
        fn func() string
    }{
        fn: func() string { return "Hello, World!" },
    }
    println(d.fn())

    // --- channel of function ---
    fc := make(chan func() string, 2)
    fc <- func() string { return "Hello, World!" }
    println((<-fc)())
}
```



### defer

defer语句被用于预定对一个函数的调用。可以把这类被defer语句调用的函数称为延迟函数。

作用：

-   释放占用的资源
-   捕捉处理异常
-   输出日志

如果一个函数中有多个defer语句，它们会以**LIFO（后进先出）**的顺序执行。

```go
func Inc() (v int) {
    defer func(){ v++ } ()
    return 42
}
```

`defer` 语句延迟执行了一个匿名函数，因为这个匿名函数捕获了外部函数的局部变量 `v`，这种函数我们一般叫**闭包**。闭包对捕获的外部变量并不是传值方式访问，而是以引用的方式访问。**闭包复制的是原对象指针，这就很容易解释延迟引用现象**

```go
func main() {
    for i := 0; i < 3; i++ {
        defer func(){ println(i) } ()
    }
}
// Output:
// 3
// 3
// 3
```

因为是闭包，在 `for` 迭代语句中，每个 `defer` 语句延迟执行的函数引用的都是同一个 `i` 迭代变量，在循环结束后这个变量的值为 3，因此最终输出的都是3。

```go
// 修复
func main() {
    for i := 0; i < 3; i++ {
        i := i // 定义一个循环体内局部变量 i
        defer func(){ println(i) } ()
    }
}
func main() {
    for i := 0; i < 3; i++ {
        // 通过函数传入 i
        // defer 语句会马上对调用参数求值
        defer func(i int){ println(i) } (i)
    }
}
```

>   一般来说,在 `for` 循环内部执行 `defer` 语句并不是一个好的习惯

### 闭包Closure







## 数组

数组是一个由固定长度的特定类型元素组成的序列

定义方式：

```go
var a [3]int                    // 定义长度为 3 的 int 型数组, 元素全部为 0
var b = [...]int{1, 2, 3}       // 定义长度为 3 的 int 型数组, 元素为 1, 2, 3
var c = [...]int{2: 3, 1: 2}    // 定义长度为 3 的 int 型数组, 元素为 0, 2, 3
var d = [...]int{1, 2, 4: 5, 6} // 定义长度为 6 的 int 型数组, 元素为 1, 2, 0, 0, 5, 6
// 4: 5 代表 index: value; index为4的时候,value为5
```

Go 语言中数组是值语义。

**为了避免复制数组带来的开销，可以传递一个指向数组的指针，但是数组指针并不是数组。**

数组的长度是数组类型的组成部分,**不同长度数组的数组指针类型也是完全不同的**

```go
var a = [...]int{1, 2, 3} // a 是一个数组
var b = &a                // b 是指向数组的指针

fmt.Println(a[0], a[1])   // 打印数组的前 2 个元素
fmt.Println(b[0], b[1])   // 通过数组指针访问数组元素的方式和数组类似

for i, v := range b {     // 通过数组指针迭代数组的元素
    fmt.Println(i, v)
}
```

## 切片 Slice

[学习]: https://chai2010.cn/advanced-go-programming-book/ch1-basic/ch1-03-array-string-and-slice.html

切片就是一种**动态数组**

切片的结构定义，`reflect.SliceHeader`:

```go
type SliceHeader struct {
    Data uintptr
    Len  int
    Cap  int
}
```

定义切片的方式：

```go
var (
    a []int               // nil 切片, 和 nil 相等, 一般用来表示一个不存在的切片
    b = []int{}           // 空切片, 和 nil 不相等, 一般用来表示一个空的集合
    c = []int{1, 2, 3}    // 有 3 个元素的切片, len 和 cap 都为 3
  	// :2 从index 0到1 的位置截取c, 但d仍指向c的地址,仍继承c的cap
    d = c[:2]             // 有 2 个元素的切片, len 为 2, cap 为 3
    e = c[0:2:cap(c)]     // 有 2 个元素的切片, len 为 2, cap 为 3
    f = c[:0]             // 有 0 个元素的切片, len 为 0, cap 为 3
    g = make([]int, 3)    // 有 3 个元素的切片, len 和 cap 都为 3
    h = make([]int, 2, 3) // 有 2 个元素的切片, len 为 2, cap 为 3
    i = make([]int, 0, 3) // 有 0 个元素的切片, len 为 0, cap 为 3
)
```

新切片的容量：

>   写这个的原因是刚开始学的时候没弄清楚新切片的容量规则，太笨了…

```go
a := []int{2, 3, 5, 7}
lenth := len(a)
for i := 0; i < lenth; i++ {
		n := a[i:lenth]	// 新切片
		fmt.Printf("when index is: %v, new slice cap is :%v, len is : %v, slice is: %v \n", i, cap(n), len(n), n)
}
// n:=a[0:4]   when index is: 0, new slice cap is :4, len is :4, slice is: [2 3 5 7]
// n:=a[1:4]   when index is: 1, new slice cap is :3, len is :3, slice is: [3 5 7] 
// n:=a[2:4]   when index is: 2, new slice cap is :2, len is :2, slice is: [5 7] 
// n:=a[3:4]   when index is: 3, new slice cap is :1, len is :1, slice is: [7] 

// n:=a[0:3]   when index is: 0, new slice cap is :4, len is :3, slice is: [2 3 5]
// n:=a[1:3]   when index is: 1, new slice cap is :3, len is :2, slice is: [3 5]
// n:=a[2:3]   when index is: 2, new slice cap is :2, len is :1, slice is: [5] 
// n:=a[3:3]   when index is: 3, new slice cap is :1, len is :0, slice is: []

// 可以看出新的切片 n[first_i:last_i],其容量为原切片容量值 减 first_i
```

切片中 `Cap` 成员表示切片指向的内存空间的最大容量（`对应元素的个数`，而不是字节数）

下图是 `x := []int{2,3,5,7,11}` 和 `y := x[1:3]` 两个切片对应的内存结构。

<img src="https://cdn.jsdelivr.net/gh/asang24/blog-img/go/202404111642800.png" alt="slice"  width="100%" />

### 添加切片元素

内置的泛型函数 `append` 可以在切片的尾部追加 `N` 个元素：

```go
var a []int
a = append(a, 1)               // 追加 1 个元素
a = append(a, 1, 2, 3)         // 追加多个元素, 手写解包方式
a = append(a, []int{1,2,3}...) // 追加 1 个切片, 切片需要解包
```

在容量不足的情况下，``append` 的操作会导致重新分配内存。即使容量足够， `append` 函数的返回值会更新切片本身，因为新切片的长度发生变化。

`append`在切片的开头添加元素：

```go
var a = []int{1,2,3}
a = append([]int{0}, a...)        // 在开头添加 1 个元素 [0 1 2 3]
a = append([]int{-3,-2,-1}, a...) // 在开头添加 1 个切片 [-3 -2 -1 0 1 2 3]
```

在开头append一般都会导致内存的重新分配，而且会导致已有的元素全部复制 1 次。因此，从切片的开头添加元素的性能一般要比从尾部追加元素的性能差很多。

切片中间插入元素：

```go
var a []int
a = append(a[:i], append([]int{x}, a[i:]...)...)     // 在第 i 个位置插入 x
a = append(a[:i], append([]int{1,2,3}, a[i:]...)...) // 在第 i 个位置插入切片
```

### 删除切片元素

从尾部删除：

```go
a = []int{1, 2, 3}
a = a[:len(a)-1]   // 删除尾部 1 个元素
a = a[:len(a)-N]   // 删除尾部 N 个元素
```

从开头删除：

```go
a = []int{1, 2, 3}
a = a[1:] // 删除开头 1 个元素
a = a[N:] // 删除开头 N 个元素
```

从中间删除：

```go
a = []int{1, 2, 3, ...}
a = append(a[:i], a[i+1:]...) // 删除中间 1 个元素
a = append(a[:i], a[i+N:]...) // 删除中间 N 个元素

a = a[:i+copy(a[i:], a[i+1:])]  // 删除中间 1 个元素
a = a[:i+copy(a[i:], a[i+N:])]  // 删除中间 N 个元素
```

### 避免切片内存泄漏

删除切片元素时可能会遇到,假设切片里存放的是指针对象，那么下面删除末尾的元素后，被删除的元素依然被切片底层数组引用,从而导致不能及时被自动垃圾回收器回收（这要依赖回收器的实现方式）：

```go
var a []*int{ ... }
a = a[:len(a)-1]    // 被删除的最后一个元素依然被引用, 可能导致 GC 操作被阻碍
```

保险的方式是先将需要自动内存回收的元素设置为 `nil`，保证自动回收器可以发现需要回收的对象，然后再进行切片的删除操作：

```go
var a []*int{ ... }
a[len(a)-1] = nil // GC 回收最后一个元素内存
a = a[:len(a)-1]  // 从切片删除最后一个元素
```

当然，如果切片存在的周期很短的话，可以不用刻意处理这个问题。因为如果切片本身已经可以被 GC 回收的话，切片对应的每个元素自然也就是可以被回收的了。



## gotests 使用

```go
$ go get -u github.com/cweill/gotests/...

// add gopath/bin to zshrc
// in path: Project_Go/ollama-gin/config 
gotests -all -w config.go 
// will generate all test func in new file named config_test.go
```

