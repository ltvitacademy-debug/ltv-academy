# Lesson 16 — Custom Exceptions

**Chapter 2 · Working with Data in Apex · Lesson 16 of 43**

## What you'll learn

- How to define a custom exception class by extending `Exception`
- Apex's naming convention for exception classes
- Throwing and catching your own exception type with `throw`
- Passing a message (or an inner exception) into your custom exception
- Building a small hierarchy of related custom exceptions

## Defining a custom exception

You create a custom exception by declaring a class that `extends`
Salesforce's built-in `Exception` class. By convention, the class name ends
in "Exception":

```apex
public class InsufficientInventoryException extends Exception {}
```

That's a complete, usable exception. Because it extends `Exception`, it
automatically inherits the standard constructors and methods — `getMessage()`,
`getTypeName()`, `getStackTraceString()` — with no extra code required.

## Throwing it

Use the `throw` keyword with `new` to raise your custom exception, typically
with a message describing what went wrong:

```apex
public class InventoryService {
    public static void reserveStock(Id productId, Integer quantity) {
        Integer available = getAvailableQuantity(productId);
        if (quantity > available) {
            throw new InsufficientInventoryException(
                'Requested ' + quantity + ' but only ' + available + ' are available.'
            );
        }
        // reservation logic continues here
    }

    private static Integer getAvailableQuantity(Id productId) {
        return 5; // placeholder for a real stock lookup
    }
}
```

## Catching it

A custom exception is caught the same way as a built-in one — by its type
in a `catch` block:

```apex
try {
    InventoryService.reserveStock(someProductId, 10);
} catch (InsufficientInventoryException iie) {
    System.debug('Could not reserve stock: ' + iie.getMessage());
}
```

You can only *throw* custom and built-in exceptions you define or that Apex
provides — but you can only *catch* exceptions, never throw one that doesn't
subclass `Exception`. You can't throw Apex's built-in exception types
directly (for example, you can't manually `throw new DmlException(...)`
the way the platform does internally for a failed DML statement) — custom
exceptions you write yourself are always throwable.

## Building a small hierarchy

Custom exceptions can extend each other, not just the base `Exception`
class. A `catch` block for a parent type also matches any of its
subclasses — this lets calling code catch broadly ("any order problem") or
narrowly ("specifically a payment problem") depending on what it needs:

```apex
public class OrderException extends Exception {}
public class PaymentDeclinedException extends OrderException {}

try {
    throw new PaymentDeclinedException('Card declined by processor.');
} catch (OrderException oe) {
    // catches PaymentDeclinedException too, since it extends OrderException
    System.debug('Order problem: ' + oe.getMessage());
}
```

## Wrapping an inner exception

When you catch a lower-level exception but want to surface a more
meaningful, domain-specific one to the caller, pass the original exception
in as the **cause**. Apex's `Exception` constructors accept a message plus
an inner `Exception`, and `getCause()` retrieves it later for debugging:

```apex
public class OrderSyncException extends Exception {}

try {
    insert new Opportunity(); // missing required fields
} catch (DmlException de) {
    throw new OrderSyncException('Could not sync order to Salesforce.', de);
}
```

## Key terms

| Term | Meaning |
|---|---|
| Custom exception | A class that `extends Exception`, used to represent an application-specific error |
| `throw` | Raises an exception instance so it can propagate up and be caught |
| Exception hierarchy | Custom exceptions extending other exceptions, so a broad `catch` matches all subclasses |
| `getCause()` | Retrieves the inner exception passed in when the custom exception was constructed |

## Lab

In Execute Anonymous, define and exercise a custom exception around a
simple Opportunity amount check:

```apex
public class OpportunityAmountException extends Exception {}

Decimal amount = -500;
try {
    if (amount < 0) {
        throw new OpportunityAmountException('Opportunity amount cannot be negative: ' + amount);
    }
} catch (OpportunityAmountException oae) {
    System.debug('Validation failed: ' + oae.getMessage());
}
```

Note: top-level classes can't be declared inside an anonymous Execute block
in every org configuration — if yours rejects the inline class declaration,
save `OpportunityAmountException` as its own Apex class in the Developer
Console first, then run the try/catch portion in Execute Anonymous.

## Check yourself

What is the minimum code needed to create a usable custom exception? If
`PaymentDeclinedException extends OrderException`, and you only write
`catch (OrderException oe)`, does a thrown `PaymentDeclinedException` get
caught there?
