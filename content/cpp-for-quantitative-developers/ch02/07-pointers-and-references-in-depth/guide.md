# Pointers & References in Depth

Lesson 4 introduced references briefly as a way to avoid copying function arguments. This lesson goes the rest of the way: full pointer syntax, pointer arithmetic, `nullptr`, and a precise rule for when to use a pointer versus a reference versus passing by value. Pointers are the most powerful and most misused feature in C++ — understanding exactly what they are, bit for bit, removes most of the mystery (and most of the bugs).

## What you'll learn

- Pointer declaration, the address-of operator (`&`), and the dereference operator (`*`)
- `nullptr` and why every pointer should be checked or guaranteed non-null before use
- Pointer arithmetic, and how it relates to arrays
- Pointers to `const` data vs. `const` pointers — a notoriously confusing distinction
- A concrete decision rule: pointer vs. reference vs. value

## Pointer basics

```cpp
double price = 182.35;
double* ptr = &price;      // ptr holds the memory address of price

std::cout << ptr << "\n";   // prints the address itself
std::cout << *ptr << "\n";  // dereference: prints 182.35, the value at that address

*ptr = 190.00;               // modifies price itself, through the pointer
std::cout << price << "\n"; // prints 190.00
```

A pointer is a variable whose value is a memory address. `&` (address-of) produces the address of a variable; `*` (dereference), applied to a pointer, accesses the value stored at that address. Unlike a reference, a pointer can be reassigned to point somewhere else entirely, and it can be in a state that points to nothing at all.

## nullptr

```cpp
double* ptr = nullptr;          // explicitly points to nothing

if (ptr != nullptr) {
    std::cout << *ptr << "\n";  // only dereference if it's actually valid
} else {
    std::cout << "ptr is null\n";
}
```

`nullptr` is C++'s type-safe null pointer value (prefer it over the old C-style `0` or `NULL`). Dereferencing a null pointer is undefined behavior — typically a crash, but not guaranteed to be. Any function that accepts a raw pointer and might reasonably receive `nullptr` should check for it before dereferencing.

## Pointer arithmetic and arrays

```cpp
double prices[5] = {100.1, 100.2, 100.3, 100.4, 100.5};
double* p = prices;          // decays to a pointer to the first element

std::cout << *p << "\n";      // 100.1
std::cout << *(p + 1) << "\n"; // 100.2 — pointer arithmetic steps by sizeof(double)
std::cout << p[2] << "\n";    // 100.3 — p[2] is shorthand for *(p + 2)
```

An array name, used where a pointer is expected, "decays" into a pointer to its first element. Pointer arithmetic (`p + 1`) advances by the size of the pointed-to type, not by one byte — this is why `*(p + 1)` correctly lands on the second `double`, eight bytes further on. In modern C++, prefer `std::vector` and `std::array` with range-based `for` or `.at()` over raw pointer arithmetic on C-style arrays; it's shown here because understanding it is essential for reading older codebases and for grasping what iterators do under the hood.

## const with pointers — the tricky part

```cpp
const double price = 100.0;
const double* p1 = &price;   // pointer to const: can't modify *p1

double rate = 0.05;
double* const p2 = &rate;    // const pointer: can't reassign p2 itself
*p2 = 0.06;                   // OK — modifying the pointed-to value is fine

const double* const p3 = &price; // const pointer to const: neither can change
```

Read these right to left from the `*`: `const double* p1` is "a pointer to a `const double`" — you can repoint `p1`, but can't modify what it points to. `double* const p2` is "a `const` pointer to a `double`" — you can modify `*p2`, but can't repoint `p2` itself. Combine both when neither should be possible.

## Decision rule: pointer vs. reference vs. value

- **Pass by value** when the type is small and cheap (`int`, `double`, `bool`).
- **Pass by `const&`** when you need read-only access to something larger, and the argument will always exist (never optional).
- **Pass by `&`** (non-const) when the function needs to modify the caller's object in place, and it will always exist.
- **Pass by pointer** (or, better, a smart pointer — Lesson 8) specifically when the argument might legitimately be absent (`nullptr` is a valid, meaningful state) or when you need to represent "no object yet."

## Key terms

| Term | Meaning |
|---|---|
| Dereference (*) | Accesses the value stored at the address a pointer holds |
| Address-of (&) | Produces the memory address of a variable |
| nullptr | The type-safe null pointer value in modern C++ |
| Pointer arithmetic | Arithmetic on pointers that advances by sizeof(pointed-to type) |

## Recap

A pointer is just a variable holding an address, made safer by `nullptr` checks and `const` correctness, and the decision between value, reference, and pointer comes down to size, mutability, and whether "no object" is a real possibility. Next up, Lesson 8: Smart Pointers & RAII, where you'll see how modern C++ wraps raw pointers so you rarely have to call `delete` by hand again.
