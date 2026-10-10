# Lesson 4 — Deployment Pipelines

**Chapter 1 · Automating Delivery · Lesson 4 of 19**

## What you'll learn

- What a "pipeline" means as a concrete sequence of automated stages, not just a buzzword
- The typical stage order a Salesforce deployment pipeline follows, and why the order matters
- Why Git branches and pipeline stages are usually designed together, not independently
- How the stages map onto the CLI commands you learned in Lessons 2 and 3

## A pipeline is a sequence, not a tool

"CI/CD pipeline" gets used loosely, but concretely it means: an ordered sequence of automated stages, where each stage only runs if the previous one succeeded, triggered by some event in version control (a push, a pull request, a merge). GitHub Actions, the tool this course builds with starting in Chapter 2, is one implementation of this idea — but the *shape* of the pipeline is a design decision you make before you write a single line of YAML.

## The typical stage order for a Salesforce pipeline

A pipeline that takes metadata from a developer's feature branch to production typically runs these stages, in this order:

1. **Checkout** — pull the repository's code onto the CI runner. Nothing downstream can happen without this.
2. **Static analysis** — lint the metadata and scan Apex for obvious problems (Chapter 2 covers this with the Salesforce Code Analyzer) before spending time on anything slower.
3. **Authenticate** — log the runner into the relevant target org (Lesson 9).
4. **Deploy to a test environment** — either a real deploy to a lower sandbox, or a validation-only check (Lesson 3), depending on the stage.
5. **Run Apex tests** — either as part of the deploy step itself (`--test-level`) or as a separate `sf apex run test` step, to get the coverage and pass/fail data as its own pipeline output.
6. **Quality gate** — a pass/fail decision point (Chapter 2, Lesson 11) that can block everything downstream if coverage, test results, or static analysis didn't meet the bar.
7. **Deploy (or promote) to the next environment** — sandbox to sandbox, and eventually sandbox to production, using `deploy quick` once a production validation has passed.

Earlier stages are deliberately cheaper and faster than later ones. A static analysis check that takes 20 seconds should run before a full test suite that takes 20 minutes — there's no reason to wait 20 minutes to discover a typo a linter would have caught instantly. This ordering principle — cheap, fast checks first; slow, expensive checks later — is sometimes called "shifting left," and it's one of the main reasons CI/CD pipelines feel fast even though they do more checking than a manual process ever did.

## Branches and pipeline stages are designed together

Which branch a change lives on usually determines which pipeline stages run against it. A common pattern:

- A feature branch gets static analysis and a validation-only check on every push — fast feedback, no real deploy.
- A pull request merging into an `integration` branch triggers a real deploy to a shared integration sandbox.
- A merge into `main` (or a tagged release) triggers validation against production, and — after a deliberate approval — the quick deploy that actually ships it.

This means the number of environments an org has (Lesson 5 and Chapter 3 go deeper on sandbox strategy) and the branching model a team adopts aren't independent decisions. A team that changes its sandbox count without revisiting its branch structure, or vice versa, usually ends up with a pipeline that doesn't match how the team actually works.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline stage | One automated step in a pipeline, gated on the previous stage succeeding |
| Shift left | Running cheap, fast checks before slow, expensive ones in a pipeline |
| Quality gate | A pass/fail decision point that can block later stages |
| Branch-to-environment mapping | The convention tying a specific Git branch to a specific deploy target |

## Lab

Sketch (in a markdown list or diagram) a six-stage pipeline for a two-sandbox team: one shared `integration` sandbox and production. Map each of your six stages to a trigger (a push to a specific branch, a pull request, a tag) and to one of the CLI commands from Lessons 2–3. Justify why you ordered the stages the way you did, using the "cheap and fast before slow and expensive" principle.

## Check yourself

Can you list the typical stage order of a Salesforce CI/CD pipeline from checkout through production deploy, and explain why static analysis should generally run before the Apex test suite rather than after it?
