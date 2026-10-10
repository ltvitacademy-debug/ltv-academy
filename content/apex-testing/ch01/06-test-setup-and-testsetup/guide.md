# Lesson 6 — Test Setup and @TestSetup

**Chapter 1 · Writing Apex Tests · Lesson 6 of 18**

## What you'll learn

- What a `@TestSetup` method is and the exact rollback behavior it gives you
- Why `@TestSetup` exists, versus just repeating setup code (or a factory call) in every test method
- The specific rules and restrictions `@TestSetup` methods are subject to
- When `@TestSetup` is the wrong tool, and a factory call inside each method is better

## What @TestSetup actually does

A method annotated `@TestSetup` runs once, automatically, before every test method in that class executes — you never call it yourself. Any records it inserts are then visible to every test method in the class, as if each method already had that data in place when it started:

```apex
@isTest
private class OpportunityServiceTest {

    @TestSetup
    static void makeData() {
        Account acc = TestDataFactory.createAccount('Acme Corp');
        insert acc;

        Opportunity opp = new Opportunity(
            Name = 'Big Deal',
            AccountId = acc.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30)
        );
        insert opp;
    }

    @isTest
    static void closingSetsCloseDateToToday() {
        Opportunity opp = [SELECT Id FROM Opportunity LIMIT 1];
        OpportunityService.closeAsWon(opp.Id);
        // assertions...
    }

    @isTest
    static void closingAlreadyClosedThrows() {
        Opportunity opp = [SELECT Id FROM Opportunity LIMIT 1];
        // this method sees the SAME originally-inserted Opportunity,
        // not whatever closingSetsCloseDateToToday did to it
    }
}
```

The critical detail is the rollback behavior: data created in `@TestSetup` is rolled back once, at the end of the entire test class's execution — not after each individual test method. But if one test method modifies or deletes that shared data, those changes are rolled back after that specific method finishes, so the next test method always sees the original, unmodified setup data, never whatever a previous method left behind. This is what makes `@TestSetup` safe to share across many test methods: each method effectively gets its own clean copy of the setup data, without the overhead of re-inserting it from scratch for every single method.

## The rules

`@TestSetup` methods come with a specific, fairly short list of restrictions:

- A test class can have **only one** `@TestSetup` method.
- It must be a `static` method on a test class, taking no arguments and returning no value — the same shape as an `@isTest` method, just with the `@TestSetup` annotation instead.
- It runs before **every** test method in the class, with no way to opt a specific method out.
- It is **not supported** in a class (or on a test method) using `@isTest(SeeAllData=true)` — `@TestSetup` depends on the default data isolation that `SeeAllData=true` turns off.
- `@TestSetup` has been available since API version 24.0, so it's supported in essentially every org you'll work in today.

## @TestSetup versus calling a factory directly

`@TestSetup` and a `TestDataFactory` call aren't competitors — they solve different problems and often get used together, exactly as the example above does (`makeData()` calls `TestDataFactory.createAccount`). Use `@TestSetup` when most or all of the test methods in a class need the *same* baseline data — the same Account, the same base Opportunity — before they each do their own distinct thing to it. Skip `@TestSetup` and call the factory directly inside a test method when that method needs data specifically shaped for just that one scenario (an Account missing a required field, specifically, to test a validation error) that would be awkward or misleading to put in shared setup.

A practical tell: if you find yourself writing `if` logic inside `@TestSetup` to create different data for different test methods, that's a sign the data isn't actually shared and belongs in each method (or its own factory call) instead.

## Key terms

| Term | Meaning |
|---|---|
| `@TestSetup` | Annotation on a static, no-argument method that runs once before every test method in the class, creating shared baseline data |
| Setup data rollback | `@TestSetup` data rolls back once at the end of the class; any method-level changes to it roll back after that method, so every method sees the original state |
| One-per-class rule | A test class may have at most one `@TestSetup` method |
| `SeeAllData=true` incompatibility | `@TestSetup` methods are not supported in a class or method using `@isTest(SeeAllData=true)` |

## Lab

Take the `OpportunityServiceTest` class you've been building across Lessons 2–4. Add a `@TestSetup` method that creates one shared Account and one shared Opportunity using your `TestDataFactory`. Rewrite at least two existing test methods to query that setup data instead of inserting their own. Then write a third test method that updates the shared Opportunity's `StageName`, and a fourth method, listed after it, that re-queries the Opportunity and confirms it still sees the original `StageName` — proving the rollback-per-method behavior for yourself.

## Check yourself

Can you explain exactly when data created in `@TestSetup` gets rolled back, and why that's different from data a test method inserts itself? Can you state at least two of the restrictions on `@TestSetup` methods, and describe a scenario where you'd deliberately choose a direct factory call inside a test method instead of putting that data in `@TestSetup`?
