# Lesson 16 — Testing Your Own Code

**Chapter 3 · Developer Habits · Lesson 16 of 18**

## What you'll learn

- Why "I ran it once and it looked fine" isn't actually testing
- The idea of a test case, and how to think about which cases are worth writing
- A first look at Apex's `@IsTest` annotation and assertions, previewing a topic a later course covers in depth
- Why Salesforce specifically requires a minimum amount of test coverage before deploying code

## Running code once isn't testing it

Trying a program with one input and seeing a reasonable-looking result tells you it works for that one input — nothing more. **Testing** is the deliberate practice of checking a piece of code against multiple specific scenarios, including the ones most likely to break it, rather than just the first input you happened to try. A method that correctly handles a normal order total might still fail silently on a total of exactly zero, a negative number, or an unusually large one — and you'll never find out unless you deliberately check those cases instead of only the comfortable, obviously-fine one.

## Thinking in test cases

A **test case** is one specific scenario, with a known input and a known expected result, used to check whether code behaves correctly. Good test cases aren't random — they deliberately target the situations most likely to reveal a bug:

- **The typical case** — an ordinary input, to confirm the basic logic works at all.
- **Boundary cases** — values right at the edge of what's valid, like Lesson 5's `orderTotal >= 100` threshold tested at exactly `100`, at `99`, and at `101`.
- **Edge cases** — unusual but legitimate inputs: zero, a negative number where only positive was expected, an empty String, a null value (Lesson 3's reminder that every Apex variable starts as null is exactly why this matters).

Revisiting Lesson 11's `applyDiscount` method, a thorough set of test cases wouldn't just check one normal discount rate — it would also check a rate of exactly `0`, a rate of exactly `1`, and a rate outside the valid range (to confirm the `InvalidDiscountException` actually gets thrown as expected).

## A first look at Apex's own testing tools

Apex has a dedicated way to write and run tests formally, which a later Apex-focused course in this path covers in real depth — but it's worth previewing the shape of it now:

```apex
@IsTest
private class DiscountCalculatorTest {
    @IsTest
    static void testNormalDiscount() {
        Integer result = DiscountCalculator.applyDiscount(100, 0.1);
        System.assertEquals(90, result, 'A 10% discount on 100 should return 90');
    }
}
```

The `@IsTest` annotation marks a class and its methods as test-only code, not part of the application's real logic. `System.assertEquals` checks that an actual result matches an expected one, and fails the test with a clear message if it doesn't — this is the formal version of the "known input, known expected result" test case idea above, made automatic and repeatable rather than something a developer checks by eye.

## Why Salesforce specifically cares about test coverage

Beyond being good general practice, Salesforce enforces a concrete rule: **Apex code generally must have at least 75% test coverage to be deployed to a production org.** This isn't just a bureaucratic gate — it exists because Salesforce's platform is multi-tenant and constantly evolving, and tests are what catch a change (yours, or a platform update) breaking existing logic before it reaches real users. Chasing the percentage itself is the wrong goal, though — code that hits 75% coverage with shallow tests that never check a boundary or edge case gives a false sense of safety. The right goal is coverage that comes from genuinely testing the scenarios most likely to break, with the percentage following as a side effect of doing that well.

## Key terms

| Term | Meaning |
|---|---|
| Testing | Deliberately checking code against multiple specific scenarios, not just one input |
| Test case | One specific scenario with a known input and known expected result |
| Boundary case | A value right at the edge of what's considered valid |
| Edge case | An unusual but legitimate input, like zero, negative, or null |
| @IsTest | Apex's annotation marking a class or method as test-only code |
| Test coverage | The percentage of an org's Apex code actually exercised by tests; Salesforce requires at least 75% to deploy to production |

## Lab

Go back to Lesson 11's `safeDivide` method from that lesson's Lab. Write out, in plain English (no need to write the actual `@IsTest` class), at least four distinct test cases for it: the typical case, a boundary case, an edge case involving zero, and a case that should trigger its exception handling. For each, state the exact input and the exact expected result.

## Check yourself

Can you explain, without notes, the difference between a boundary case and an edge case, with your own example of each? Can you explain why Salesforce's 75% test-coverage requirement, treated as a target to hit with shallow tests, can give a false sense of safety?
