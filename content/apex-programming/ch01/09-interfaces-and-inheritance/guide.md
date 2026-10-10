# Lesson 9 — Interfaces and Inheritance

**Chapter 1 · Apex Fundamentals · Lesson 9 of 43**

## What you'll learn

- How to define an interface and implement it with `implements`
- Why a class can implement several interfaces at once
- The difference between implementing an interface and extending a class
- `virtual`, `abstract`, and `override` working together

## What an interface is

An interface is like a class in which none of the methods have bodies —
just the method signatures. Any class that implements the interface must
supply a body for every one of those methods.

```apex
// An interface that defines what a purchase order looks like in general
public interface PurchaseOrder {
    Double discount();
}
```

Notice the method inside the interface has **no access modifier and no
body** — just a signature ending in a semicolon. Methods defined within an
interface automatically have no access modifiers of their own.

## Implementing an interface

A class implements an interface with the `implements` keyword, and it must
define every method the interface declares:

```apex
public class CustomerPurchaseOrder implements PurchaseOrder {
    public Double discount() {
        return .05; // flat 5% discount
    }
}

public class EmployeePurchaseOrder implements PurchaseOrder {
    public Double discount() {
        return .10; // 10% discount
    }
}
```

Each class gives its own implementation of `discount()`, which is exactly
why interfaces are useful: they let you write code against the general
`PurchaseOrder` type without caring which concrete class is actually
behind it.

```apex
PurchaseOrder po = new EmployeePurchaseOrder();
System.debug(po.discount()); // .10
```

## A class can implement multiple interfaces

Unlike extending a class (limited to one parent), a class can implement
**several** interfaces at once, separated by commas:

```apex
public class Invoice implements Printable, Emailable {
    // must implement every method from both interfaces
}
```

This is exactly the escape hatch for the restriction you met in the last
lesson: Apex has no multiple inheritance of classes, but it has no such
limit on interfaces.

## Interfaces vs. extending a class

| | `implements` (interface) | `extends` (class) |
|---|---|---|
| How many at once | Multiple, comma-separated | Exactly one |
| What you inherit | Only method signatures — you write every body | Full method implementations, inherited for free |
| Parent needs `virtual`? | No — interface methods have no bodies to protect | Yes — the method must be `virtual` to be overridden |

An interface can also extend another interface, and the extending
interface then has access to all of the parent interface's methods too.

## virtual, abstract, and override together

You met `virtual` and `override` in the previous lesson. `abstract` is a
third related keyword: an `abstract` class declares methods that have a
signature but **no body**, and it's the subclass's job to implement them.

```apex
public abstract class Shape {
    public abstract Double area(); // no body -- subclasses must provide one

    public virtual String describe() {
        return 'A generic shape';
    }
}

public class Circle extends Shape {
    public Double radius;

    public Circle(Double radius) {
        this.radius = radius;
    }

    public override Double area() {
        return Math.PI * radius * radius;
    }

    public override String describe() {
        return 'A circle with radius ' + radius;
    }
}
```

`Shape` can never be instantiated directly with `new Shape()` — it only
exists to be extended. `Circle` must implement `area()` since `Shape`
declared it abstract, and it chose to also override the already-working
`describe()`.

## Key terms

| Term | Meaning |
|---|---|
| Interface | A set of method signatures with no bodies; a class using `implements` must provide every body |
| `implements` | Declares that a class provides implementations for an interface's methods |
| Multiple interface implementation | A class may implement more than one interface, comma-separated |
| `abstract` class | A class with at least one method that has a signature but no body |
| `abstract` method | A method signature with no body, requiring a subclass to implement it |

## Lab

In the Developer Console, save the `PurchaseOrder` interface and both
implementing classes from this lesson, then run in Execute Anonymous:

```apex
List<PurchaseOrder> orders = new List<PurchaseOrder>{
    new CustomerPurchaseOrder(),
    new EmployeePurchaseOrder()
};

for (PurchaseOrder po : orders) {
    System.debug('Discount: ' + po.discount());
}
```

Confirm both discount values print correctly even though the loop
variable is typed only as the interface, `PurchaseOrder`.

## Check yourself

What must every class that implements an interface provide, and how many
interfaces can a single class implement compared to how many classes it
can extend?
