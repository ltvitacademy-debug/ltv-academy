# Lesson 5 — Gas Snapshot Testing

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 5 of 29**

## What you'll learn

- Why gas cost is a correctness concern, not just a cost concern, for a production contract
- The real `forge snapshot` command and `.gas-snapshot` file format
- How `--diff` and `--check` turn gas cost into something CI can enforce automatically
- The workflow for intentionally updating a snapshot after a real optimization

## Gas cost can regress like any other bug

A refactor that's functionally identical can still quietly add gas cost — an extra `SLOAD`, a redundant external call, a less efficient storage layout. On a contract called thousands of times a day, a silent 10% gas increase is a real cost regression that none of Chapter 1's correctness tests (fuzz, invariant, fork) would catch, because the contract still behaves *correctly* — it's just more expensive. Gas snapshot testing exists specifically to catch this category.

## Creating and reading a snapshot

```bash
forge snapshot
```

This runs your test suite and records every test's gas usage into a `.gas-snapshot` file at the project root:

```
CounterTest:test_Increment() (gas: 31293)
CounterTest:testFuzz_SetNumber(uint256) (runs: 256, μ: 31121, ~: 31277)
```

For a fuzz test, the snapshot records the mean (`μ`) and median (`~`) gas across all runs, not a single number — gas cost can vary by input even within one function.

## Making it a CI gate

Two flags turn this file into an enforceable check, not just a record:

```bash
forge snapshot --diff    # compare current gas usage against the committed snapshot
forge snapshot --check   # exit with an error if any test now uses MORE gas than recorded
```

`--check` is the one that belongs in CI (Chapter 2): it fails the build the moment a PR silently increases gas cost on any tested path, the same way a failing test fails the build.

## The intentional-change workflow

Not every gas increase is a regression — sometimes you're trading gas for a real feature or a necessary safety check, and that's a legitimate reason to accept a higher number. When that's the case, you update the snapshot deliberately and commit the new baseline, rather than letting `--check` block forever:

```bash
forge snapshot
git add .gas-snapshot
git commit -m "Update gas snapshot"
```

That commit makes the gas cost change visible in the PR diff, reviewable like any other change, instead of a silent creep nobody signed off on.

## Key terms

| Term | Meaning |
|---|---|
| `.gas-snapshot` | The committed file recording each test's gas usage as a baseline |
| `forge snapshot --diff` | Compares current gas usage against the committed baseline |
| `forge snapshot --check` | Fails if any test now costs more gas than the baseline — the CI gate |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why would a contract that passes every fuzz and invariant test still need a separate gas snapshot check?
