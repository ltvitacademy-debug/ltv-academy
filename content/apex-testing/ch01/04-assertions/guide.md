# Lesson 4 — Assertions

**Chapter 1 · Writing Apex Tests · Lesson 4 of 18**

## What you'll learn

- The difference between the older `System.assert*` methods and the modern `Assert` class
- The specific methods available on each, and when to reach for each one
- Why a test with no assertions can still pass and still be worthless
- How to use the optional message argument to make a failure easy to diagnose

## A test without assertions proves nothing

It's entirely possible to write an `@isTest` method that inserts a record, calls a method, and never checks anything about the result. That test will pass every single time — right up until the code it's "testing" is completely broken, because nothing in the test ever looks at the outcome. An assertion is the part of the test that actually makes a claim: "this value should equal that value," "this condition should be true," "this variable should be null." Without at least one real assertion tied to the behavior you care about, a green checkmark on a test run tells you nothing except that the code didn't throw an unhandled exception.

## The classic System.assert methods

The original way to make assertions in Apex is a small set of static methods on the `System` class:

```apex
System.assert(condition, optionalMessage);
System.assertEquals(expected, actual, optionalMessage);
System.assertNotEquals(notExpected, actual, optionalMessage);
```

- `System.assert(condition)` fails the test unless `condition` evaluates to `true`.
- `System.assertEquals(expected, actual)` fails unless `expected` and `actual` are equal — note the order: expected value first, actual value second, which matters for reading a failure message correctly.
- `System.assertNotEquals(notExpected, actual)` fails if the two values turn out equal.

These methods still compile and run correctly in current Apex, and you'll see them throughout existing codebases.

## The modern Assert class

Salesforce's current Apex Reference Guide documents a dedicated `Assert` class, which is now the recommended way to write assertions in new code. It offers more specific, readable methods instead of one general-purpose `assertEquals` for everything:

```apex
Assert.areEqual(expected, actual, optionalMessage);
Assert.areNotEqual(notExpected, actual, optionalMessage);
Assert.isTrue(condition, optionalMessage);
Assert.isFalse(condition, optionalMessage);
Assert.isNull(value, optionalMessage);
Assert.isNotNull(value, optionalMessage);
Assert.fail(optionalMessage);
```

`Assert.areEqual` and `System.assertEquals` do the same job; the newer class just gives you named methods like `isNull` and `isTrue` instead of making every boolean check look like an equality check. `Assert.fail()` is useful inside a `try/catch` block, when you expect an exception and want to force a failure if the code under test didn't actually throw one — covered further in Lesson 12.

```apex
@isTest
static void defaultingIndustrySetsOtherWhenBlank() {
    Account acc = new Account(Name = 'Test Co');
    insert acc;

    AccountService.setDefaultIndustry(new List<Id>{ acc.Id });

    Account updated = [SELECT Industry FROM Account WHERE Id = :acc.Id];
    Assert.areEqual('Other', updated.Industry, 'Industry should default to Other when left blank');
    Assert.isNotNull(updated.Industry, 'Industry should never be left null after defaulting runs');
}
```

Either style — `System.assert*` or `Assert.*` — is acceptable and you'll encounter both in real codebases; this course uses both interchangeably across lessons so you're comfortable reading either, but defaults to the modern `Assert` class in lessons introducing new code.

## Use the message argument

Every assertion method accepts an optional trailing `String` message. On a small test class this feels unnecessary — you can just open the failing test and read the three lines around it. On a large test class, or in a CI pipeline where you only see a log of pass/fail lines, a clear message is the difference between immediately knowing what broke and spending ten minutes reopening the test file to figure it out. `Assert.areEqual('Other', updated.Industry, 'Industry should default to Other when left blank')` tells you the exact expectation that failed, without needing the source code open at all.

One important behavior to know: when an assertion fails, it halts execution of that test method immediately with a fatal error — you cannot catch an assertion failure with a `try/catch` block, even though it's technically logged as an exception. Any assertions after the failed one in that same method simply never run.

## Key terms

| Term | Meaning |
|---|---|
| Assertion | A statement in a test that makes a specific, checkable claim about the code's behavior |
| `System.assertEquals(expected, actual)` | The classic Apex assertion method; fails the test if the two values aren't equal |
| `Assert` class | The current, recommended Apex class for assertions, with named methods like `areEqual`, `isTrue`, `isNull` |
| Assertion message | The optional trailing string argument that explains what the assertion expected, shown on failure |

## Lab

Take the test method you wrote in Lesson 2 or 3 and add at least two meaningful assertions to it using the `Assert` class — not just checking that no exception was thrown, but checking a specific field value and a specific record count or null/not-null state. Give each assertion a clear message argument. Then deliberately break the logic under test (comment out one line) and confirm the assertion failure message alone tells you what's wrong, without opening the test file.

## Check yourself

Can you explain why a test method that calls the code under test but never asserts anything is considered worthless, even if it passes every time? Can you name at least three methods on the `Assert` class and what each one checks?
