# Headers, Compilation & Linking

Chapter 1 closes by connecting two ideas you've already seen: the four-stage compilation pipeline from Lesson 2, and functions from Lesson 4. Real C++ programs are split across multiple files, and headers are the mechanism that lets code in one file use a function, class, or type declared in another. This lesson explains headers, the declaration/definition split, and the classic linker errors you'll eventually hit and need to debug.

## What you'll learn

- The difference between a declaration and a definition
- Why header files exist, and what belongs in a `.h` file vs. a `.cpp` file
- Include guards (`#pragma once`) and why they're necessary
- "Multiple definition" and "undefined reference" linker errors, and what each one actually means

## Declaration vs. definition

```cpp
// declaration — tells the compiler this function exists and its signature
double fair_value(double spot, double rate, double time);

// definition — actually provides the function body
double fair_value(double spot, double rate, double time) {
    return spot * (1.0 + rate * time);
}
```

A **declaration** tells the compiler "this name exists, here's its type/signature" without providing the implementation. A **definition** provides the actual implementation (a function body, or storage for a variable). Every definition is also a valid declaration, but not every declaration is a definition — this split is the entire reason headers work.

## Why header files exist

Suppose `pricer.cpp` defines `fair_value`, and `main.cpp` wants to call it. The compiler processes `main.cpp` as its own translation unit (Lesson 2) and has no idea `fair_value` exists unless it's told. A header file solves this by holding the **declaration**, which both files `#include`:

```cpp
// pricer.h
#pragma once

double fair_value(double spot, double rate, double time);
```

```cpp
// pricer.cpp
#include "pricer.h"

double fair_value(double spot, double rate, double time) {
    return spot * (1.0 + rate * time);
}
```

```cpp
// main.cpp
#include "pricer.h"
#include <iostream>

int main() {
    std::cout << fair_value(100.0, 0.05, 1.0) << "\n";
    return 0;
}
```

The rule of thumb: **declarations go in headers, definitions go in `.cpp` files** (with a few exceptions you'll meet later, like templates and `inline` functions, which must be visible in every translation unit that uses them). `main.cpp` and `pricer.cpp` are compiled into separate object files, and the linker connects the call in `main.o` to the definition in `pricer.o`.

## #pragma once and include guards

```cpp
// pricer.h
#pragma once   // ensures this file's contents are only processed once per translation unit

struct Trade {
    int id;
    double price;
};
```

If a header gets `#include`d more than once in the same translation unit (easy to happen indirectly, through other headers), the compiler would see the same declarations twice — for a `struct`, that's an error. `#pragma once`, placed at the top of every header, tells the preprocessor to skip the file's contents if it's already been included once. It's supported by every major compiler and is simpler than the older `#ifndef`/`#define`/`#endif` guard pattern you'll still see in some codebases.

## Classic linker errors

```
undefined reference to `fair_value(double, double, double)'
```

This means the linker found a *call* to `fair_value` but never found a *definition* of it in any object file being linked — usually because you forgot to compile/link `pricer.cpp`, or misspelled the function name, or the signature doesn't match exactly.

```
multiple definition of `fair_value(double, double, double)'
```

This means the linker found the *same* definition in more than one translation unit — commonly because a full function body was written directly in a header with no `#pragma once` issue at all, but included into two different `.cpp` files, each of which then defines it. The fix is almost always: move the definition into a single `.cpp` file, and leave only the declaration in the header.

## Key terms

| Term | Meaning |
|---|---|
| Declaration | Tells the compiler a name and its type/signature exist |
| Definition | Provides the actual implementation or storage |
| Header file | Holds declarations shared across multiple `.cpp` files |
| #pragma once | Preprocessor directive preventing a header's contents from being processed twice |

## Recap

Headers let one translation unit use something declared and defined in another, by sharing the declaration while the linker connects calls to their one true definition — and "undefined reference" and "multiple definition" errors are really just the linker telling you that split broke down somewhere. That closes Chapter 1. Next up, Chapter 2 begins with Lesson 6: The Stack, the Heap & Object Lifetime, where you'll learn exactly where in memory all of this data actually lives.
