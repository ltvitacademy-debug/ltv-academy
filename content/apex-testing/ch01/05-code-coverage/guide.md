# Lesson 5 — Code Coverage

**Chapter 1 · Writing Apex Tests · Lesson 5 of 18**

## What you'll learn

- The exact org-wide and per-deployment coverage math Salesforce enforces
- Why triggers have their own coverage rule separate from the org-wide percentage
- Where to check coverage numbers in Setup, and what counts versus doesn't count
- Why chasing the coverage number is a different goal from chasing correctness

## The org-wide number

Salesforce's Apex Developer Guide sets the deployment bar at 75%: your org's Apex code, taken as a whole, must have at least 75% of its lines covered by passing unit tests before you can deploy to production or package for the AppExchange. This is computed across your entire codebase, not class by class — so one large, poorly-tested class can drag the org-wide average down even if several other classes individually sit at 100%.

Two details matter for how that percentage is actually computed:

- **`System.debug` statements never count**, whether or not they execute.
- **Test classes and test methods themselves are excluded** from both the numerator and the denominator — coverage is measured only against your real application code.

## Triggers have their own rule

Separately from the 75% org-wide average, Salesforce's testing guidance (reinforced by Trailhead's own testing modules) requires that every trigger have at least some test coverage of its own — a trigger sitting at 0% coverage blocks deployment regardless of what the org-wide average looks like, even if the rest of your code easily clears 75%. The practical implication is that you can't rely on other classes' high coverage to "carry" an untested trigger; each trigger needs its own test proving it actually runs.

## Where to check coverage

In Setup, the Apex Classes page lists every class alongside a "% Covered" column reflecting the most recent test run. Developer Console's test runner shows the same number per class right after a run, along with which specific lines were and weren't executed — useful for finding exactly which branch of an `if` statement your tests never reached. VS Code with Salesforce Extensions shows covered/uncovered lines directly in the editor gutter after running Apex tests from the command palette.

## Coverage is a floor, not a design goal

It's possible — and common for newer Apex developers — to write a test that hits every line of a method purely by calling it once with "happy path" data, satisfying the coverage percentage without the test actually proving the behavior is correct. Consider:

```apex
public static Decimal calculateDiscount(Decimal amount, String tier) {
    if (tier == 'Gold') {
        return amount * 0.20;
    } else if (tier == 'Silver') {
        return amount * 0.10;
    }
    return 0;
}
```

A single test that calls `calculateDiscount(100, 'Gold')` and asserts the result is `20` executes two of the four lines in this method — the `if` condition and its return. It leaves the `Silver` branch and the fallback `return 0` completely unexercised, even though code coverage tooling might still report a reasonably high percentage for the class overall if other tests happen to touch those lines incidentally. Coverage counts *executed* lines, not *correctly tested* behaviors — a method can be heavily covered by tests that never actually assert anything meaningful about what it returns, which is exactly why Lesson 4's point about real assertions matters as much as the coverage number itself.

The fix isn't a trick — it's writing a test for each real branch: one for `Gold`, one for `Silver`, one for an unrecognized tier, each with its own assertion on the specific expected value. That naturally drives coverage up as a side effect of actually proving the code correct, rather than as the goal itself.

## Key terms

| Term | Meaning |
|---|---|
| Org-wide code coverage | The percentage of all non-test Apex lines in the org executed by passing tests; must be at least 75% to deploy to production |
| Per-trigger coverage requirement | The separate rule that every trigger must have some test coverage of its own, regardless of the org-wide average |
| `% Covered` | The column on Setup's Apex Classes page showing each class's coverage from the most recent test run |
| Coverage vs. correctness | The distinction between a line merely executing during a test run and that line's behavior actually being verified by an assertion |

## Lab

In a Developer Edition or scratch org, find (or write) a method with at least one `if`/`else if`/`else` branch, similar to `calculateDiscount` above. Write a test that only exercises the first branch and check the class's coverage percentage in Setup → Apex Classes. Then add tests for every remaining branch, each with its own assertion on the specific expected value, and re-check the coverage percentage. Note how much it changed, and identify which specific lines moved from uncovered to covered.

## Check yourself

Can you state both coverage rules Salesforce enforces — the org-wide percentage and the per-trigger rule — and explain why a class with 100% coverage elsewhere cannot make up for a 0%-covered trigger? Can you explain, using the `calculateDiscount` example, how a method can show reasonably high coverage while still having an entire branch that's never actually been proven correct?
