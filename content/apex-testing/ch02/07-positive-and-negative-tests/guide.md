# Lesson 7 — Positive and Negative Tests

**Chapter 2 · Testing Well · Lesson 7 of 18**

## What you'll learn

- The difference between a positive test and a negative test, and why you need both
- Why validation rules, required fields, and `addError()` calls all need negative-path coverage
- How to assert that an exception or error was correctly raised, not just that nothing crashed
- A simple framework for enumerating the cases a method actually needs covered

## Two kinds of claims a test can make

Every test methods in Chapters 1 implicitly assumed the "happy path" — valid input, expected output. That's a **positive test**: it proves the code does the right thing when everything is set up correctly. A **negative test** proves the opposite side of the same coin: that the code correctly *rejects*, *blocks*, or *errors on* invalid input, a missing required value, or a business rule violation. Both are claims about the same method, and a method is only actually proven correct once both sides are covered.

```apex
// Positive test — the normal, expected path
@isTest
static void discountAppliesForGoldTier() {
    Decimal result = PricingService.calculateDiscount(100, 'Gold');
    Assert.areEqual(20, result, 'Gold tier should get a 20% discount');
}

// Negative test — the rejection/error path
@isTest
static void discountThrowsForNullTier() {
    try {
        PricingService.calculateDiscount(100, null);
        Assert.fail('Expected an IllegalArgumentException for a null tier');
    } catch (IllegalArgumentException e) {
        Assert.isTrue(e.getMessage().contains('tier'), 'Error message should mention the invalid tier');
    }
}
```

Teams new to testing frequently write only the positive test, because it's the obvious "does my feature work" check. The negative test is what actually proves the code is production-ready, because real users and real data will eventually hit the input your positive test never considered.

## Why negative tests matter more on Salesforce specifically

A huge amount of Salesforce business logic lives in validation rules, required fields, and Apex calls to `addError()` on a record — all of which exist specifically to reject bad data. If your Apex code inserts or updates a record that should legitimately fail a validation rule, and your test doesn't actually assert that it failed, you have an untested rejection path sitting in production. Consider testing an Apex class that enforces "an Opportunity can't close Won with an Amount of zero":

```apex
@isTest
static void closingWithZeroAmountIsBlocked() {
    Opportunity opp = new Opportunity(
        Name = 'Bad Deal',
        StageName = 'Prospecting',
        Amount = 0,
        CloseDate = Date.today()
    );
    insert opp;

    try {
        OpportunityService.closeAsWon(opp.Id);
        Assert.fail('Expected closing a zero-amount Opportunity to be blocked');
    } catch (DmlException e) {
        Assert.isTrue(
            e.getMessage().contains('Amount must be greater than zero'),
            'Error should explain why the close was blocked'
        );
    }
}
```

Without this test, nothing proves the rejection rule actually fires — a refactor six months from now could silently remove the check, and every existing positive test would keep passing, because none of them ever tried the invalid case.

## Enumerating the cases that need coverage

Before writing tests for a method, it helps to list its input space in plain language, split by whether each case should succeed or fail:

| Case | Expected outcome |
|---|---|
| Valid tier, positive amount | Succeeds — discount calculated correctly (positive) |
| `null` tier | Throws a clear exception (negative) |
| Unrecognized tier string | Returns a sensible default, or throws, per the spec (negative) |
| Negative amount | Rejected (negative) |
| Amount of exactly zero | Depends on the business rule — test the documented behavior either way |

Writing this table before writing code (or before writing tests for existing code) turns "did I think of everything" into a checklist you can tick off, rather than a vague feeling of having "tested it."

## Key terms

| Term | Meaning |
|---|---|
| Positive test | A test proving the code behaves correctly with valid input, the "happy path" |
| Negative test | A test proving the code correctly rejects invalid input, missing data, or a rule violation |
| `addError()` | The Apex method used (typically in trigger handlers) to reject a record with a specific error message |
| Input space enumeration | Listing out the distinct categories of input a method can receive, before writing tests for each one |

## Lab

Pick a method in your org that enforces some business rule (or write a simple one: reject an Opportunity close if `Amount` is null or zero). Write the input-space table shown above for it on paper first. Then write one positive test and at least two negative tests, each asserting the specific exception type and a piece of the error message — not just that *some* exception was thrown.

## Check yourself

Can you explain, in your own words, why a method with only positive tests passing is not actually proven correct? Can you describe why Salesforce's heavy use of validation rules and `addError()` makes negative-path testing especially important compared to a typical backend application?
