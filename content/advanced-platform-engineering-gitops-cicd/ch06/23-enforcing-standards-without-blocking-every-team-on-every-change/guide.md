# Lesson 23 — Enforcing Standards Without Blocking Every Team on Every Change

**Chapter 6 · Pipeline-as-Code at Scale · Lesson 23 of 4**

## What you'll learn

- Why a policy that lives only on a wiki page gets forgotten, and how
  to make a required standard structurally unskippable instead
- How to wire a reusable workflow's job names into GitHub branch
  protection's required status checks
- How to give teams a safe, visible override path for genuine
  exceptions, instead of either a hard wall or no enforcement at all
- Why centralizing every pipeline change behind one review queue
  creates a different failure mode — teams blocked on a bottleneck

## Policy-as-wiki-page doesn't survive contact with 300 teams

Most organizations' pipeline standards started as a document: "every
service pipeline must run a dependency scan before deploy," "every
production deploy needs two approvals." That document works for the
five teams who read it carefully when it was written. It does not
work for team number two hundred and twelve, hired eighteen months
later, who has never seen it and has no reason to go looking.

The fix isn't writing a better document. It's moving the requirement
out of prose and into the one thing every team's pipeline already
depends on: the shared template from Lessons 21 and 22. If the
required scan step is simply *part of* `build-test-scan.yml@v1`, a
team doesn't need to know the policy exists — they get it the moment
they call the template, the same way they get every other job in it.

## Making the requirement structurally unskippable

Putting a step inside the template is a strong default, but a
determined team can still fork around it, or an Azure DevOps
step-level `template:` include can technically be reordered or
omitted by the consumer. Two things close that gap:

1. Prefer Azure DevOps `extends` over step-level includes for
   anything that must not be optional (Lesson 21) — `extends` governs
   the whole pipeline shape, not just one `steps:` list a consumer
   could choose to ignore.
2. Wire the job's name into **branch protection's required status
   checks**, so GitHub itself refuses to merge a pull request until
   that specific job reports success — independent of whether the
   calling workflow even exists anymore.

```yaml
# the required job lives inside the shared template:
jobs:
  build-test-scan:
    steps:
      - name: Required security scan
        run: npm audit --audit-level=high
```

```text
# GitHub → Settings → Branches → Branch protection rule
Require status checks to pass before merging:
  ✓ run-shared-pipeline / build-test-scan
```

Now the check isn't "did the team remember to add a scan step" — it's
"can anyone merge at all without that job reporting green." That's
the difference between a policy and an enforced standard.

## Give teams a real override path, on purpose

A standard with zero exceptions turns into a standard people quietly
route around. A shared template should expose a narrow, visible
escape hatch for genuine cases — a legacy repo mid-migration, a
library with no dependency manifest to scan yet — rather than forcing
every team through the same rule with no way out:

```yaml
on:
  workflow_call:
    inputs:
      skip-scan-reason:
        required: false
        type: string
        default: ""
    secrets:
      NPM_TOKEN:
        required: true

jobs:
  build-test-scan:
    steps:
      - name: Required security scan
        if: inputs.skip-scan-reason == ''
        run: npm audit --audit-level=high
      - name: Scan skipped — reason on record
        if: inputs.skip-scan-reason != ''
        run: echo "::warning::Scan skipped: ${{ inputs.skip-scan-reason }}"
```

The skip is possible, but it's visible in the workflow run, requires
a reason string that shows up in logs and dashboards, and is nothing
like silently never adding the step in the first place.

## The other failure mode: the central bottleneck

The opposite mistake is routing every pipeline change through one
central platform-team review, for every team, on every change. That
protects consistency but turns the platform team into a queue two
hundred teams wait behind. The standard itself should be enforced
automatically (the template, the required status check); the *review*
should be reserved for changes to the template itself, or for a team
requesting a genuinely new exception pattern — not for every repo
that calls an already-approved template with already-approved inputs.

## Key terms

| Term | Meaning |
|---|---|
| Required status check | A branch protection rule naming a specific CI job that must report success before a PR can merge |
| Structurally unskippable | A requirement enforced by the platform (template + branch protection) rather than by a team remembering a policy |
| Visible override | A narrow, explicit escape hatch (an input, a logged reason) for genuine exceptions, instead of no exceptions or silent ones |
| Central bottleneck | The failure mode where every team's routine pipeline change waits on one review queue instead of automated enforcement |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
is wiring a job name into branch protection's required status checks
a stronger guarantee than just adding the step to the template, and
why does a standard with zero override path tend to get routed
around rather than followed?
