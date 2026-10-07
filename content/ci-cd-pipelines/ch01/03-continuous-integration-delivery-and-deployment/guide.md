# Continuous Integration, Delivery & Deployment

"CI/CD" gets used as one word, but it's actually naming up to three distinct practices that build on each other, and the last letter — the "D" — means two completely different things depending on who's talking. This lesson pins down exactly what each term means, using Northbridge Retail's cart service as the running example.

## What you'll learn

- What Continuous Integration (CI) actually requires — it's stricter than "we use a CI tool"
- What Continuous Delivery means, and why it stops just short of production
- What Continuous Deployment means, and how it differs from Delivery by exactly one step
- How to tell which of the three a given pipeline is actually doing

## Continuous Integration (CI)

Continuous Integration means developers merge their work into a shared branch **frequently** — multiple times a day, not once a week — and every merge automatically triggers a build and a test run. The goal is to catch integration problems (two developers' changes conflicting, or one change breaking another's code) within minutes of them happening, not weeks later when nobody remembers which change caused it.

CI has a strict requirement that's easy to skip: the main branch must stay in a releasable state at all times. If Northbridge Retail's cart-service tests fail on `main`, fixing that build is the team's top priority — ahead of any new feature — because every other developer's branch now has a broken foundation to build on. A team that merges often but tolerates a red build for days isn't really doing CI, no matter what tool it uses.

```yaml
# Minimal CI trigger — runs on every push and pull request
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

## Continuous Delivery (CD #1)

Continuous Delivery extends CI one step further: every change that passes CI produces a build that is **always ready to release** — fully tested, packaged, and sitting in an artifact repository — but a human still decides *when* to actually push the button. At Northbridge Retail, a Continuous Delivery pipeline would build and fully test every merge to `main`, producing a deployable container image tagged and ready to go, but a release manager still clicks "deploy to production" on their own schedule (often because of business reasons — a planned maintenance window, avoiding a deploy right before Black Friday — not because the code isn't ready).

## Continuous Deployment (CD #2)

Continuous Deployment removes that last human click. Every change that passes all automated checks deploys to production automatically, with no manual gate. This is the fastest of the three, and the one that demands the most confidence in your test suite and quality gates (Chapter 4 of this course), because there's no human reviewing the release before customers see it.

Most real organizations, including a retailer like Northbridge, run a mix: Continuous Deployment to a staging environment (fast feedback, low risk), and Continuous Delivery — a human-approved gate — for production (Chapter 5 covers exactly this kind of environment promotion).

## Telling them apart

| Practice | Automatic build+test on every merge? | Always release-ready? | Deploys to prod automatically? |
|---|---|---|---|
| Continuous Integration | Yes | Not guaranteed | No |
| Continuous Delivery | Yes | Yes | No — human approves |
| Continuous Deployment | Yes | Yes | Yes — no human gate |

## Key terms

- **Continuous Integration (CI)** — merging code frequently with every merge automatically built and tested, and keeping `main` always releasable
- **Continuous Delivery** — CI plus guaranteeing every passing build is ready to release, with a human deciding when
- **Continuous Deployment** — Continuous Delivery with the human approval step removed; every passing change reaches production automatically
- **Release-ready** — a build that has passed every automated check and could be deployed with no further work
