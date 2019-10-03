---
layout: post
title: "Golang Useful function/code"
date: 2019-09-11
author: DonOfDen
tags: [golang, useful-code, function, code, Go]
description: Golang Useful function/code which I come accross
---

Here are some of the useful functions/code, I’ve gathered from my personal experiences with dealing Go code.

## Convert int8 to bool in golang

```go
// IntToBool returns bool for int
func IntToBool(i int) bool {
    if i == 1 {
        return true
    }
    return false
}
```

[Try in Go Playground](https://play.golang.org/p/NnQtF7487BW){:target="_blank"}

## Convert value to bool in golang

```go
// ValueToBool returns bool for interface
func ValueToBool(i interface{}) bool {
    if i == 1 {
        return true
    }
    return false
}
```

## Convert bool to unsigned integer in golang

[uint](https://golang.org/pkg/builtin/#uint){:target="_blank"}

```go
// ValueToBool returns bool for interface
func bool2int(a bool) uint64 {
    return *(*uint64)(unsafe.Pointer(&a)) & 1
}
```

[Try in Go Playground](https://play.golang.org/p/6vLWSnIDItA){:target="_blank"}


## Compare two slice elements and check if they are equal - IsSliceEqual 
```Go
// IsSliceEqual tells whether a and b contain the same elements. A nil argument is equivalent to an empty slice.
// Returns a boolean if data is available/not
func IsSliceEqual(a, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	for i, v := range a {
		if v != b[i] {
			return false
		}
	}
	return true
}
```
[Try in Go Playground](https://play.golang.org/p/1W0_dnGIhL1){:target="_blank"}