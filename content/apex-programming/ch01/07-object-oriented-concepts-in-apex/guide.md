# Lesson 7 — Object-Oriented Concepts in Apex

**Chapter 1 · Apex Fundamentals · Lesson 7 of 43**

## What you'll learn

- Encapsulation: hiding data behind methods
- Inheritance: extending a class with `extends` and `virtual`
- Polymorphism: overriding a method so the same call behaves differently
- Why Apex has no multiple inheritance of classes

## Encapsulation

Encapsulation means keeping a class's internal data private and exposing
only the behavior you intend other code to use, through public methods.
You'll formally meet access modifiers in the next lesson, but the pattern
itself belongs here:

```apex
public class BankAccount {
    private Decimal balance;

    public BankAccount(Decimal startingBalance) {
        balance = startingBalance;
    }

    public void deposit(Decimal amount) {
        balance += amount;
    }

    public Decimal getBalance() {
        return balance;
    }
}
```

Outside code can call `deposit()` and `getBalance()`, but it can never
reach into `balance` directly — the class controls how its own state
changes.

## Inheritance: extending a class

A class can extend another class to inherit its methods and properties and
add more specialized behavior. Salesforce's rule is strict: a class can
only extend **one** other class, though it can implement multiple
interfaces — so Apex doesn't support multiple inheritance of classes.

To be extendable, the parent class's methods must be marked `virtual`:

```apex
public virtual class Marker {
    public virtual void write() {
        System.debug('Writing some text.');
    }

    public virtual Double discount() {
        return .05;
    }
}
```

A subclass uses `extends` and inherits everything:

```apex
public class YellowMarker extends Marker {
    public override void write() {
        System.debug('Writing some text using the yellow marker.');
    }
}
```

`YellowMarker` automatically has a working `discount()` method too, even
though it never defined one itself — it inherited it from `Marker`.

## Polymorphism

Polymorphism is what happens when you call an overridden method through a
reference typed as the parent class, but the actual behavior comes from
the subclass:

```apex
Marker obj1 = new Marker();
obj1.write(); // 'Writing some text.'

Marker obj2 = new YellowMarker();
obj2.write(); // 'Writing some text using the yellow marker.'
```

Both `obj1` and `obj2` are declared as type `Marker`, but because `obj2`
actually holds a `YellowMarker` instance, calling `write()` on it runs the
overridden version. This is exactly how Salesforce's own guide frames it:
the behavior of a method differs based on the object you're calling it on.

## Putting it together

A subclass can also add brand-new methods the parent never had — but to
call them, the variable has to be typed as the subclass, not the parent:

```apex
public class RedMarker extends Marker {
    public override void write() {
        System.debug('Writing some text in red.');
    }

    public Double computePrice() {
        return 1.5;
    }
}

RedMarker redObj = new RedMarker();
Double price = redObj.computePrice(); // only works because redObj is typed RedMarker
```

## Key terms

| Term | Meaning |
|---|---|
| Encapsulation | Hiding a class's internal data behind public methods that control access to it |
| Inheritance | A class gaining the methods and properties of a class it extends |
| `virtual` | Marks a class or method as allowed to be extended/overridden |
| `override` | Marks a subclass method as replacing its parent's virtual method |
| Polymorphism | The same method call behaving differently depending on the actual object it's called on |

## Lab

In the Developer Console, save the `Marker` and `YellowMarker` classes
from this lesson, then run in Execute Anonymous:

```apex
Marker obj1 = new Marker();
Marker obj2 = new YellowMarker();

obj1.write();
obj2.write();

System.debug('Discount from obj2: ' + obj2.discount());
```

Confirm the two `write()` calls print different messages even though both
variables are declared as type `Marker`.

## Check yourself

What has to be true about a parent class's method before a subclass can
override it, and why is calling `write()` on `obj2` in the lab an example
of polymorphism rather than just normal inheritance?
