# Lesson 11 — Quality Gates

**Chapter 2 · Pipelines in Practice · Lesson 11 of 19**

## What you'll learn

- A precise definition of "quality gate" as a pipeline mechanism, not just a phrase
- The four concrete gates a Salesforce pipeline typically enforces, and how each one is actually implemented
- How GitHub branch protection rules turn a pipeline check into something that can actually block a merge
- Why a gate with no consequence attached isn't really a gate

## What a quality gate actually is

Lesson 4 introduced "quality gate" as one stage in a typical pipeline. This lesson makes it concrete: a quality gate is an automated pass/fail check wired to a real consequence — specifically, the pipeline (or the pull request it's checking) cannot proceed past it on a fail. A step that runs and reports a number nobody acts on isn't a gate; it's a dashboard. The thing that makes it a gate is the enforcement.

## Four gates a Salesforce pipeline typically enforces

- **Code coverage gate.** The platform's own 75% minimum (Lesson 2) is enforced automatically on any production deploy including Apex — you can't bypass it even if you wanted to. A pipeline can enforce a *stricter* number earlier, failing a pull request's check if a parsed coverage report falls under, say, 85%, well before the change ever reaches production.
- **Test pass/fail gate.** Every Apex test in the run must pass; `sf apex run test`'s and `sf project deploy start`'s non-zero exit code on any test failure (Lesson 8) is what actually enforces this at the CLI level.
- **Static analysis gate.** The Salesforce Code Analyzer (Lesson 12) can fail a build on a rule violation above a chosen severity threshold, catching real problems — an empty catch block, an unused variable, a SOQL injection pattern — before a human reviewer even looks at the diff.
- **Validation gate.** A production release gated on a passed `sf project deploy validate` (Lesson 3): no validation job ID, no quick deploy.

## Wiring a check to an actual consequence

A GitHub Actions workflow reports each job as a **check** on the commit or pull request it ran against. On its own, a failing check is just a red X someone could choose to ignore. **Branch protection rules**, configured in the repository's Settings under Branches, are what give a check teeth: a rule can require specific checks to pass before a pull request is allowed to merge into a protected branch like `main`. Once that rule exists, a failing quality gate doesn't just show up as a red X — it makes the "Merge pull request" button unavailable until the check passes (or until someone with override permission explicitly bypasses the rule, which is itself something branch protection can restrict).

## Severity thresholds keep gates from crying wolf

A gate that fails on every minor style nit trains a team to ignore it, which defeats the entire point. This is why static analysis gates (Lesson 12) are usually configured with a severity threshold — failing the build only on, say, "high" or "critical" findings, while lower-severity findings still get reported but don't block the merge. The same logic applies to coverage: a gate set at exactly 75% leaves no margin at all before a production deploy would outright fail on the platform's own rule, so many teams set the CI gate a few points above the platform minimum specifically to catch a coverage regression early, with room to spare.

## Key terms

| Term | Meaning |
|---|---|
| Quality gate | An automated pass/fail check wired to a real consequence that blocks progress on failure |
| Check | A pass/fail status GitHub Actions reports against a specific commit or pull request |
| Branch protection rule | A repository setting requiring specific checks to pass before merging into a branch |
| Severity threshold | The minimum finding severity that causes a static analysis gate to fail the build |

## Lab

For a hypothetical pipeline, design the branch protection rule for `main`: list which checks (name them, e.g. "Apex Tests", "Code Analyzer", "Coverage ≥ 80%") must pass before merge, and specify one severity threshold for your static analysis gate and one coverage percentage for your coverage gate, each with a one-sentence justification for the number you picked.

## Check yourself

Can you explain the difference between a check that merely reports a result and a check that functions as an actual quality gate? Can you name all four quality gates this lesson describes and say, for each, what specifically happens on a failure?
