# Automated Testing in Pipelines

Chapter 4 moves on from pipelines that merely run to pipelines that actually protect production. At Northbridge Retail, a developer pushing a change to the checkout service used to mean "it worked on my laptop" — and nothing more. This lesson makes testing a pipeline gate: a machine, not a person's memory, decides whether a change is safe enough to move forward.

## What you'll learn

- Why tests belong *inside* the pipeline, not as a step a developer is trusted to remember
- The test pyramid — unit, integration, and end-to-end tests — and why the pipeline should run them in that order
- What a real GitHub Actions test step looks like, and how its exit code becomes a pass/fail gate
- How a test result actually surfaces in the GitHub UI, on a commit and on a pull request

## Why the pipeline runs the tests, not the developer

Before Northbridge Retail had CI, "did you run the tests" was a question asked in code review — after the fact, and only if someone remembered to ask. A pipeline removes the question entirely: every pull request against the `storefront-api` repository triggers a job that runs the test suite automatically, and the result is visible to everyone before a human ever opens the diff. Nobody has to trust that a teammate ran `pytest` locally; the commit itself carries the proof.

## The test pyramid, and why order matters

Most real test suites aren't one kind of test — they're three, in increasing cost:

- **Unit tests** — test one function or class in isolation, with no database or network. Hundreds can run in seconds.
- **Integration tests** — test how several pieces work together, often against a real (or realistic) database. Slower, fewer of them.
- **End-to-end (E2E) tests** — drive the whole application like a real user would, often through a browser. Slowest, and the fewest of them exist.

A well-built pipeline runs them in that order and stops at the first failure. If a unit test fails, there's no reason to spend ten minutes spinning up a browser for an E2E suite — the pipeline fails fast and gives the developer an answer in seconds instead of making them wait for a run that was always going to fail anyway.

## A real test step in GitHub Actions

Here's the job Northbridge Retail actually runs on every pull request to `storefront-api`:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest tests/unit --maxfail=1
      - name: Run integration tests
        run: pytest tests/integration
```

Each `run:` command's exit code is what the pipeline actually checks. `pytest` exits `0` when every test passes and non-zero the moment any test fails — the workflow engine doesn't parse test output itself, it just reacts to that exit code. `--maxfail=1` on the unit tests stops the suite at the first failure instead of grinding through hundreds of tests that are likely to fail for the same root cause.

## Where the result actually shows up

Once this workflow runs, its result attaches directly to the commit — a small icon next to the commit SHA that's green, red, or yellow while running:

![Screenshot of a list of commits, each with a colored status icon showing a passing or failing check next to the commit message.](/courses/ci-cd-pipelines/ch04/16-automated-testing-in-pipelines/commit-list-statuses.png)
*Every commit that triggered a workflow run carries its own pass/fail indicator — no need to open the Actions tab just to check.*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

On a pull request specifically, the **Checks** tab rolls every job from every workflow into one summary, so a reviewer can see at a glance whether `test` passed before even opening the **Files changed** tab:

![Screenshot of the Checks tab of a pull request, listing check results with a dropdown to select which commit's checks to view.](/courses/ci-cd-pipelines/ch04/16-automated-testing-in-pipelines/checks-summary-for-various-commits.png)
*The Checks tab is where "did the tests pass" gets answered for the whole pull request, across every commit pushed to it.*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

GitHub also lets a repository require that status check to pass before the **Merge** button is even clickable — Chapter 6 covers branch protection rules in detail, but the test step you write here is what that rule ends up pointing at.

## Key terms

| Term | Meaning |
|---|---|
| Unit test | Tests one function or class in isolation; fast, and there are many |
| Integration test | Tests how multiple components work together, often against a real database |
| End-to-end (E2E) test | Drives the whole application like a real user; slow, and there are few |
| Test pyramid | The shape a healthy test suite should have: many unit tests, fewer integration, fewest E2E |
| Status check | A pass/fail result attached to a commit or pull request by a CI workflow |
