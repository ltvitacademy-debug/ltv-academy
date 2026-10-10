# Lesson 7 — Functions and Methods

**Chapter 2 · Structuring Code · Lesson 7 of 18**

## What you'll learn

- What a function (called a "method" in Apex) is, and the problem it solves
- How to define a method with parameters, a return type, and a body
- The difference between a parameter and an argument
- What "scope" means for a variable declared inside a method

## The problem: repeated logic scattered everywhere

Without functions, any piece of logic you need more than once has to be copied everywhere it's needed. If that logic ever needs to change — a tax calculation, a discount rule — you now have to find and fix every copy, and missing even one leaves a bug hiding in production. A **function** (in Apex, always called a **method**, since Apex methods live inside classes — covered next lesson) is a named, reusable block of instructions that you define once and run from anywhere by calling its name.

## Defining and calling a method

```apex
public static Integer addTax(Integer subtotal, Decimal taxRate) {
    Integer taxAmount = (Integer) (subtotal * taxRate);
    return subtotal + taxAmount;
}
```

Reading this declaration left to right: `public` is an access modifier (who else is allowed to call this method — covered more in Chapter 2's object lesson); `static` means this method belongs to the class itself rather than to a specific instance of it; `Integer` is the **return type** — the type of value this method hands back when it finishes; `addTax` is the method's name; and `(Integer subtotal, Decimal taxRate)` is its **parameter list** — the inputs it needs to do its job. The `return` keyword inside the body sends a value back to whoever called the method, and immediately ends the method's execution — any code after a `return` statement in that path never runs.

Calling it looks like this:

```apex
Integer total = addTax(100, 0.08);
```

## Parameters vs. arguments

These two words get used interchangeably in casual conversation, but they mean distinct things. A **parameter** is the named placeholder in the method's own definition — `subtotal` and `taxRate` above are parameters. An **argument** is the actual value supplied when the method is called — `100` and `0.08` above are arguments. The method definition describes what kind of input it expects (parameters); each individual call supplies the real values (arguments) for that specific call. You could call `addTax` many times with many different arguments, and the parameters stay the same every time — they're the blueprint, not the specific instance.

## Methods that return nothing

Not every method needs to hand back a value — some just do something (print a message, update a value elsewhere) and finish. A method like this declares `void` as its return type, and simply has no `return` statement with a value (or no `return` statement at all):

```apex
public static void logOrderSummary(Integer orderTotal) {
    System.debug('Order total was: ' + orderTotal);
}
```

## Scope: where a variable lives and dies

**Scope** is the region of code where a variable actually exists and can be referred to. A variable declared inside a method — including its parameters — only exists for the duration of that single call, and is completely invisible to any code outside the method. This is deliberate and useful: it means two different methods can both have a variable named `total` with no conflict whatsoever, because each one's `total` only exists inside its own method call. Once a method finishes running, every variable declared inside it is gone; only the value returned (if any) survives past that point.

```apex
public static Integer doubleIt(Integer n) {
    Integer result = n * 2; // result only exists inside doubleIt
    return result;
}
// 'result' and 'n' do not exist out here -- referring to them would be a compile-time error
```

## Key terms

| Term | Meaning |
|---|---|
| Function / Method | A named, reusable block of instructions; called a "method" in Apex because it lives inside a class |
| Return type | The type of value a method hands back when it finishes |
| Parameter | A named placeholder for an input, defined as part of the method's signature |
| Argument | The actual value supplied for a parameter at the moment a method is called |
| Scope | The region of code where a given variable exists and can be referred to |
| void | A return type meaning the method hands back no value at all |

## Lab

Write an Apex method (as code) called `applyDiscount` that takes an `Integer orderTotal` and a `Decimal discountRate` as parameters and returns the discounted total as an `Integer`. Then write two separate calls to it with different arguments, and explain in one sentence why the method's parameters don't change even though the arguments do.

## Check yourself

Can you explain, without notes, the difference between a parameter and an argument clearly enough that someone new to programming would never confuse them again? Can you explain why a variable declared inside one method is completely invisible to a different method, even if both methods have a variable with the exact same name?
