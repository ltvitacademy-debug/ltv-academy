# Lesson 11 — Errors and Exceptions

**Chapter 2 · Structuring Code · Lesson 11 of 18**

## What you'll learn

- The three categories of error a program can run into, and how to tell them apart
- How `try`, `catch`, and `finally` let a program handle a runtime error without crashing entirely
- How to throw and catch a custom exception
- Why catching an exception you don't actually know how to handle is worse than not catching it at all

## Three categories of error

Lesson 2 already introduced the split between compile-time and runtime errors. It's worth naming all three categories a program can fail at, precisely, before going further:

- **Compile-time (syntax) errors** — the code is structurally invalid (a missing semicolon, a misspelled keyword) and is rejected before it ever runs.
- **Runtime errors (exceptions)** — the code is structurally valid and compiles fine, but something goes wrong while it's executing (dividing by zero, calling a method on a null value).
- **Logic errors** — the code compiles and runs without crashing, but produces the wrong result, because the logic itself was flawed (Lesson 5's unreachable-code example from Chapter 1 is a logic error).

This lesson is about the middle category: runtime errors, which Apex represents as **exceptions**.

## try, catch, and finally

```apex
Integer total = 0;
try {
    Integer result = 10 / 0; // throws a runtime exception
    total = result;
} catch (Exception e) {
    System.debug('Something went wrong: ' + e.getMessage());
    total = -1;
} finally {
    System.debug('This always runs, whether or not an exception happened');
}
```

Code inside a `try` block runs normally until (and unless) something throws an exception. The moment an exception is thrown, execution immediately jumps out of the `try` block and into a matching `catch` block — any remaining lines inside the `try` block after the failure point are skipped entirely. The `catch` block receives the exception as an object (`e` above) with useful methods like `.getMessage()`, letting the program respond to the failure instead of simply terminating. A `finally` block, if present, always runs after the try/catch finishes — whether an exception was thrown or not — making it the right place for cleanup logic that has to happen regardless of the outcome.

## Custom exceptions

Apex lets you define your own exception types for situations specific to your own program's logic, by extending the built-in `Exception` class:

```apex
public class InvalidDiscountException extends Exception {}

public static Integer applyDiscount(Integer total, Decimal rate) {
    if (rate < 0 || rate > 1) {
        throw new InvalidDiscountException('Discount rate must be between 0 and 1');
    }
    return (Integer) (total - (total * rate));
}
```

Salesforce's convention is that a custom exception class's name ends in the word "Exception" — `InvalidDiscountException`, not `InvalidDiscount`. The `throw` keyword is how your own code deliberately raises an exception, rather than waiting for the platform to raise one on its own (like the division-by-zero case above). You can then catch your own custom exception type specifically:

```apex
try {
    applyDiscount(100, 1.5);
} catch (InvalidDiscountException e) {
    System.debug('Rejected a bad discount rate: ' + e.getMessage());
}
```

Note that only custom exceptions can be thrown this deliberately in Apex — the platform's own built-in exception types can be caught, but your code cannot `throw` one of them directly; that's one of the practical reasons custom exceptions exist.

## Don't catch what you can't handle

Wrapping a `try`/`catch` around code just to make a red error message disappear, without actually doing anything meaningful in the `catch` block, is a real anti-pattern — it hides a genuine problem instead of fixing or even reporting it. A `catch` block that does nothing (or only logs something nobody will ever read) turns a visible failure into a silent one, which is categorically worse: at least an uncaught exception tells you, loudly, that something is wrong. A good `catch` block does something deliberate with the failure — show a clear message, substitute a safe default value, or re-throw the problem to whoever is better positioned to decide what to do about it.

## Key terms

| Term | Meaning |
|---|---|
| Exception | A runtime error represented as an object the program can catch and respond to |
| try | A block of code that may throw an exception, monitored for failures |
| catch | A block that runs if a matching exception is thrown inside the try block |
| finally | A block that always runs after try/catch, whether or not an exception occurred |
| Custom exception | A programmer-defined exception type created by extending the built-in Exception class |
| throw | The keyword used to deliberately raise an exception |

## Lab

Write an Apex method (as code) called `safeDivide` that takes two `Integer` parameters and returns their division result, using a `try`/`catch` to catch a division-by-zero exception and return `0` instead of letting the program crash. Then define your own custom exception, `NegativeAmountException`, and write a second method that throws it if a given `Integer` amount is negative. Explain in one sentence why a `catch` block that silently does nothing would be worse than not having a try/catch at all for this second method.

## Check yourself

Can you explain, without notes, the difference between a compile-time error, a runtime error, and a logic error, and give one example of each from this course so far? Can you explain why Salesforce's naming convention requires a custom exception class name to end in "Exception," and what role the `throw` keyword plays that the platform's own built-in exceptions don't need from your code?
