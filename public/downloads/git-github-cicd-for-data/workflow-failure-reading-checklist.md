# Workflow Failure Reading Checklist

From Chapter 5. When a GitHub Actions run fails or behaves
unexpectedly.

## 1. Did the workflow even start?

Check the Actions tab. If the workflow doesn't appear at all for a
push/PR that should have triggered it, this is a **trigger or YAML
syntax problem** — check:
- The `on:` block matches the actual event (branch names, event type).
- The YAML itself is valid (indentation errors are the most common
  cause of a workflow silently not registering at all).

## 2. Did the right job run?

If the workflow started but the wrong job ran (or didn't run), check
each job's `if:` condition against what actually happened:

```yaml
if: github.event_name == 'pull_request'
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

**A single-condition check on `deploy` is a common, dangerous
mistake** — `event_name == 'push'` alone also matches a push to a
non-main branch (including commits added to an open PR's own
branch). Always pair it with the `github.ref` check for a real
production-deploy gate.

## 3. Which step actually failed?

Open the run, find the first red X, read that step's log top to
bottom. The actual cause is almost always visible there, not
somewhere earlier — don't guess, read.

## 4. Classify the failure

| Symptom | Likely cause |
|---|---|
| Workflow doesn't appear in Actions tab at all | YAML syntax error, or `on:` doesn't match the trigger |
| Workflow runs, but the wrong job fires (or doesn't) | `if:` condition gap — check it covers both event AND branch where relevant |
| A specific step fails with a clear error | Read that step's log — usually self-explanatory |
| `dbt deps`/`dbt build` fails with an adapter error | Wrong adapter package installed for the target warehouse |
| A secret appears as empty/undefined | Secret not added in repo Settings, or referenced under the wrong name |

## Before closing out an incident

If a misconfiguration let something happen that shouldn't have (e.g.
deploy ran on a PR), fix the workflow file **and** check whether the
same gap exists in any other workflow in the repository or
organization — a shortened `if:` condition is easy to copy-paste
into a new file.
