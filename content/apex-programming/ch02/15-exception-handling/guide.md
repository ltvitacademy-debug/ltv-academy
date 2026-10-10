# Lesson 15 — Exception Handling

**Chapter 2 · Working with Data in Apex · Lesson 15 of 43**

## What you'll learn

- The `try` / `catch` / `finally` structure
- Common built-in exceptions: `DmlException`, `QueryException`, `NullPointerException`, `ListException`
- Catching a specific exception type vs. the generic `Exception`
- Using `getMessage()` and `DmlException`'s own `getDmlMessage()`/`getNumDml()`
- Why `finally` always runs, even after a `return`

## try, catch, finally

Apex uses the same try/catch/finally structure found in most modern
languages. Code that might fail goes in `try`; code that handles the
failure goes in one or more `catch` blocks; code that must always run
(cleanup, logging) goes in `finally`:

```apex
try {
    Account acct = new Account(); // missing required Name
    insert acct;
} catch (DmlException e) {
    System.debug('Insert failed: ' + e.getMessage());
} finally {
    System.debug('Insert attempt finished.');
}
```

`finally` runs whether the `try` block succeeded, threw an exception that
was caught, or even if a `return` statement inside `try` or `catch` is about
to exit the method — it always executes before control actually leaves.

## Built-in exceptions you'll see constantly

Apex's runtime throws specific exception types depending on what went
wrong:

- **`DmlException`** — a DML statement failed: a required field was
  missing, a validation rule fired, a trigger threw. Has extra methods
  `getDmlMessage(Integer index)` (the error for one failed record in a
  bulk operation) and `getNumDml()` (how many records failed).
- **`QueryException`** — a SOQL problem, most commonly assigning a query
  to a singleton sObject variable when it returned zero or more than one
  row (Lesson 10).
- **`NullPointerException`** — dereferencing a null variable, e.g. calling
  a method on an sObject variable that's `null`.
- **`ListException`** — misusing a list, such as indexing past its bounds.

```apex
try {
    Account missing = [SELECT Id FROM Account WHERE Name = 'Does Not Exist'];
} catch (QueryException qe) {
    System.debug('No matching account: ' + qe.getMessage());
}

try {
    Account a = null;
    System.debug(a.Name);
} catch (NullPointerException npe) {
    System.debug('Tried to use a null account: ' + npe.getMessage());
}
```

## Catching specific vs. generic

You can catch several exception types with separate `catch` blocks, ordered
from most specific to least specific — Apex checks them top to bottom and
runs the first one that matches:

```apex
try {
    insert new Account(); // missing Name
} catch (DmlException de) {
    System.debug('DML problem: ' + de.getMessage());
} catch (Exception e) {
    System.debug('Something else went wrong: ' + e.getMessage());
}
```

Every built-in and custom exception type ultimately extends the base
`Exception` class, so a `catch (Exception e)` block matches *anything* —
useful as a last-resort catch-all, but it hides which specific problem
occurred if it's the only `catch` block you write. Prefer catching the
specific type you expect and reserve a generic `catch (Exception e)` for
genuinely unexpected failures you still want to log rather than crash on.

## getMessage() and friends

Every exception, built-in or custom, supports `getMessage()` (what went
wrong, as text), `getTypeName()` (the exception's class name), and
`getStackTraceString()` (where it happened). `DmlException` adds the
bulk-specific `getDmlMessage(Integer)` and `getNumDml()` methods described
above for inspecting which of several records in a batch DML statement
failed and why.

## Key terms

| Term | Meaning |
|---|---|
| `try` | The block containing code that might throw an exception |
| `catch` | Handles a specific exception type (or the generic `Exception`) thrown in `try` |
| `finally` | Always runs, regardless of whether an exception was thrown or caught |
| `DmlException` | Thrown when a DML statement fails |
| `QueryException` | Thrown on SOQL problems, e.g. a bad singleton assignment |

## Lab

In Execute Anonymous, trigger and catch three different exception types
using the Account object:

```apex
try {
    insert new Account(); // Name is required
} catch (DmlException de) {
    System.debug('Caught DmlException: ' + de.getMessage());
}

try {
    Account none = [SELECT Id FROM Account WHERE Name = 'Zzz-Not-Real-Zzz'];
} catch (QueryException qe) {
    System.debug('Caught QueryException: ' + qe.getMessage());
}

try {
    Account nullAcct;
    System.debug(nullAcct.Name);
} catch (NullPointerException npe) {
    System.debug('Caught NullPointerException: ' + npe.getMessage());
} finally {
    System.debug('Lab finished.');
}
```

Confirm all three `catch` blocks fired and the `finally` message logged
last.

## Check yourself

Why does `catch (Exception e)` match a `DmlException` too? In what order
should you list multiple `catch` blocks when one exception type is a
subtype of another, and why does that order matter?
