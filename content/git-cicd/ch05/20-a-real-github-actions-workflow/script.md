# Script — A Real GitHub Actions Workflow, Start to Finish

## Segment 1 (title)

This chapter and the Chapter 6 capstone build on one real project: retail-orders-analytics, a small dbt project with staging and mart models and a handful of dbt tests. Today we write its first real workflow file.

## Segment 2 (code: trigger and job)

Every workflow starts with a trigger. This one runs on every pull request into main, and on every push to main. Below that, one job — build-and-test — running on a fresh Ubuntu virtual machine that GitHub spins up and throws away after the run.

## Segment 3 (code: steps)

Inside that job, four steps in order. Checkout clones the repo onto the empty runner. Setup-python installs a pinned Python version. Then two plain shell commands — pip install dbt, and dbt deps — the exact same commands you'd run on your own laptop.

## Segment 4 (screenshot: Actions tab)

Once this file is committed and pushed, GitHub picks it up immediately. Open the repository and click the Actions tab, right alongside Code, Issues, and Pull requests.

## Segment 5 (screenshot: workflow sidebar)

Inside the Actions tab, the left sidebar lists every workflow file the repository has, named after each one's name field. Click into a specific run for a live, streaming log of every step — a red X on the exact line that failed.

## Segment 6 (outro)

Next lesson: this exact file gets the steps that actually run dbt's models and tests in CI.
