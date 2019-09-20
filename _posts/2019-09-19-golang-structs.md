---
layout: post
title: "Structs in Go"
date: 2019-09-20
author: DonOfDen
tags: [go, golang, Structs]
description: An Intro to Go Structs, Unlike traditional Object-Oriented Programming, Go does not have class-object architecture. Rather we have structures which hold complex data structures.
---

# Structs

- Unlike traditional Object-Oriented Programming, Go does not have class-object architecture. Rather we have structures which hold complex data structures.

- We learned about slices, which store a list of values. Then we learned about maps, which map a list of keys to a list of values. But both of these data structures can only hold values of one type. Sometimes, you need to group together values of several types. 

![blog-head-image](/images/doc/golang-structs-1.png)

```Go
type Employee struct{
	name   string
	id     int
	toggle bool
}
```

- Access struct fields using the dot operator (struct.field)

```Go
package main

import "fmt"

type Employee struct {
	name   string
	id     int
	toggle bool
}

func main() {
	// creating a struct
	var listOne Employee
	fmt.Println(listOne)

	// Access struct fields using the dot operator
	fmt.Println("Access struct fields using the dot operator list.id = ", listOne.id)

	// Assigning values to Structs using the dot operator
	listOne.name = "Aravind"
	listOne.id = 10
	listOne.toggle = true
	fmt.Println(listOne)

	// create a struct with field values initialized in the same syntax.
	// shorthand notation :=
	listTwo := Employee{
		toggle: true,
		name:   "Vijay",
		id:     12,
	}
	fmt.Println(listTwo)

	listThree := Employee{"Parthiban", 14, true}
	fmt.Println(listThree)
}
```

[Try in Go Playground](https://play.golang.org/p/X2xr5JPP_E9){:target="_blank"}

## Nested struct

A struct field can also be a struct. A nested struct is a struct that is a field of another struct.

```Go
package main

import "fmt"

// Promoted fields
type Team struct {
	name string
}

type Department struct {
	name string
	id   int
}

type Employee struct {
	name       string
	id         int
	department Department
	Team
}

func main() {
	// create a struct with field values initialized in the same syntax.
	// shorthand notation :=
	list := Employee{
		name:       "Venkat",
		id:         12,
		department: Department{"GIBS", 26},
		Team:       Team{"Awesome"},
	}
	fmt.Println(list)
	fmt.Println(list.name)
	fmt.Println(list.department.name)
	// Promoted fields
	fmt.Println(list.Team.name)
}
```
[Try in Go Playground](https://play.golang.org/p/XOmdBJGZVSE){:target="_blank"}

- struct comparison

## Types

```Go
bool
string

Numeric types:

uint        either 32 or 64 bits
int         same size as uint
uintptr     an unsigned integer large enough to store the uninterpreted bits of
            a pointer value
uint8       the set of all unsigned  8-bit integers (0 to 255)
uint16      the set of all unsigned 16-bit integers (0 to 65535)
uint32      the set of all unsigned 32-bit integers (0 to 4294967295)
uint64      the set of all unsigned 64-bit integers (0 to 18446744073709551615)

int8        the set of all signed  8-bit integers (-128 to 127)
int16       the set of all signed 16-bit integers (-32768 to 32767)
int32       the set of all signed 32-bit integers (-2147483648 to 2147483647)
int64       the set of all signed 64-bit integers
            (-9223372036854775808 to 9223372036854775807)

float32     the set of all IEEE-754 32-bit floating-point numbers
float64     the set of all IEEE-754 64-bit floating-point numbers

complex64   the set of all complex numbers with float32 real and imaginary parts
complex128  the set of all complex numbers with float64 real and imaginary parts

byte        alias for uint8
rune        alias for int32 (represents a Unicode code point)
```
Note, `byte` is a built-in alias of `uint8`, and `rune` is a built-in alias of `int32`. We can also declare custom type aliases.

Composite Types:

- `pointer types`
- `struct types`
- `function types`
- `container types` (Array, Slice, Map)
- `channel types`
- `interface types`

```Go
*T         // a pointer type
[5]T       // an array type
[]T        // a slice type
map[Tkey]T // a map type
// The following new defined and source types
// are all basic types.
type (
	MyInt int
	Age   int
	Text  string
)

// The following new defined and source types are
// all composite types.
type IntPtr *int
type Book struct{author, title string; pages int}
type Convert func(in0 int, in1 bool)(out0 int, out1 string)
type StringArray [5]string
type StringSlice []string

func f() {
	// The names of the three defined types
	// can be only used within the function.
	type PersonAge map[string]int
	type MessageQueue chan string
	type Reader interface{Read([]byte) int}
}
```

## Defined 

Type Declaration: Which we discussed in Structs.

![blog-head-image](/images/doc/golang-type-1.png)

Defining Methods:

![blog-head-image](/images/doc/golang-type-2.png)

```Go
package main

import "fmt"

type Person struct {
	name string
	id   int
	city string
}

//A person method
func (p Person) SayHello() {
	fmt.Printf("Hi, I am %s, from %s.\n", p.name, p.city)
}

//A person method
func (p Person) GetDetails() {
	fmt.Printf("[Name: %s, Age: %d, City: %s]\n", p.name, p.id, p.city)
}

func main() {
	// create a struct with field values initialized in the same syntax.
	// shorthand notation :=
	list := Person{
		name: "Aravind",
		id:   12,
		city: "Chennai",
	}
	list.SayHello()
	list.GetDetails()
}
```

[Try in Go Playground](https://play.golang.org/p/z87Tz6FfING){:target="_blank"}

## Pointers in Golang

- Pointers in Go programming language or Golang is a variable which is used to store the memory address of another variable.
- Pointers in Golang is also termed as the special variables.
- Call by reference.

`*` and `&`

`*` - used to declare pointer variable and access the value stored in the address.

`&` - used to returns the address of a variable or to access the address of a variable to a pointer.

![blog-head-image](/images/doc/golang-pointer-1.jpg)

```Go
package main

import "fmt"

func main() {

	// taking a normal variable
	var x int = 5748

	// declaration of pointer
	var p *int

	// initialization of pointer
	p = &x

	// displaying the result
	fmt.Println("Value stored in x = ", x)
	fmt.Println("Address of x = ", &x)
	fmt.Println("Value stored in variable p = ", p)
	fmt.Println("Value stored in variable p = ", *p)

	// using := operator to declare
	// and initialize the variable
	y := 458

	// taking a pointer variable using
	// := by assigning it with the
	// address of variable y
	pointer := &y

	fmt.Println("Value stored in y = ", y)
	fmt.Println("Address of y = ", &y)
	fmt.Println("Value stored in pointer variable pointer = ", pointer)
	*pointer = 500

	fmt.Println("Value stored in y(*pointer) after Changing = ", y)

}
```
[Try in Go Playground](https://play.golang.org/p/Oqi6V8bbFXD){:target="_blank"}

Some Additional Example with Methods

- A method in Go is simply a function that is declared with a receiver. If you want to modify the data of a receiver from the method, the receiver must be a pointer as shown below.

[Try in Go Playground](https://play.golang.org/p/kKAU9KwJ3xJ){:target="_blank"}

## Why pointers?

- One way to use pointers over variables is to eliminate duplicate memory required. For example, if you have some large complex object, you can use a pointer to point to that variable for each reference you make. With a variable, you need to duplicate the memory for each copy.
