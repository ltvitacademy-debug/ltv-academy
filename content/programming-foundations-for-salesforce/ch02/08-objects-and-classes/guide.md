# Lesson 8 — Objects and Classes

**Chapter 2 · Structuring Code · Lesson 8 of 18**

## What you'll learn

- What a class is, and what an object (an instance of a class) is
- How to define fields and a constructor, and create an instance with `new`
- The difference between an instance method and a static method
- Why this matters enormously for Salesforce specifically, where "object" has two related meanings

## A class is a blueprint; an object is the real thing built from it

A **class** is a template that defines what kind of data (its **fields**) and what behavior (its **methods**) something should have. An **object** is a specific instance of that class — an actual thing built from the blueprint, with its own concrete values in those fields. The relationship is the same as a house blueprint versus an actual built house: one blueprint, potentially many houses, each with its own address and paint color but the same basic structure.

```apex
public class Customer {
    public String name;
    public Integer loyaltyPoints;

    public Customer(String customerName) {
        name = customerName;
        loyaltyPoints = 0;
    }

    public void addPoints(Integer amount) {
        loyaltyPoints = loyaltyPoints + amount;
    }
}
```

This defines the `Customer` class: every `Customer` object will have a `name` and `loyaltyPoints`, and every `Customer` object can have `addPoints` called on it. The `Customer(String customerName)` method is a **constructor** — a special method with the same name as the class, with no return type, that runs automatically when a new object is created, setting up its initial field values.

## Creating objects with `new`

```apex
Customer c1 = new Customer('Jordan Lee');
Customer c2 = new Customer('Priya Shah');

c1.addPoints(50);
c2.addPoints(20);

System.debug(c1.name);          // Jordan Lee
System.debug(c1.loyaltyPoints); // 50
System.debug(c2.loyaltyPoints); // 20
```

The `new` keyword creates an actual object from the `Customer` blueprint, running its constructor. `c1` and `c2` are two completely separate objects — each has its own independent `name` and `loyaltyPoints`. Calling `addPoints` on `c1` has zero effect on `c2`, because each object carries its own copy of the class's fields. This is the core idea of **object-oriented** thinking: bundling related data and the behavior that acts on that data together, into one reusable unit, instead of keeping a pile of loose variables and separate functions that all have to be kept in sync by hand.

## Instance methods vs. static methods

`addPoints` above is an **instance method** — it only makes sense in the context of one specific object (you call it on `c1`, and it only affects `c1`'s data). Lesson 7's `addTax` example was a **static method** — marked with the `static` keyword, it belongs to the class itself rather than to any specific object, doesn't need an object created first, and is called directly on the class name (`TaxHelper.addTax(...)`, not `someTaxHelperObject.addTax(...)`). The rule of thumb: if a method needs a specific object's own data to do its job, make it an instance method; if it's a general-purpose operation that doesn't depend on any one object's state, a static method is simpler and doesn't require creating an object just to call it.

## A Salesforce-specific wrinkle worth flagging now

In plain programming terms, "object" means what this lesson just described — an instance of a class. But once you move into the Apex-specific courses later in this path, you'll also hear "object" used Salesforce's own way: a **Salesforce object** (like the `Account` or `Opportunity` object) refers to a data structure in the Salesforce database — closer to what a general class is used to represent, not an instance of it. Both meanings are legitimate and both are used constantly in real Salesforce work; context tells you which one is meant. This course uses "object" in the general programming sense throughout; keep the distinction in mind so it doesn't trip you up later.

## Key terms

| Term | Meaning |
|---|---|
| Class | A template defining the fields and methods something should have |
| Object (instance) | A specific instance of a class, with its own concrete field values |
| Field | A piece of data a class defines that each of its objects will hold |
| Constructor | A special method, matching the class name, that runs when a new object is created |
| Instance method | A method that operates on one specific object's own data |
| Static method | A method that belongs to the class itself, not to any specific object |

## Lab

Design (as Apex code, no org needed) a simple `Product` class with fields for a name (String) and a price (Decimal), a constructor that sets both, and an instance method `applyPriceCut` that reduces the price by a given percentage. Create two separate `Product` objects with different names and prices, call `applyPriceCut` on only one of them, and write a sentence explaining why the other object's price is unaffected.

## Check yourself

Can you explain, without notes, the blueprint-vs-house analogy well enough to describe the relationship between a class and an object to someone who has never programmed? Can you explain why calling an instance method on one object never affects a different object of the same class?
