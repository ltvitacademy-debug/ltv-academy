# Caching & Artifacts

Every run of storefront's workflow starts from a completely empty runner —
`npm ci` downloads the same dependencies from scratch, every single time.
And once the build finishes, its output — a built Docker image's layers, a
test report, a coverage file — disappears with the runner unless something
saves it first. Two separate mechanisms solve these two separate problems.

## What you'll learn

- Why caching speeds up `npm ci` without changing what gets installed
- How a cache key decides when a cache is reused versus rebuilt
- How to upload a build's output as an artifact, and download it later
- Why caching and artifacts solve different problems, not the same one

## Caching dependencies

`actions/cache` saves a directory between runs, keyed by a string you
control:

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

The `key` includes a hash of `package-lock.json`, so the cache stays valid
exactly as long as storefront's dependencies don't change. The moment
someone bumps a package version, the lockfile's hash changes, the key no
longer matches, and `npm ci` rebuilds the cache from a clean download —
correctness always wins over speed. `restore-keys` is a fallback: if no
exact match exists, GitHub restores the most recent cache with that prefix
instead of starting from nothing.

Repository admins can see and manage every stored cache under **Actions →
Caches**:

![Screenshot of the GitHub Actions Caches page, listing cache entries with their branch, size, and last-used date.](/courses/ci-cd-pipelines/ch02/09-caching-and-artifacts/actions-cache-entry-list.png)
*Every cache storefront's workflows have created, with its size and how recently it was used.*
Source: [GitHub Docs — Managing caches](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manage-caches)

## Artifacts: what a run actually produces

A cache is for speeding up the *next* run. An **artifact** is for keeping
what *this* run produced — a build Northbridge Retail wants to inspect or
hand to a later job:

```yaml
- name: Run tests with coverage
  run: npm test -- --coverage

- name: Upload coverage report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
    retention-days: 14
```

Once uploaded, the artifact shows up right on the run's summary page,
downloadable as a zip:

![Screenshot of the Artifacts section of a workflow run summary, listing an artifact named artifact with its file size.](/courses/ci-cd-pipelines/ch02/09-caching-and-artifacts/artifact-drop-down-updated.png)
*Anyone with access to the run can download exactly what that build produced.*
Source: [GitHub Docs — Downloading workflow artifacts](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts)

A later job in the same run can pull an artifact back down with
`actions/download-artifact@v4` — this is exactly how storefront passes a
built Docker image from one job to the next, without rebuilding it.

## Cache or artifact?

- Use a **cache** for anything that speeds up a future run but isn't the
  point of this one — dependencies, build toolchains.
- Use an **artifact** for anything that *is* the point of this run — test
  reports, coverage, a build output another job or a human needs.

## Key terms

| Term | Meaning |
|---|---|
| `actions/cache` | Saves and restores a directory between workflow runs |
| Cache key | The string deciding whether an existing cache is reused |
| `restore-keys` | A fallback prefix used when no exact cache key matches |
| `actions/upload-artifact` | Saves a run's output so it can be downloaded or passed to another job |
| Retention | How many days GitHub keeps an artifact before deleting it |
