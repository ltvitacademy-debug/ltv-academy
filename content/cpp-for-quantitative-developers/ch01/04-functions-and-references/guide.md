# Functions & References

How you pass data into and out of a function is one of the most consequential decisions you'll make in C++, and it's something most other languages don't even let you control. This lesson covers function basics, then the three ways to pass an argument — by value, by reference, and by pointer (previewed here, covered fully in Chapter 2) — and why the choice matters enormously once your `Trade` or `Order` objects get larger than a handful of bytes.

## What you'll learn

- Function declarations, definitions, and return types in C++
- Passing by value vs. passing by reference, and the copies each one causes
- `const` references — the default choice for read-only function parameters
- Function overloading and default arguments
- A first look at why references avoid the problem pointers solve more explicitly (full depth in Chapter 2)

## Function basics

```cpp
double fair_value(double spot, double rate, double time) {
    return spot * (1.0 + rate * time);
}

int main() {
    double value = fair_value(100.0, 0.05, 1.0);
    std::cout << value << "\n";
    return 0;
}
```

A function has a return type (`double` here), a name, a parameter list, and a body. If a function returns nothing, its return type is `void`. Every parameter in this example is passed **by value** — each one is a brand-new copy of the caller's `double`, cheap because a `double` is only 8 bytes.

## Pass by value: a hidden cost at scale

```cpp
struct Order {
    int id;
    double price;
    long quantity;
    std::string symbol;   // owns its own heap-allocated character data
};

void log_order(Order o) {           // copies the whole Order, including symbol
    std::cout << o.symbol << "\n";
}
```

`log_order` looks innocent, but every call copies the entire `Order` — including copying the `std::string`'s character data. For a function called on every order in a hot path, that's real, avoidable cost. Pass-by-value is fine for small, cheap-to-copy types like `int` or `double`; it's expensive for anything bigger, like structs, strings, or containers.

## Pass by reference: no copy, same object

```cpp
void log_order(const Order& o) {    // binds directly to the caller's Order
    std::cout << o.symbol << "\n";  // no copy made
}

void fill_order(Order& o, long filled_qty) {  // non-const: allowed to modify
    o.quantity -= filled_qty;
}
```

A reference parameter (`Order&`) doesn't create a new object — it's another name for the exact object the caller passed in. Two rules to internalize immediately:

- **Default to `const Order&`** for any parameter you only need to read. It avoids a copy and the compiler enforces that the function can't modify the caller's data.
- **Use a plain `Order&` (no `const`)** only when the function is meant to modify the caller's object in place — `fill_order` above genuinely needs to change the caller's `quantity`.

This is the single highest-impact habit for writing efficient C++: pass small, cheap types (`int`, `double`, `bool`) by value, and pass anything larger — structs, classes, `std::string`, `std::vector` — by `const&` unless you specifically need to modify it.

## A first look at references vs. pointers

```cpp
double price = 100.0;
double& ref = price;   // ref is another name for price — must be bound immediately
ref = 101.5;            // this changes price itself

double* ptr = &price;  // ptr holds the address of price — can be reassigned, can be null
*ptr = 102.0;            // dereference to change price through the pointer
```

A reference must be bound to something when it's created and can never be rebound or be null — which is exactly why `const Order&` is such a safe default for a function parameter. A pointer is more flexible (it can be null, reassigned, or point into an array) but carries more responsibility. Chapter 2 is dedicated to pointers, the heap, and ownership in depth — for now, know that references are the right tool for "give me access to the caller's object without copying it," and pointers exist for everything references can't do.

## Overloading and default arguments

```cpp
double commission(double notional) {
    return notional * 0.001;
}

double commission(double notional, double rate) {
    return notional * rate;
}

double round_lot(double price, int lot_size = 100) {  // lot_size defaults to 100
    return price * lot_size;
}
```

C++ allows multiple functions with the same name as long as their parameter lists differ (**overloading**) — the compiler picks the right one based on the arguments at the call site. Default arguments let a caller omit trailing parameters, falling back to the value you specified in the declaration.

## Key terms

| Term | Meaning |
|---|---|
| Pass by value | The function receives a copy of the argument |
| Pass by reference | The function receives another name for the caller's actual object — no copy |
| const reference | A reference the function cannot use to modify the caller's object |
| Overloading | Multiple functions sharing a name, distinguished by their parameter types |

## Recap

Pass small types by value and everything else by `const&` unless you need to modify the caller's object in place — this single habit eliminates most unnecessary copying in C++ code. Next up, Lesson 5: Headers, Compilation & Linking, where you'll learn how functions declared in one file get used from another.
