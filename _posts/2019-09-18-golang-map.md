---
layout: post
title: "Map vs Slice vs Array"
date: 2019-09-20
author: DonOfDen
tags: [go, golang, map, array, slice, range]
description: An Intro to Go Map
---

# Map vs Slice vs Array

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
