---
layout: post
title: "Array vs Slice vs Map"
date: 2019-09-20
author: DonOfDen
tags: [go, golang, map, array, slice, range, map]
description: An Intro to Go Map
---

# Array vs Slice vs Map

## Array

![blog-head-image](/images/doc/golang-array-1.png)

- Arrays hold collections of values that all share the same type.
- Index start with `0`

Array Type Example:

```Go
// Aray of String
var myStringArray [2]string
myStringArray[0] = "Hey, "
myStringArray[1] = "You!"

// Integer Array
var myIntegerArray [2]int
myIntegerArray[0] = 1
myIntegerArray[1] = 2

// Time Array
var dates [1]time.Time
// Assign values
dates[0] = time.Unix(1257894000,0)
```

### Zero values in arrays

![blog-head-image](/images/doc/golang-array-2.png)
![blog-head-image](/images/doc/golang-array-3.png)

_Fun Stuff_

```Go
var counters [3]int
counters[0]++
```
## Array literals

If you know in advance what values an array should hold, you can initialize the array with those values using an array literal.

![blog-head-image](/images/doc/golang-array-4.png)

```Go
package main

import "fmt"

func main() {
	intArray := [...]int{10, 20, 30, 40, 50}

	fmt.Println("\n---------------Example 1--------------------\n")
	for i := 0; i < len(intArray); i++ {
		fmt.Println(intArray[i])
	}

	fmt.Println("\n---------------Example 2--------------------\n")
	for index, element := range intArray {
		fmt.Println(index, "=>", element)

	}

	fmt.Println("\n---------------Example 3--------------------\n")
	for _, value := range intArray {
		fmt.Println(value)
	}

	j := 0
	fmt.Println("\n---------------Example 4--------------------\n")
	for range intArray {
		fmt.Println(intArray[j])
		j++
	}
}
```

