# Lesson 12 — Testing Exceptions

**Chapter 2 · Testing Well · Lesson 12 of 18**

## What you'll learn

- The standard try/catch/Assert.fail pattern for proving a method throws the right exception
- Why asserting the exception's type matters, not just that *something* was thrown
- How to test DML exceptions raised by validation rules and `addError()`
- Custom exception classes, and why they make tests (and production error handling) more precise

## The standard pattern

Proving a method throws under a specific condition always follows the same shape: call the code inside a `try` block, immediately follow the call with `Assert.fail()` (so the test fails if no exception occurred), and catch the specific exception type you expect, asserting something about it in the `catch` block:

```apex
@isTest
static void withdrawingMoreThanBalanceThrows() {
    Account acc = TestDataFactory.createAccount('Acme Corp');
    acc.Balance__c = 100;
    insert acc;

    try {
        AccountService.withdraw(acc.Id, 150);
        Assert.fail('Expected an InsufficientFundsException when withdrawing more than the balance');
    } catch (InsufficientFundsException e) {
        Assert.isTrue(e.getMessage().contains('insufficient'), 'Error message should explain the problem');
    }
}
```

The `Assert.fail()` line is what separates a real negative test from an accidental false pass: without it, a test that catches a broader exception type, or that simply never throws at all because a bug silently removed the check, would pass for the wrong reason. If `AccountService.withdraw` doesn't throw, execution reaches `Assert.fail()` and the test correctly fails.

## Assert the exception type, not just "it threw"

Catching the generic `Exception` type and asserting nothing about it beyond "something was caught" is barely better than no negative test at all — it would pass equally whether the code threw the specific business exception you intended, or crashed with an unrelated `NullPointerException` from an entirely different bug:

```apex
// Weak — passes for almost any failure, intended or not
try {
    AccountService.withdraw(acc.Id, 150);
    Assert.fail();
} catch (Exception e) {
    // nothing specific asserted
}
```

Catching the specific exception type (`InsufficientFundsException`, not `Exception`) means the test only passes when *that specific* failure occurs — if a refactor introduces an unrelated bug that throws a different exception type instead, the test correctly fails, because the `catch` clause won't match it and the exception propagates up uncaught.

## Testing DML exceptions from validation rules and addError()

Validation rules and `addError()` calls (typically inside trigger handlers) surface as a `DmlException` when the triggering DML statement runs:

```apex
@isTest
static void validationRuleBlocksNegativeAmount() {
    Opportunity opp = new Opportunity(
        Name = 'Bad Deal',
        StageName = 'Prospecting',
        Amount = -50,
        CloseDate = Date.today()
    );

    try {
        insert opp;
        Assert.fail('Expected the validation rule to block a negative Amount');
    } catch (DmlException e) {
        Assert.isTrue(
            e.getMessage().contains('Amount cannot be negative'),
            'DmlException message should include the validation rule error text'
        );
    }
}
```

`DmlException.getMessage()` includes the exact error text defined on the validation rule or passed to `addError()`, which is why checking `.contains(...)` on a distinctive piece of that message (rather than the whole string) is a reliable way to prove the *right* rule fired, not just that the insert failed for some unspecified reason.

## Custom exception classes

Apex lets you define your own exception types by extending `Exception`:

```apex
public class InsufficientFundsException extends Exception {}
```

Defining a dedicated exception type like this — instead of throwing a generic `Exception` everywhere — makes both your production error handling and your tests more precise. Calling code (and tests) can catch exactly the failure they care about without accidentally swallowing unrelated bugs that happen to also throw an `Exception`.

## Key terms

| Term | Meaning |
|---|---|
| `Assert.fail()` | Forces a test failure; placed right after a call expected to throw, so a test fails if no exception actually occurred |
| `DmlException` | The exception type thrown when a DML statement is blocked by a validation rule or an `addError()` call |
| Custom exception class | A user-defined type extending `Exception`, letting code throw and catch a specific, named failure instead of a generic one |
| Exception type assertion | Catching and verifying the *specific* exception type expected, rather than a broad `Exception` catch with no further checks |

## Lab

Define a custom exception class (e.g. `InvalidDiscountException`) and have a method throw it under a specific invalid condition. Write a negative test using the try/`Assert.fail()`/catch pattern that proves the specific exception type is thrown with a message containing a specific piece of text. Then write a second test proving a validation rule or `addError()` call on a standard or custom object throws a `DmlException` with the expected message text.

## Check yourself

Can you explain why `Assert.fail()` placed right after the call under test is essential to a correct negative test? Can you explain why catching the generic `Exception` type and asserting nothing further is a weaker test than catching the specific exception type you expect?
