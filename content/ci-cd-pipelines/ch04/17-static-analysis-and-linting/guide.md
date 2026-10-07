# Static Analysis & Linting

Lesson 16 taught tests to catch *broken behavior*. Static analysis and linting catch something different: code that runs just fine today but is sloppy, inconsistent, or quietly dangerous. Northbridge Retail adds both to the `storefront-api` pipeline not to slow engineers down, but to catch the kind of problem a test suite was never designed to see.

## What you'll learn

- The difference between a linter (style and consistency) and a static analysis tool (bugs and security patterns), without ever executing the code
- A real lint step in GitHub Actions, and what a failing lint run actually blocks
- CodeQL, GitHub's real static analysis engine, and how its findings surface directly on a pull request
- Why "the code runs" and "the code is safe" are two separate questions

## Linting vs. static analysis — two different jobs

Both tools read source code without running it, but they're looking for different things:

- **Linting** checks style and consistency — unused imports, inconsistent indentation, a variable named `x` where the team's convention wants something descriptive. A linter like `ruff` or `eslint` enforces a shared standard so a 20-engineer codebase doesn't read like 20 different styles stitched together.
- **Static analysis** goes further, looking for patterns that are likely bugs or security problems even though the code technically compiles and runs — a SQL query built with raw string concatenation, a secret key hardcoded into a file, a null value that's dereferenced on one code path. GitHub's own engine for this is **CodeQL**.

Neither tool runs the application. Both read the source text (and, for CodeQL, a compiled representation of it) and report findings before anything ships.

## A real lint step for storefront-api

```yaml
      - name: Lint with ruff
        run: ruff check src/
```

That's genuinely the whole step — `ruff` exits non-zero the moment it finds a violation, which fails the job the same way a failing `pytest` call does in Lesson 16. Northbridge Retail runs this as its own job, separate from the test job, so a lint failure and a test failure show up as two distinctly-named checks rather than one job failing for an unclear reason.

## CodeQL: static analysis as a pipeline check

GitHub ships its own static analysis engine, CodeQL, as a workflow that scans every pull request for security and quality patterns. When it finds something, the result attaches to the pull request as a named check — exactly like the test and lint checks, sitting right alongside them:

![Screenshot of the code scanning results check on a pull request, with a link to view all branch alerts highlighted.](/courses/ci-cd-pipelines/ch04/17-static-analysis-and-linting/code-scanning-results-check.png)
*Code scanning runs as its own named check on the pull request — a third gate alongside tests and lint, not a replacement for either.*
Source: [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/triaging-code-scanning-alerts-in-pull-requests)

A high-severity finding can actually fail the check outright, the same way a failing test does — the merge box shows the specific count and severity of new alerts introduced by that pull request, so nobody has to go digging for what broke:

![Screenshot of a pull request's merge box showing the code scanning results check failed, reporting one new alert including one high severity security vulnerability.](/courses/ci-cd-pipelines/ch04/17-static-analysis-and-linting/code-scanning-check-failure.png)
*A high-severity alert can fail the check the same way a broken test does — the count and severity sit right in the merge box.*
Source: [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/triaging-code-scanning-alerts-in-pull-requests)

## Why both, and why in the pipeline

A test suite can pass at 100% and still ship code with an unused import on every line and a SQL injection vulnerability buried in a rarely-tested branch — tests only check what they were written to check. Linting and static analysis look at the *shape* of the code itself, independent of whether anyone wrote a test for that exact path. Running them as pipeline checks, not a once-a-quarter audit, means Northbridge Retail catches both categories of problem on the same pull request where they were introduced — not months later, in production.

## Key terms

| Term | Meaning |
|---|---|
| Linting | Automated checking of code style and consistency (e.g. `ruff`, `eslint`) without running it |
| Static analysis | Automated checking for bug and security patterns in source code without executing it |
| CodeQL | GitHub's built-in static analysis engine, run as a workflow against every pull request |
| Code scanning alert | A finding CodeQL (or another static analysis tool) reports, attached to a specific line of code |