[Try in Go Playground](https://play.golang.org/p/Yurk4wvvfmy){:target="_blank"}

[So far OK! Lets Answer this!](https://play.golang.org/p/zf-yLTZbDYp){:target="_blank"}

## Slice

![blog-head-image](/images/doc/golang-slice-1.png)

- A slice is like an array which is a container to hold elements of the same data type but slice can vary in size.
- slice is a **composite data type** and because it is composed of primitive data type.
- slice is a reference to an array. (slice when needed to store more data, creates a new array of appropriate length behind the scene to accommodate more data.)

## Slice Literal

- Just like with arrays, if you know in advance what values a slice will start with, you can initialize the slice with those values using a slice literal

![blog-head-image](/images/doc/golang-slice-2.png)

- `[start:end]` extract operator

```Go
package main

import "fmt"

func main() {
	s := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	
	fmt.Println("s", s)
	fmt.Println("s[:]", s[:])
	fmt.Println("s[2:]", s[2:])
	fmt.Println("s[:4]", s[:4])
	fmt.Println("s[2:4]", s[2:4])
}
```
[Try in Go Playground](https://play.golang.org/p/KlgFws4r_vb){:target="_blank"}

### The slice operator

- Every slice is built on top of an underlying array. It’s the underlying array that actually holds the slice’s data; the slice is merely a view into some (or all) of the array’s elements.

- Change the underlying array, change the slice

[Try in Go Playground](https://play.golang.org/p/1naC_0qQz_E){:target="_blank"}

[Try in Go Playground](https://play.golang.org/p/qKtVAka498Z){:target="_blank"}

## MAPs
![blog-head-image](/images/doc/golang-map-1.png)

- We can use any type in map index, Whereas arrays and slices can only use __integers__ as indexes, a map can use any type for a keys (As long as values of that type can be compared using ==).

- The values & Keys all have to be of same type. But keys and values dont have to be the same type.

Slice &  Map use Make function.

### Syntax

![blog-head-image](/images/doc/golang-map-2.png)

Short Variable Declaration

![blog-head-image](/images/doc/golang-map-3.png)

## Map literals

![blog-head-image](/images/doc/golang-map-4.png)

```Go
package main

import (
	"fmt"
)

func main() {
	// Map
	fmt.Println(" Map")
	m := make(map[string]int)
	m["one"] = 12
	m["two"] = 05

	fmt.Println("Map: ", m)

	for key, value := range m {
		fmt.Println("key:", key, " value:", value)
	}

	// Length Of Map
	len := len(m)
	fmt.Println("Length: ", len)

	// Map Literal
	fmt.Println("\n Map Literal")
	ranks := map[string]int{"bronze": 3, "silver": 2, "gold": 1}
	fmt.Println("Map Literal: ", ranks)
	fmt.Println(ranks["gold"])
	fmt.Println(ranks["silver"])

	for key, value := range ranks {
		fmt.Println("key:", key, " value:", value)
	}
	// Zero Values within maps
	fmt.Println("\n Zero Values within maps: ", ranks["iron"])
	value, ok := ranks["iron"]
	//value, ok := ranks["gold"]
	if !ok {
		fmt.Println("\nThere is no such key as 'iron' in map")
	} else {
		fmt.Println("\nValue: ", value)
	}

	elements := map[string]string{
		"H":  "Hydrogen",
		"Li": "Lithium",
	}
	fmt.Println("\nMap Literal: ", elements)
	for key, value := range elements {
		fmt.Println("key:", key, " value:", value)
	}

	fmt.Println("\n Map - Delete: Li")

	delete(elements, "Li")
	for key, value := range elements {
		fmt.Println("key:", key, " value:", value)
	}
}
```

[Try in Go Playground](https://play.golang.org/p/O88h1wQ8sLf){:target="_blank"}

### Using for..range loops with maps

![blog-head-image](/images/doc/golang-map-5.png)

## Array

![blog-head-image](/images/doc/golang-array-1.png)

## Slice

![blog-head-image](/images/doc/golang-slice-1.png)

## Array & Slice

![blog-head-image](/images/doc/golang-array-slice.png)

## Difference between map and slice in terms of performance.

<details>
  <summary>Click to expand!</summary>

## Difference between map[int]bool and []bool in terms of performance.

```Go

package main

import (
	"fmt"
	"time"
)

// Difference between map[int]bool, and []bool in terms of performance.
func main() {
	// function that sums up the proper divisors of a number:
	mapFun()
	sliceFun()
}

func divisorsSum(n int) int {
	sum := 1
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			if n/i != i {
				sum += n / i
			}
		}
	}
	return sum
}

func mapFun() {
	// Map
	start := time.Now()
	defer func() {
		elapsed := time.Since(start)
		fmt.Printf(" Map - Time: %s\n", elapsed)
	}()

	n := 28123
	abundant := []int{}
	for i := 12; i <= n; i++ {
		if divisorsSum(i) > i {
			abundant = append(abundant, i)
		}
	}

	sums := map[int]bool{}
	for i := 0; i < len(abundant); i++ {
		for j := i; j < len(abundant); j++ {
			if abundant[i]+abundant[j] > n {
				break
			}
			sums[abundant[i]+abundant[j]] = true
		}
	}

	sum := 0
	for i := 1; i <= 28123; i++ {
		if _, ok := sums[i]; !ok {
			sum += i
		}
	}
	fmt.Println(sum)
}

func sliceFun() {
	// slice
	startSlice := time.Now()
	defer func() {
		elapsed := time.Since(startSlice)
		fmt.Printf(" Slice - Time: %s\n", elapsed)
	}()

	nSlice := 28123
	abundantSlice := []int{}
	for i := 12; i <= nSlice; i++ {
		if divisorsSum(i) > i {
			abundantSlice = append(abundantSlice, i)
		}
	}
	sumsSlice := make([]bool, nSlice)
	for i := 0; i < len(abundantSlice); i++ {
		for j := i; j < len(abundantSlice); j++ {
			if abundantSlice[i]+abundantSlice[j] < nSlice {
				sumsSlice[abundantSlice[i]+abundantSlice[j]] = true
			} else {
				break
			}
		}
	}
	sumSlice := 0
	for i := 0; i < len(sumsSlice); i++ {
		if !sumsSlice[i] {
			sumSlice += i
		}
	}
	fmt.Println(sumSlice)
}

```
The above code will output something sililar tot he following:

```
4179871
 Map - Time: 360.206747ms
4179871
 Slice - Time: 43.404627ms
```
</details>
