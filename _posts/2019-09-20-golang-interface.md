---
layout: post
title: "Interface in Go"
date: 2019-09-20
author: DonOfDen
tags: [go, golang, Interface, pointers]
description: Only way to achieve Polymorphism in Go.
---

# Interface

- Only way to achieve Polymorphism in Go.
- An interface is a collection of method signatures that an Object can implement.

To create interface use interface keyword, followed by curly braces containing a list of method names, along with any parameters or return values the methods are expected to have.

![blog-head-image](/images/doc/golang-interface-1.png)

```Go
package main

import "fmt"

// Employee is an interface for printing employee details
type Employee interface {
	PrintName(name string)
	PrintSalary(basic int, tax int) int
}

// Emp user-defined type
type Emp int

// PrintName method to print employee name
func (e Emp) PrintName(name string) {
	fmt.Println("Employee Id:\t", e)
	fmt.Println("Employee Name:\t", name)
}

// PrintSalary method to calculate employee salary
func (e Emp) PrintSalary(basic int, tax int) int {
	var salary = (basic * tax) / 100
	return basic - salary
}

func main() {
	var e1 Employee
	e1 = Emp(1)
	e1.PrintName("John Doe")
	fmt.Println("Employee Salary:", e1.PrintSalary(25000, 5))
}
```
[Try in Go Playground](https://play.golang.org/p/tmT1cCZX7eo){:target="_blank"}

>> “if something can do this, then it can be used here”

>> if it walks like a duck, swims like a duck and quacks like a duck, then it’s a duck.

- Interface with Pointer

```Go
package main

import "fmt"

type Book struct {
	author, title string
}

type Magazine struct {
	title string
	issue int
}

func (b *Book) Assign(n, t string) {
	b.author = n
	b.title = t
}
func (b *Book) Print() {
	fmt.Printf("Author: %s, Title: %s\n", b.author, b.title)
}

func (m *Magazine) Assign(t string, i int) {
	m.title = t
	m.issue = i
}
func (m *Magazine) Print() {
	fmt.Printf("Title: %s, Issue: %d\n", m.title, m.issue)
}

type Printer interface {
	Print()
}

func main() {
	var b Book                                 // Declare instance of Book
	var m Magazine                             // Declare instance of Magazine
	b.Assign("Jack Rabbit", "Book of Rabbits") // Assign values to b via method
	m.Assign("Rabbit Weekly", 26)              // Assign values to m via method

	var i Printer // Declare variable of interface type
	fmt.Println("Call interface")
	i = &b    // Method has pointer receiver, interface does not
	i.Print() // Show book values via the interface
	i = &m    // Magazine also satisfies shower interface
	i.Print() // Show magazine values via the interface
}
```
[Try in Go Playground](https://play.golang.org/p/ANC3HYVZjfr){:target="_blank"}

## Polymorphism

- Polymorphism is the ability to write code that can take on different behavior through the implementation of types.

```Go
package main

import (
	"fmt"
)

// Geometry is an interface that defines Geometrical Calculation
type Geometry interface {
	Edges() int
}

// Pentagon defines a geometrical object
type Pentagon struct{}

// Hexagon defines a geometrical object
type Hexagon struct{}

// Octagon defines a geometrical object
type Octagon struct{}

// Decagon defines a geometrical object
type Decagon struct{}

// Edges implements the Geometry interface
func (p Pentagon) Edges() int { return 5 }

// Edges implements the Geometry interface
func (h Hexagon) Edges() int { return 6 }

// Edges implements the Geometry interface
func (o Octagon) Edges() int { return 8 }

// Edges implements the Geometry interface
func (d Decagon) Edges() int { return 10 }

// Parameter calculate parameter of object
func Parameter(geo Geometry, value int) int {
	num := geo.Edges()
	calculation := num * value
	return calculation
}

// main is the entry point for the application.
func main() {
	p := new(Pentagon)
	h := new(Hexagon)
	o := new(Octagon)
	d := new(Decagon)

	g := [...]Geometry{p, h, o, d}

	for _, i := range g {
		fmt.Println(Parameter(i, 5))
	}
}
```
[Try in Go Playground](https://play.golang.org/p/0l5UocZLOPl){:target="_blank"}

- Interface Embedding
- Empty Interface Type

```Go
package main

import "fmt"

func printType(i interface{}) {
	fmt.Println(i)
}

func main() {
	var manyType interface{}
	manyType = 100
	fmt.Println(manyType)

	manyType = 200.50
	fmt.Println(manyType)

	manyType = "Germany"
	fmt.Println(manyType)

	printType("Go programming language")
	var countries = []string{"india", "japan", "canada", "australia", "russia"}
	printType(countries)

	var employee = map[string]int{"Mark": 10, "Sandy": 20}
	printType(employee)

	country := [3]string{"Japan", "Australia", "Germany"}
	printType(country)
}
```
[Try in Go Playground](https://play.golang.org/p/MCJewCz4rXa){:target="_blank"}
