# GitHub Actions for ML

Lesson 14 gave the churn project thirteen tests. Tests that only run when someone remembers to run them are a suggestion, not a safeguard. GitHub Actions closes that gap: on every pull request, a fresh machine checks out the code, installs the pinned libraries, trains, and runs the tests, and the pull request shows a red or green result. You already know workflows, jobs, and steps from the Git, GitHub & CI/CD course, so this lesson does not re-teach them. It applies them to an ML project and points out what is different when the thing being built is a model.

## What you'll learn

- How to write a workflow that trains a model and runs the Lesson 14 tests
- Which ML-specific choices matter: Python version, caching, data, and artifacts
- How to pass a trained model from one job to the next
- What we could and could not verify without GitHub

## The workflow

This file lives at `.github/workflows/ci.yml` in the `churn-service` repository. First, the triggers and safety settings:

```yaml
name: churn-ci

on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

It runs on pull requests, on pushes to `main`, and on demand (`workflow_dispatch`). The token gets read-only access, and `concurrency` cancels an older run when a newer commit lands on the same branch, which saves minutes.

Then the `test` job:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-python@v7
        with:
          python-version: "3.10"
          cache: pip
          cache-dependency-path: requirements*.txt
      - name: Install pinned dependencies
        run: pip install -r requirements.txt -r requirements-dev.txt
      - name: Train on the small synthetic dataset
        run: python train.py
      - name: Run data, code and model tests
        run: python -m pytest -q
```

`requirements-dev.txt` holds one line, `pytest==8.4.2`.

## What is different for ML

- **Match the Python version to training and Docker.** Our pins include scikit-learn 1.1.2, whose builds stop at Python 3.10, and the Dockerfile uses `python:3.10-slim`. So the workflow says `"3.10"`, not "latest". CI should run the same stack as production.
- **Cache the slow install.** Setting `cache: pip` makes `setup-python` restore pip's download cache between runs, keyed on your dependency files (`cache-dependency-path` tells it to hash both requirements files). Heavy libraries reinstall in seconds instead of minutes.
- **CI needs data, but not your real data.** Our dataset is synthetic and seeded, so `train.py` regenerates it. With real data, use a small committed sample or pull a tiny extract from your data store with credentials kept in GitHub **secrets**, never in the file.
- **Keep CI cheap.** Pull-request runs should take minutes. Full retraining on large data belongs in a separate scheduled or manual workflow, possibly on other hardware; check GitHub's docs for the runner types available to you.

## Passing a model between jobs

Each job starts on a clean machine, so files do not carry over. **Artifacts** do:

```yaml
      - name: Keep the trained model for later jobs
        uses: actions/upload-artifact@v7
        with:
          name: churn-model
          path: models/
          if-no-files-found: error
          retention-days: 14

  package:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/download-artifact@v8
        with:
          name: churn-model
          path: models/
      - run: docker build -t churn-service:${{ github.sha }} .
```

`needs: test` means `package` starts only if `test` passed, and the `if` limits image builds to `main`. The image is tagged with the commit hash, so every image traces back to the code that produced it (the exact-tag habit from Lesson 13). Artifacts are stored temporarily, controlled by `retention-days`.

## What we actually verified

This is important, so plainly: **we did not run this on GitHub.** What we did do:

1. Parsed the file with PyYAML and checked its structure (every job has `runs-on`, every step has exactly one of `uses` or `run`, `needs` points to a real job). One quirk you will meet: PyYAML follows YAML 1.1, so the bare key `on` loads as the boolean `True`. GitHub does not care, but your own scripts might.
2. Wrote a tiny local runner that executes the `test` job's `run:` steps in a fresh copy of the project. Result: training printed `test AUC 0.802`, then `13 passed`.
3. Found a real bug that way. In a clean checkout there is no `models/` folder, and the original `train.py` crashed with `FileNotFoundError`. The fix was one line, `Path("models").mkdir(exist_ok=True)`. Your laptop hides bugs like this; a clean CI machine exposes them.
4. Simulated a bad pull request that changed the model to `LogisticRegression(C=0.01, ...)`. Test AUC barely moved (0.799 versus 0.802), yet the golden test failed: the golden customer's score fell from 0.909 to 0.805. In CI that means a red check and no `package` job.

The action versions above are the major versions shown in each action's README at the time of writing (some docs pages show older ones). Check each action's releases page, and pin a major version.

## Recap

A workflow turns Lesson 14's tests into a gate: install pinned libraries on a clean machine, train, test, and keep the model as an artifact. Match Python versions, cache installs, use small or synthetic data, and put heavy training elsewhere. Next, we go beyond "the code works" to "the new model is good enough": automated model validation.
