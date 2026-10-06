# Lesson 6 — Test Coverage, & What It Doesn't Tell You

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 6 of 29**

## What you'll learn

- The real `forge coverage` command and what line/statement/branch/function coverage each actually measure
- How to generate an LCOV report for CI or an external coverage dashboard
- Why 100% coverage is a floor, not proof of correctness
- What coverage structurally cannot catch, even at 100%

## Measuring what your suite actually exercises

```bash
forge coverage
```

`forge coverage` compiles your project for source mapping, runs your test suite, and reports which lines, statements, branches, and functions were actually executed by at least one test. Run it with a summary report to see percentages per file:

```bash
forge coverage --report summary
```

For CI integration or an external dashboard (Codecov, Coveralls), generate an LCOV tracefile instead:

```bash
forge coverage --report lcov --report-file lcov.info
```

## Why 100% coverage is a floor, not a guarantee

Coverage answers exactly one question: *did any test execute this line?* It says nothing about whether the test that executed it actually **asserted the right thing**. A test that calls `withdraw()` and asserts nothing at all still counts as "covering" every line inside `withdraw()`. Coverage measures that code *ran*, not that it was *checked*.

That gap is exactly why Chapter 1 built up fuzz testing (Lesson 2) and invariant testing (Lesson 3) as separate disciplines, not as a coverage number to chase:

- **Branch coverage at 100%** still doesn't mean every *combination* of branches across a call sequence was tested — that's what invariant testing checks.
- **Line coverage at 100%** still doesn't mean the boundary values (zero, max uint256, exact threshold) at each line were exercised — that's what fuzz testing checks.
- **Function coverage at 100%** says every function was called at least once — it says nothing about whether it was called from an unauthorized address, which is an access-control test, not a coverage number.

## The right way to use a coverage report

Use coverage as a **map of blind spots**, not a target. A function at 0% coverage is a function nobody has thought about testing at all — that's useful, actionable information. A function at 100% coverage tells you nothing about whether the *assertions* inside those tests are strong. Treat a coverage percentage as the start of a review, not the end of one.

## Key terms

| Term | Meaning |
|---|---|
| `forge coverage` | Reports which lines/statements/branches/functions tests actually executed |
| LCOV | A tracefile format coverage tools and CI dashboards consume |
| Coverage ceiling | 100% coverage proves code ran under test — not that it was correctly asserted |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: why can a function sit at 100% line coverage and still contain an untested, exploitable bug?
