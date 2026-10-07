# Operator Overloading

A `Money` type that can't be added with `+`, compared with `==`, or printed with `<<` forces every piece of code that touches it to call awkward named functions instead of writing natural expressions. Operator overloading lets your own types participate in C++'s built-in syntax — safely, and only for the operators where it actually makes the code clearer.

## What you'll learn

- How to overload arithmetic operators (`+`, `-`) as member or free functions
- Overloading comparison operators (`==`, and the C++20 three-way `<=>`)
- Overloading `<<` for `std::ostream` as a non-member friend function, and why it must be non-member
- When overloading is the right call, and when a named function is clearer

## Overloading arithmetic operators

Prefer overloading `operator+` as a free (non-member) function when both operands should be treated symmetrically; implement it in terms of a member `operator+=` to avoid duplicating logic.

```cpp
class Money {
public:
    explicit Money(long cents) : cents_(cents) {}
    Money& operator+=(const Money& rhs) {
        cents_ += rhs.cents_;
        return *this;
    }
    long cents() const { return cents_; }
private:
    long cents_;
};

Money operator+(Money lhs, const Money& rhs) {
    lhs += rhs;      // reuse operator+=
    return lhs;
}
```

Taking `lhs` by value in the free function gives you a cheap, correct copy to mutate and return — no separate temporary needed.

## Comparison operators

Overload `==` (and `!=`, which can default from it since C++20) so two `Money` values compare by their actual data, not by address.

```cpp
class Money {
public:
    friend bool operator==(const Money& a, const Money& b) {
        return a.cents_ == b.cents_;
    }
private:
    long cents_;
};
```

C++20 adds the three-way comparison operator `<=>` ("spaceship"), which can generate `<`, `<=`, `>`, `>=` automatically from one function:

```cpp
#include <compare>
class Money {
public:
    auto operator<=>(const Money& rhs) const = default;  // compares cents_ for us
    bool operator==(const Money& rhs) const = default;
private:
    long cents_;
};
```

`= default` tells the compiler to generate the comparison by comparing each member in turn — correct and zero extra code, as long as member-wise comparison is what you actually want.

## Overloading `<<` for printing

`operator<<` must be a free function (optionally a `friend` so it can reach private members), because the left-hand operand is `std::ostream&`, not your type — you can't add a member function to `std::ostream`.

```cpp
class Money {
    friend std::ostream& operator<<(std::ostream& os, const Money& m) {
        return os << (m.cents_ / 100) << "." << (m.cents_ % 100);
    }
private:
    long cents_;
};

// usage:
Money price(1050);
std::cout << "Price: " << price << "\n";  // Price: 10.50
```

## When to overload — and when not to

Overload an operator only when its meaning is unambiguous and matches programmer intuition (`+` for concatenation or sums, `==` for value equality). Don't overload `+` to mean something unrelated to addition — write a named function (`combinePositions(...)`) instead. Clarity beats cleverness every time.

## Key terms

| Term | Meaning |
|---|---|
| `operator+`, `operator==`, etc. | Functions that let your type use built-in operator syntax |
| Free (non-member) function | An operator defined outside the class; required for `<<` and often preferred for symmetric binary operators |
| `friend` | Grants a free function access to a class's private members |
| `<=>` (spaceship, C++20) | Three-way comparison operator; can be `= default` to compare members in order |

## Recap

Operator overloading lets a type like `Money` participate naturally in `+`, `==`, and `<<` expressions, as long as the overloads are implemented in terms of each other and kept intuitive. `<<` must always be a non-member function because `std::ostream` is the left operand. Next up, Lesson 14: Templates & Generic Programming.
