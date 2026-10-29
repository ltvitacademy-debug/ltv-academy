# Lesson 24 — Rolling Out a Pipeline Change to Hundreds of Repos

**Chapter 6 · Pipeline-as-Code at Scale · Lesson 24 of 4**

## What you'll learn

- Why a pipeline-template change deserves the same staged rollout
  discipline as a risky application deployment, not a single big-bang
  push to every consumer
- How to structure a canary ring, an early-adopter ring, and general
  availability for a template change across hundreds of repos
- What to actually watch for while a canary is live, and what counts
  as a signal to stop
- How automated PRs (a bot bumping a pinned version string across
  many repos) replace manually editing hundreds of workflow files

## Why this needs a rollout strategy at all

By this point in the chapter, your pipeline logic lives in one
versioned template repo (Lesson 21), tagged with semantic versioning
and documented in a changelog (Lesson 22), with standards baked in as
defaults (Lesson 23). That's exactly what makes a bad release
dangerous in a new way: instead of breaking one repo, a bad `v2.0.0`
tag can break every one of the three hundred repos that move onto it
at once. The version pinning from Lesson 22 is what makes a *staged*
rollout possible in the first place — nothing forces all three
hundred consumers to move on the same day.

## Ring-based rollout: canary, early adopters, GA

Borrow the same ring structure used for risky application releases
(Lesson 18's canary deployments) and apply it to the template itself:

```text
Ring 0 — Canary (3-5 repos)
  Low-traffic, low-risk repos, ideally owned by the platform team
  itself or a team that opted in. Pin them to the new tag first:
  @v2.0.0-beta.1

Ring 1 — Early adopters (~10% of repos)
  Teams that asked to be early, or repos representative of the
  org's common stacks. Move them once Ring 0 has run clean for a
  full day of normal traffic.

Ring 2 — General availability
  Everyone else, moved over days or weeks, not in one commit.
  The moving @v1 tag (Lesson 22) only gets re-pointed at v2 once
  GA is complete and v1 is formally deprecated.
```

Nobody is forced onto the new major version by surprise — each ring
moves because its tag reference was deliberately changed, exactly the
mechanism Lesson 22 built version pinning to support.

## What to actually watch during the canary

A canary that nobody is monitoring isn't a canary, it's just a
smaller blast radius for the same undetected failure. Watch, for the
duration of the canary window:

- **Run outcome**: did the canary repos' pipeline runs succeed at the
  same rate they did on the old version — not just "did it run," but
  "did it pass."
- **Duration**: did build/test time regress noticeably; a template
  change that quietly doubles CI time is still a real problem even
  when every job goes green.
- **Support channel signal**: a canary team reporting something odd
  informally, before it ever becomes a filed issue, is often the
  first real signal — treat it as one.

```yaml
# a canary repo's workflow, pinned explicitly during the window:
jobs:
  run-shared-pipeline:
    uses: my-org/pipeline-templates/.github/workflows/build-test-scan.yml@v2.0.0-beta.1
```

If any of those signals fire, the response is to stop widening, fix
the template, cut a new beta tag, and re-run the canary — not to push
through to Ring 1 while still investigating.

## Automating the actual rollout: a version-bump bot

Hundreds of repos each need one line changed — the version tag in
their workflow file. Doing that by hand doesn't scale and introduces
its own inconsistency. The standard pattern is a bot (Renovate and
Dependabot both support this for GitHub Actions `uses:` references)
that opens an automated pull request in every repo, bumping the
pinned tag, which each team can review and merge on their own
schedule within the rollout window:

```json
// renovate.json fragment: treat the template's tag like any dependency
{
  "packageRules": [
    {
      "matchManagers": ["github-actions"],
      "matchPackageNames": ["my-org/pipeline-templates"],
      "groupName": "shared pipeline template",
      "schedule": ["before 9am on monday"]
    }
  ]
}
```

That turns "roll out a change to three hundred repos" into "merge
three hundred small, identical, bot-authored PRs over a scheduled
window" — each one independently reviewable, and each one
independently revertible if that one repo hits a problem the canary
didn't catch.

## Key terms

| Term | Meaning |
|---|---|
| Ring-based rollout | Moving consumers onto a new template version in stages — canary, early adopters, general availability — rather than all at once |
| Canary window | The monitored period where a small set of low-risk repos run the new version before it widens further |
| Version-bump bot | Automation (Renovate, Dependabot) that opens a PR per repo to update a pinned dependency or template tag, instead of a human editing every file |
| Blast radius | How much breaks if a given change goes wrong — the entire point of staging a rollout is shrinking it |

## Check yourself

You're ready to move on when you can explain, without looking: why
does version pinning from Lesson 22 make a staged rollout possible at
all, and what should happen the moment a canary repo shows a bad
signal — widen anyway, or stop and investigate?
