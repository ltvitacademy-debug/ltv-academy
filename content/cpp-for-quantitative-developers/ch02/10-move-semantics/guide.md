# Move Semantics

This lesson closes Chapter 2 by answering a question that's been sitting in the background since Lesson 8: if `std::unique_ptr` can't be copied, how does `make_order(...)` return one by value? The answer is move semantics — one of modern C++'s most important performance features, and the reason returning large objects by value stopped being a performance problem starting with C++11.

## What you'll learn

- Lvalues vs. rvalues — what actually determines whether something can be moved
- Move constructors and move assignment, and how they differ from their copy counterparts
- `std::move` — what it actually does (hint: nothing at runtime) and when to use it
- Why returning local objects by value is efficient in modern C++

## The problem move semantics solves

```cpp
struct PriceSeries {
    std::vector<double> prices;
};

PriceSeries build_series() {
    PriceSeries s;
    s.prices = {100.1, 100.2, 100.3, /* ... thousands more ... */};
    return s;   // does this copy thousands of doubles?
}

PriceSeries series = build_series();
```

Before C++11, returning `s` here would copy the entire `prices` vector — allocate new heap memory, copy every element, then destroy the original. For a vector of a million prices, that's a real, visible cost for something that's conceptually just "hand the data to the caller." Move semantics let the compiler instead transfer ownership of the vector's internal heap buffer directly, leaving the original empty, with no element copying at all.

## Lvalues and rvalues

```cpp
PriceSeries a;
PriceSeries b = a;              // a is an lvalue — this COPIES
PriceSeries c = build_series(); // build_series() is an rvalue — this MOVES
```

An **lvalue** refers to an object with persistent identity — you can take its address, and it'll still exist after the expression. An **rvalue** is a temporary that's about to be destroyed anyway — the return value of a function, or a literal. The compiler automatically moves from rvalues (since there's no reason to preserve something that's about to disappear) and copies from lvalues (since the original needs to stay intact). This is exactly why `return s;` in `build_series()` is efficient: `s` is a local variable about to go out of scope, so the compiler treats the return as a move, not a copy.

## Move constructor and move assignment

```cpp
struct PriceSeries {
    std::vector<double> prices;

    // move constructor — "steals" the other's buffer, leaves it empty
    PriceSeries(PriceSeries&& other) noexcept
        : prices(std::move(other.prices)) {}

    // move assignment — same idea, for an existing object
    PriceSeries& operator=(PriceSeries&& other) noexcept {
        prices = std::move(other.prices);
        return *this;
    }
};
```

`PriceSeries&&` is an **rvalue reference** — a reference that can only bind to an rvalue, and signals "this object is temporary; feel free to take its internals." `std::vector` (and `std::string`, and every standard container) already implements its own move constructor, so writing `prices(std::move(other.prices))` just chains down to that — pointer-swap cheap, no element copying. Mark move operations `noexcept` whenever possible; several standard library optimizations (like `std::vector` reallocating) specifically check for this.

## std::move — a cast, not an action

```cpp
std::vector<double> a = {1.0, 2.0, 3.0};
std::vector<double> b = std::move(a);
// a is now in a valid but unspecified state — typically empty
// do not use a's contents after this, only reassign or destroy it
```

`std::move` does nothing at runtime — it's purely a cast that tells the compiler "treat this lvalue as an rvalue," which makes the move constructor/assignment eligible to run instead of the copy version. After `std::move(a)`, `a` still exists and is still safe to destroy or reassign, but its contents should be treated as unspecified — never read from it afterward. Use `std::move` explicitly only when you have an lvalue you genuinely want to give away, like transferring a large buffer into a container you're building.

## Why this matters for returning values

Because of move semantics (and a related compiler optimization called copy elision), returning a large local object by value — a `std::vector`, a `std::string`, your own `PriceSeries` — is efficient in modern C++. You don't need to return a raw pointer, or pass an output parameter by reference, just to "avoid a copy" the way you might have in C++03. Write the natural, readable signature; the compiler handles the efficiency.

## Key terms

| Term | Meaning |
|---|---|
| Rvalue | A temporary value about to be destroyed (e.g. a function's return value) |
| Rvalue reference (&&) | A reference that binds only to an rvalue, enabling move operations |
| Move constructor | Constructs a new object by transferring another's resources instead of copying them |
| std::move | A cast that treats an lvalue as an rvalue, making it eligible to be moved from |

## Recap

Move semantics let C++ transfer ownership of a resource — a heap buffer, a file handle — instead of copying it, which is exactly how `std::unique_ptr` is returned by value and how large containers can be returned from functions efficiently. That closes Chapter 2 and the foundational half of this course. Next up, Chapter 3 begins with Lesson 11: Classes & Encapsulation, where you'll start building your own types with constructors, destructors, and the rules that govern how they behave.
