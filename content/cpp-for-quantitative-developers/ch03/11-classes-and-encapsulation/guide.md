# Classes & Encapsulation

You've spent the last two chapters working with raw data: built-in types, pointers, and hand-managed memory. This lesson introduces the tool C++ gives you to stop passing that data around naked and start wrapping it in something that protects its own invariants — the `class`. Every quant library you'll touch professionally, from a pricing engine to an order-management system, is built from classes that hide their internals and expose a deliberate, narrow interface.

## What you'll learn

- The difference between a `struct` and a `class` in C++, and why it's smaller than people assume
- Access specifiers (`public`, `private`, `protected`) and why private data is the default you should reach for
- Constructors, destructors, and the member-initializer list
- Why encapsulation matters for a financial type like a `Position` or an `Order`

## struct vs. class: one default, nothing more

In C++, `struct` and `class` are the same language feature with one difference: members of a `struct` are `public` by default, members of a `class` are `private` by default. That's the entire distinction. Convention uses `struct` for simple, passive data bags (a `Point` with an `x` and `y`) and `class` for types that own behavior and enforce rules about their own data.

```cpp
struct Tick {       // plain data, public by default
    double price;
    long   size;
};

class Position {    // behavior + invariants, private by default
public:
    Position(std::string symbol, double qty, double avgPrice);
    double marketValue(double currentPrice) const;
private:
    std::string symbol_;
    double qty_;
    double avgPrice_;
};
```

## Encapsulation: hiding the "how"

Encapsulation means the object's internal representation is private, and the only way to interact with it is through the public member functions it chooses to expose. The caller never reaches in and mutates `qty_` directly — they call a method, and the class gets to validate, recompute, or reject the change. For a trading type, this is not a style preference; it's how you prevent a `Position` from ever holding a quantity that disagrees with its average price.

```cpp
class Position {
public:
    Position(std::string symbol, double qty, double avgPrice)
        : symbol_(std::move(symbol)), qty_(qty), avgPrice_(avgPrice) {}

    void addFill(double fillQty, double fillPrice) {
        double newQty = qty_ + fillQty;
        avgPrice_ = (qty_ * avgPrice_ + fillQty * fillPrice) / newQty;
        qty_ = newQty;
    }

    double marketValue(double currentPrice) const { return qty_ * currentPrice; }
    double quantity() const { return qty_; }

private:
    std::string symbol_;
    double qty_;
    double avgPrice_;
};
```

Notice `addFill` is the *only* way `qty_` and `avgPrice_` ever change together — so they can never drift out of sync. That guarantee disappears the moment those members become public.

## Constructors, destructors, and the member-initializer list

A constructor runs when an object is created; a destructor runs when it's destroyed. Prefer the **member-initializer list** (the `: symbol_(...), qty_(...)` syntax above) over assigning inside the constructor body — it initializes members directly in declaration order, which is both faster and required for `const` or reference members.

```cpp
class Order {
public:
    Order(std::string symbol, int qty)
        : symbol_(std::move(symbol)), qty_(qty), id_(nextId_++) {}

    ~Order() { /* log cancellation, release resources, etc. */ }

private:
    std::string symbol_;
    int qty_;
    const int id_;
    static int nextId_;
};
int Order::nextId_ = 1;
```

If you don't declare any constructor, the compiler generates a default one; if you don't declare a destructor, it generates a trivial one. Once you manage a resource manually (a raw pointer, a file handle), you usually need to define — or explicitly `= delete` — the copy constructor and copy assignment operator too, a rule covered fully in the Modern C++ Features lesson.

## Getters, setters, and const-correctness

Expose only what callers legitimately need, and mark any member function that doesn't modify state `const`. This lets the compiler catch accidental mutation and lets you safely call that function on a `const Position&`.

```cpp
class Position {
public:
    double quantity() const { return qty_; }   // read-only accessor
    std::string symbol() const { return symbol_; }
private:
    std::string symbol_;
    double qty_;
};
```

## Key terms

| Term | Meaning |
|---|---|
| `class` / `struct` | Same feature; default member access is `private` vs. `public` |
| Access specifier | `public`, `private`, or `protected` — controls who can see a member |
| Encapsulation | Hiding internal representation behind a controlled public interface |
| Member-initializer list | The `: member(value)` syntax that initializes members before the constructor body runs |
| const member function | A method that promises not to modify the object's state |

## Recap

A class bundles data with the behavior that protects it, defaulting every member to private so the only path into the object is the interface you deliberately designed. Constructors build the object correctly from the start via the member-initializer list, and `const` member functions document which operations are safe to call on read-only data. Next up, Lesson 12: Inheritance & Polymorphism.
