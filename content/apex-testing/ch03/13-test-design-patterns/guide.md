# Lesson 13 — Test Design Patterns

**Chapter 3 · Test Strategy · Lesson 13 of 18**

## What you'll learn

- The test pyramid concept applied to a Salesforce codebase
- Data builder patterns beyond the basic factory from Lesson 3
- Why testing through the public interface, not internal implementation details, keeps tests durable
- Parameterized-style testing in Apex, since Apex has no built-in parameterized test runner

## The test pyramid, Salesforce-shaped

The test pyramid is a general software design idea: you want many small, fast unit tests at the base, fewer broader integration tests in the middle, and very few slow, end-to-end tests at the top. On Salesforce, "unit test" almost always means an Apex test that still touches the real database (there's no practical way to fully isolate Apex from SOQL/DML the way some languages mock out a database entirely) — so the useful distinction here is narrower rather than fully absent:

- **Narrow unit tests**: one service method, one trigger handler method, tested directly with a small, specific set of inserted records.
- **Broader integration-style tests**: a full trigger firing through multiple handler classes, or a Flow interacting with Apex via an invocable method, tested end-to-end.
- **Manual or UI-level checks**: clicking through Setup or the Lightning UI — necessary occasionally, but not something you want carrying the bulk of your regression coverage, since it doesn't run automatically on every deploy.

The practical rule: the large majority of your test suite should be narrow, fast Apex tests targeting individual methods and classes, with a much smaller number of broader tests proving the pieces actually work together.

## Builder patterns beyond the basic factory

Lesson 3 introduced a simple static factory method. A step up from that is a **builder** — an object that lets a test construct a record with only the specific fields it cares about overridden, chaining method calls instead of passing a long, hard-to-read parameter list:

```apex
@isTest
public class OpportunityTestBuilder {
    private Opportunity opp = new Opportunity(
        Name = 'Test Opportunity',
        StageName = 'Prospecting',
        CloseDate = Date.today().addDays(30),
        Amount = 1000
    );

    public OpportunityTestBuilder withStage(String stage) {
        opp.StageName = stage;
        return this;
    }

    public OpportunityTestBuilder withAmount(Decimal amount) {
        opp.Amount = amount;
        return this;
    }

    public Opportunity build() {
        return opp;
    }
}

// usage in a test method:
Opportunity opp = new OpportunityTestBuilder().withStage('Closed Won').withAmount(0).build();
```

This reads, at the call site, as a short sentence describing exactly what's different about this particular test's data — "an Opportunity, Closed Won, with Amount zero" — while every field the test doesn't care about silently gets the builder's sensible default.

## Test the public interface, not the internals

A durable test calls the method a real caller would call, and asserts on an outcome a real caller would observe — a returned value, a field on a queried record, an exception. A fragile test reaches into private implementation details (private helper methods, internal field names that could reasonably be renamed in a refactor) to check "how" the method did its job rather than "what" it produced. The practical consequence: if you refactor a method's *internals* without changing its *observable behavior*, a well-designed test suite should not need to change at all. If a harmless internal refactor breaks a dozen tests, that's a sign the tests were coupled to implementation details rather than behavior.

## "Parameterized" testing without a parameterized test runner

Unlike some languages, Apex has no built-in attribute or framework for running the same test logic against a list of input/expected-output pairs automatically. The common workaround is a small loop inside a single test method, iterating over a list of cases you define yourself:

```apex
@isTest
static void discountCalculatedCorrectlyForEachTier() {
    Map<String, Decimal> tierToExpectedDiscount = new Map<String, Decimal>{
        'Gold' => 20,
        'Silver' => 10,
        'Bronze' => 5,
        'Unknown Tier' => 0
    };

    for (String tier : tierToExpectedDiscount.keySet()) {
        Decimal result = PricingService.calculateDiscount(100, tier);
        Assert.areEqual(
            tierToExpectedDiscount.get(tier), result,
            'Wrong discount for tier: ' + tier
        );
    }
}
```

The message argument on the assertion matters more here than almost anywhere else — without it, a failure only tells you the loop failed *somewhere*, not which tier's case actually broke.

## Key terms

| Term | Meaning |
|---|---|
| Test pyramid | The principle of having many narrow unit tests, fewer broader integration tests, and very few manual/UI checks |
| Test builder | An object providing chainable methods to construct test data, overriding only the fields a given test cares about |
| Testing behavior vs. implementation | Asserting on a method's observable outcome rather than its internal mechanics, so refactors don't needlessly break tests |
| Loop-based parameterization | The common Apex workaround for testing many input/output pairs in one method, since there's no built-in parameterized test attribute |

## Lab

Take the `calculateDiscount` method (or an equivalent method in your own org) and write a single test method that loops over a `Map` of tier-to-expected-discount pairs, asserting each one with a message that names the specific tier. Then build a small test builder class for one of your org's standard objects, with at least two chainable `with...` methods, and rewrite an earlier lesson's test to use it instead of inline field assignment.

## Check yourself

Can you explain the difference between a test that targets a method's observable behavior and one that depends on its internal implementation, and why the second kind is more fragile under refactoring? Can you describe how to test several input/output pairs in a single Apex test method, given that Apex has no built-in parameterized test runner?
