# Lesson 9 — Automated Linting & Static Analysis

**Chapter 2 · CI/CD for Smart Contracts · Lesson 9 of 29**

## What you'll learn

- The difference between a linter (style/convention) and a static analyzer (behavior/vulnerability patterns)
- Real `forge fmt --check` and Solhint usage for Solidity style
- Why linting belongs in CI as a fast, cheap first gate before the expensive jobs run
- How this lesson's linting layer sets up Lesson 10's much heavier static-analysis layer (Slither, Mythril)

## Two different jobs, often confused

A **linter** checks style and convention — consistent formatting, naming conventions, unused variables, deprecated syntax. It doesn't understand what your contract *does*; it only checks how it's written. A **static analyzer** goes further — it reasons about control flow and data flow to flag patterns that are frequently associated with real vulnerabilities (reentrancy, unchecked external calls, integer issues), without executing the code at all. Lesson 9 covers the first; Lesson 10 covers the second.

## Solidity style: `forge fmt` and Solhint

Foundry ships its own formatter:

```bash
forge fmt --check
```

This was already in Lesson 8's workflow — it fails CI on unformatted code without silently rewriting it. For deeper style and best-practice linting beyond formatting, **Solhint** is the standard Solidity linter, configured per-project:

```bash
npx solhint 'src/**/*.sol'
```

```json
// .solhint.json
{
  "extends": "solhint:recommended",
  "rules": {
    "func-visibility": ["error", { "ignoreConstructors": true }],
    "not-rely-on-time": "warn"
  }
}
```

Solhint rules split into two categories worth knowing: **Security rules** (like `not-rely-on-time`, flagging `block.timestamp` reliance) and **Style Guide rules** (naming conventions, explicit visibility). The security-category rules are a cheap preview of what Lesson 10's heavier tools check in depth — they just don't go nearly as deep.

## Why this runs first, and fast

A CI pipeline with multiple jobs should order them cheapest-and-fastest first. Linting takes seconds and catches an entire category of trivial mistakes (a missing visibility modifier, inconsistent naming) before spending CI minutes on a full fuzz/invariant test run or a Slither scan that takes much longer:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: foundry-rs/foundry-toolchain@v1
      - run: forge fmt --check
      - run: npx solhint 'src/**/*.sol'

  test:
    needs: lint
    runs-on: ubuntu-latest
    # ... Lesson 8's test job
```

`needs: lint` means the expensive `test` job doesn't even start until the cheap `lint` job passes — fail fast, save CI minutes.

## Key terms

| Term | Meaning |
|---|---|
| Linter | Checks style/convention — how code is written |
| Static analyzer | Reasons about control/data flow to flag vulnerability patterns — Lesson 10 |
| Solhint | The standard Solidity linter, with separate security and style rule categories |
| `needs:` | A GitHub Actions job dependency — gates an expensive job behind a cheap one |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why should a linting job run before, and gate, a full test or static-analysis job in the same pipeline?
