# Lambdas & Functional Style

`std::sort` needs to know *how* to compare two elements, and writing a separate named function for every one-off comparison gets tedious fast. **Lambdas** — anonymous, inline functions — let you write that comparison exactly where you use it, often capturing variables from the surrounding scope. They're the glue between the containers and algorithms you've just learned and the custom logic your actual trading code needs.

## What you'll learn

- Lambda syntax: capture list, parameters, body, and return type
- Capturing by value (`[x]`) vs. by reference (`[&x]`), and why it matters
- Using lambdas as predicates with `std::sort`, `std::find_if`, and `std::count_if`
- `std::function` for storing a callable, and generic lambdas (C++14/20)

## Lambda syntax

A lambda is `[captures](parameters) -> returnType { body }`; the return type is usually omitted and deduced.

```cpp
auto square = [](double x) { return x * x; };
double result = square(4.0);   // 16.0
```

The `[]` is the **capture list** — it controls which variables from the enclosing scope the lambda can use inside its body.

## Capturing by value vs. by reference

`[x]` captures a *copy* of `x` as it was when the lambda was created; `[&x]` captures a *reference*, so later changes to `x` are visible inside the lambda.

```cpp
double threshold = 100.0;
auto aboveThreshold = [threshold](double price) { return price > threshold; };
// threshold captured by value — a later change to `threshold` doesn't affect this lambda

auto& runningTotal = ...;  // suppose this is a double&
auto addToTotal = [&runningTotal](double px) { runningTotal += px; };
// captures by reference specifically to mutate the caller's variable
```

`[=]` captures everything used by value; `[&]` captures everything used by reference — prefer naming captures explicitly (`[threshold]`) over the blanket forms, since it documents exactly what the lambda depends on.

## Lambdas as predicates for STL algorithms

Most STL algorithms that take a "how to compare/test" argument are designed to accept a lambda directly, with no separate named function required.

```cpp
#include <algorithm>
#include <vector>

std::vector<double> prices{101.25, 99.80, 103.10, 97.50};

std::sort(prices.begin(), prices.end(),
          [](double a, double b) { return a > b; });   // descending order

auto it = std::find_if(prices.begin(), prices.end(),
                        [](double p) { return p > 100.0; });

int count = std::count_if(prices.begin(), prices.end(),
                           [](double p) { return p > 100.0; });
```

## Storing a lambda: `std::function` and `auto`

`auto` is the right type for a lambda stored immediately in a local variable. When you need to store a callable as a class member, pass it around, or support swapping in different callables of the same signature, use `std::function<ReturnType(Args...)>`.

```cpp
#include <functional>

std::function<bool(double)> filter = [](double p) { return p > 100.0; };

void applyFilter(const std::vector<double>& prices, std::function<bool(double)> f) {
    for (double p : prices) if (f(p)) std::cout << p << "\n";
}
```

C++14 also allows **generic lambdas** using `auto` parameters, letting one lambda work across multiple types, much like a template.

```cpp
auto printIt = [](const auto& x) { std::cout << x << "\n"; };
printIt(101.25);
printIt(std::string("AAPL"));
```

## Key terms

| Term | Meaning |
|---|---|
| Lambda | An anonymous, inline function value: `[captures](params) { body }` |
| Capture list | `[]` — specifies which outer variables the lambda can access, and how |
| `[x]` vs. `[&x]` | Capture by value (copy) vs. by reference (alias) |
| Predicate | A callable returning bool, used by algorithms like `find_if`/`count_if` |
| `std::function<R(Args...)>` | A type-erased wrapper that can store any callable with a matching signature |

## Recap

Lambdas let you write small, inline, often-capturing functions exactly where an algorithm needs them, turning `std::sort`, `std::find_if`, and `std::count_if` into tools you can customize on the spot rather than needing a named function for every comparison. Next up, Lesson 20: Choosing the Right Container.
