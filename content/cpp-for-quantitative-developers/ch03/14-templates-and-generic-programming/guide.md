# Templates & Generic Programming

You've now written a `Money` class with its own arithmetic. But what if you need the same "weighted average" logic for `double` prices, `int` share counts, and a custom `Decimal` type — without writing it three times? Templates let you write a function or class once, parameterized over a type, and have the compiler generate a correct version for each type you actually use.

## What you'll learn

- Function templates and how the compiler deduces the template argument
- Class templates, using a simple `FixedBuffer<T, N>`-style container as the running example
- Template parameters vs. ordinary function parameters
- C++20 `concepts` and `requires` for constraining what types a template accepts

## Function templates

A function template is a blueprint; the compiler stamps out ("instantiates") a real function for each type it's called with.

```cpp
template <typename T>
T weightedAverage(const T& a, double wa, const T& b, double wb) {
    return static_cast<T>(a * wa + b * wb);
}

double avgPrice = weightedAverage(101.25, 0.6, 102.75, 0.4);  // T = double
```

The compiler deduces `T = double` from the arguments — you rarely need to write `weightedAverage<double>(...)` explicitly.

## Class templates

A class template parameterizes an entire type, not just a function. This is how `std::vector<T>` itself is implemented.

```cpp
template <typename T, std::size_t N>
class FixedBuffer {
public:
    void push(const T& value) {
        if (size_ < N) data_[size_++] = value;
    }
    T& operator[](std::size_t i) { return data_[i]; }
    std::size_t size() const { return size_; }
private:
    T data_[N]{};
    std::size_t size_ = 0;
};

FixedBuffer<double, 1024> tickBuffer;   // a fixed-capacity double buffer
tickBuffer.push(101.25);
```

`N` here is a **non-type template parameter** — a compile-time constant, not a type, which is how the array size can be fixed at compile time with zero runtime overhead.

## Template parameters are a compile-time contract

Every distinct set of template arguments (`FixedBuffer<double, 1024>` vs. `FixedBuffer<int, 64>`) generates a completely separate type and separate compiled code — this is why templates have zero runtime dispatch cost compared to polymorphism, but why they can increase compiled binary size ("code bloat") if overused.

## Constraining templates with concepts (C++20)

Before concepts, a template that didn't support `operator*` for its type `T` would fail with a dense, hard-to-read compiler error deep inside the template body. `concepts` and `requires` let you state the constraint up front, in plain terms.

```cpp
#include <concepts>

template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
T weightedAverage(T a, double wa, T b, double wb) {
    return static_cast<T>(a * wa + b * wb);
}
```

Call `weightedAverage` with a `std::string`, and the compiler now rejects it immediately with "constraints not satisfied," pointing at the `Numeric` concept — instead of an unreadable error from deep inside the function body.

## Key terms

| Term | Meaning |
|---|---|
| Function template | A function parameterized by one or more types, instantiated per call site |
| Class template | A class parameterized by one or more types (e.g. `std::vector<T>`) |
| Template argument deduction | The compiler inferring `T` from the arguments, without you writing it explicitly |
| Non-type template parameter | A compile-time value (like `N` in `FixedBuffer<T, N>`), not a type |
| Concept (C++20) | A named, compiler-checked constraint on what types a template will accept |

## Recap

Templates let you write one function or class and have the compiler generate a correct, type-specific version for every type you actually use, with zero runtime cost. C++20 concepts make the resulting compiler errors — and the template's intent — far clearer by stating the required constraints up front. Next up, Lesson 15: Modern C++ Features (C++17/20).
