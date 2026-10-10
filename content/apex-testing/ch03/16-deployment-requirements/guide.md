# Lesson 16 — Deployment Requirements

**Chapter 3 · Test Strategy · Lesson 16 of 18**

## What you'll learn

- The exact checklist Salesforce enforces before Apex can deploy to production
- Why "all tests pass" is a separate, equally hard requirement from the 75% coverage number
- How running tests through the Developer Console, VS Code, and the Salesforce CLI differ
- What a validation-only deployment is, and why running it before a real deploy reduces risk

## The deployment checklist

Deploying Apex (or packaging it for the AppExchange) requires all of the following to be true at once, per the Apex Developer Guide:

1. **At least 75% of Apex code is covered by tests**, computed org-wide — not per class.
2. **Every trigger has at least some test coverage** of its own, independent of the org-wide percentage.
3. **All of those tests complete successfully.** A single failing test blocks the deployment, regardless of how high overall coverage is.
4. **All classes and triggers being deployed compile successfully.**

Items 1 and 3 are easy to conflate but are genuinely separate gates: a codebase can sit comfortably above 75% coverage and still fail to deploy because one previously-passing test now fails after a change — and a codebase can have every test passing and still fail to deploy because coverage dipped under 75%. Both conditions have to hold simultaneously.

## Where test runs actually happen

- **Setup → Apex Test Execution** lets you select specific test classes (or all of them) and run them directly in the org, showing pass/fail and coverage per class once finished.
- **Developer Console's Test menu** runs selected test classes and shows results, overall coverage, and per-line coverage highlighting in the code editor — the fastest feedback loop while actively writing tests.
- **VS Code with Salesforce Extensions** runs Apex tests from the command palette (or inline "Run Test" codelens above each test method), surfacing coverage directly in the editor gutter.
- **Salesforce CLI (`sf apex run test`)** runs tests from the command line, which is how CI pipelines typically trigger test runs as part of an automated deployment process, producing machine-readable output a pipeline can parse for pass/fail and coverage thresholds.

## Validation-only deployments

A validation-only deployment runs every check a real deployment would — compiling all metadata, running the required tests, computing coverage — without actually committing any of the changes to the target org. This exists specifically so a team can catch a coverage shortfall or a failing test *before* attempting the real deployment, especially valuable before deploying to production, where a failed deployment attempt (beyond just being blocked) can cost real time in a release window. Running a validation deployment first, confirming it's clean, and then deploying for real (sometimes using a quick-deploy of that already-validated result) is standard practice on any team deploying Apex regularly.

## What doesn't help you here

Two mistakes worth calling out directly, since they come up constantly for teams new to Salesforce deployment:

- **Deploying with `--test-level RunSpecifiedTests` listing only the tests for the classes you changed** can get you past validation locally while still leaving an org-wide average computed across everything, including classes you didn't touch — a shortfall elsewhere in the org can still block you even though "your" tests all passed.
- **Writing throwaway tests purely to hit 75%**, without real assertions (Lesson 4) or real coverage of branches (Lesson 5), satisfies the deployment gate exactly once and leaves you no safer against the next regression — the whole point of the gate is to approximate "this code is actually tested," and gaming the number defeats that purpose while still technically passing.

## Key terms

| Term | Meaning |
|---|---|
| Deployment checklist | The combined requirement of 75% org-wide coverage, per-trigger coverage, all tests passing, and successful compilation |
| Validation-only deployment | A deployment run that performs every check (compile, test, coverage) without committing changes, used to catch problems before a real deploy |
| `sf apex run test` | The Salesforce CLI command used to run Apex tests, commonly invoked from a CI pipeline |
| Quick deploy | Deploying the already-validated result of a prior validation-only deployment, skipping re-running tests |

## Lab

In a sandbox or scratch org, deliberately break one existing test (change an assertion to the wrong expected value) and attempt a deployment of any Apex class. Observe the deployment get blocked and read the specific failure message Salesforce reports. Fix the test, then run a validation-only deployment first, confirm it reports success with a coverage percentage, and only then perform the real deployment.

## Check yourself

Can you list, from memory, all four conditions that must hold at once before Apex can deploy to production? Can you explain why "75% coverage" and "all tests pass" are separate requirements, and give an example of a codebase that would satisfy one but not the other?
