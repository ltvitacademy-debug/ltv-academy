# Inheritance & Polymorphism

A pricing library needs to treat a `EuropeanOption`, an `AmericanOption`, and a `Future` as interchangeable "instruments" that all know how to price themselves — while each does the actual pricing completely differently. Inheritance and polymorphism are how C++ lets you write one function that works correctly across every derived type, without that function knowing which one it's actually holding.

## What you'll learn

- How a derived class inherits from a base class with `: public Base`
- Virtual functions, `override`, and why a non-virtual base pointer gives you the wrong behavior
- Pure virtual functions and abstract base classes
- Virtual destructors — and why forgetting one is a real memory-safety bug

## Base and derived classes

A derived class reuses and extends a base class. The base defines a common interface; each derived class fills it in differently.

```cpp
class Instrument {
public:
    virtual double price() const = 0;   // pure virtual: no implementation here
    virtual ~Instrument() = default;    // virtual destructor — see below
protected:
    double notional_;
};

class Future : public Instrument {
public:
    explicit Future(double notional) { notional_ = notional; }
    double price() const override { return notional_; }  // simplified
};
```

`Instrument` is an **abstract base class** because it has a pure virtual function (`= 0`) — you can never create an `Instrument` directly, only a derived type like `Future`.

## Virtual functions and override

Mark a base function `virtual` to allow derived classes to replace its behavior, and mark the derived version `override` so the compiler checks it actually matches a virtual function in the base — catching typos that would otherwise silently create an unrelated new function instead of overriding anything.

```cpp
class Option : public Instrument {
public:
    Option(double notional, double vol) : vol_(vol) { notional_ = notional; }
    double price() const override {
        return notional_ * vol_ * 0.4;  // toy Black-Scholes-style stand-in
    }
private:
    double vol_;
};
```

## Why polymorphism needs pointers or references

Calling `price()` through a base-class pointer or reference dispatches to the *derived* class's implementation at runtime — this is dynamic dispatch, and it's the entire point of polymorphism.

```cpp
std::vector<std::unique_ptr<Instrument>> book;
book.push_back(std::make_unique<Future>(1'000'000.0));
book.push_back(std::make_unique<Option>(500'000.0, 0.22));

double total = 0.0;
for (const auto& instr : book) {
    total += instr->price();   // calls the *correct* derived price() each time
}
```

If `price()` were not `virtual`, every call through `Instrument*` would call `Instrument::price()` regardless of the real object's type — the wrong answer, silently.

## Virtual destructors: a real bug, not a style nitpick

When you `delete` an object through a base pointer, C++ only calls the derived class's destructor if the base destructor is `virtual`. Omit it, and deleting a `Future*` stored as `Instrument*` only runs `~Instrument()`, leaking any resources the derived class owns.

```cpp
class Instrument {
public:
    virtual ~Instrument() = default;   // required once any derived class exists
};
```

## Key terms

| Term | Meaning |
|---|---|
| Base / derived class | `class Derived : public Base { ... }` — Derived inherits Base's interface |
| Virtual function | A base function that derived classes can replace; enables dynamic dispatch |
| `override` | Compiler-checked keyword confirming a derived function actually overrides a virtual base function |
| Pure virtual (`= 0`) | A virtual function with no base implementation; makes the class abstract |
| Virtual destructor | Ensures `delete` through a base pointer runs the correct derived destructor |

## Recap

Inheritance lets a family of types share one interface, and virtual functions make a call through a base pointer resolve to the derived class's actual behavior at runtime — the mechanism behind treating a whole instrument book polymorphically. Always give a base class with virtual functions a virtual destructor. Next up, Lesson 13: Operator Overloading.
