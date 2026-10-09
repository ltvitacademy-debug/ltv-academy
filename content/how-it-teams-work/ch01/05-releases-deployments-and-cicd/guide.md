# Releases, Deployments & CI/CD

A change that's passed UAT still has to actually get into Production safely — and stay there.
This lesson covers the machinery that moves code from a Git commit to a live deployment, and the
discipline around planning, approving, and recovering from a release.

## What you'll learn

- What CI/CD actually automates between a commit and a deploy
- The release checklist every real deployment needs
- How teams reduce risk with gradual rollout strategies

![From a Git change to a controlled deployment: Commit (save code in Git), Build (package the change), Test (automated checks), Deploy (promote the version) — with a release checklist covering approval, monitoring, rollback plan, and release notes.](/courses/how-it-teams-work/ch01/05-releases-deployments-and-cicd/cicd-releases.png)

## CI/CD: automating the boring, risky parts by hand

**CI (Continuous Integration)** means every commit automatically triggers a build and a test run —
the moment code is pushed, the pipeline packages it and runs the automated test suite against it,
without a human manually kicking that off. This is what catches "I broke something elsewhere"
before a human ever has to find it by hand.

**CD (Continuous Delivery/Deployment)** means that once a change passes CI, it's automatically
packaged and ready — and in a full Continuous *Deployment* setup, automatically promoted — to the
next environment, right through to Production. The further a pipeline automates toward Production,
the faster changes ship, but also the more a team has to trust its automated tests, since fewer
humans are manually re-checking each release.

## The release checklist

Having a pipeline doesn't mean a release has no judgment calls left in it. A real release still
needs:

- **Approval** — someone with authority signs off that this specific release should go out now
- **Monitoring** — dashboards and alerts watching the system immediately after the change lands
- **Rollback plan** — a known, tested way to undo the change if something goes wrong
- **Release notes** — a record of what changed, for both users and the next engineer who has to
  debug something later

Skipping any of these doesn't make the release faster in any way that matters — it just moves the
cost from "ten minutes writing release notes" to "two hours at 2 AM trying to remember what
changed" if something breaks.

## Reducing risk with how you roll out

Even with CI/CD and a checklist, flipping a change on for 100% of users at once is the riskiest way
to deploy it. Several strategies spread that risk out:

![Deployment strategies for reducing release risk: Blue-Green (two identical environments, traffic flips instantly), Canary (new version ships to a small slice of users first), Rolling (instances updated gradually, a few at a time), Feature Flags (code ships dark, then switched on independently).](/courses/how-it-teams-work/ch01/05-releases-deployments-and-cicd/deployment-strategies.png)

**Blue-green** keeps two identical environments and flips traffic between them instantly, so
rollback is just flipping traffic back. **Canary** sends the new version to a small slice of
real users first, and only widens the rollout once that slice looks healthy. **Rolling** updates
instances a few at a time rather than all at once, so a bad version only ever affects part of the
fleet mid-rollout. **Feature flags** let code ship to Production "dark" — present but switched
off — and get turned on independently of the deployment itself, which is how a team can deploy on
Tuesday and launch on Thursday without a second deployment.

## Key terms

| Term | Meaning |
|---|---|
| CI (Continuous Integration) | Every commit automatically triggers a build and automated test run |
| CD (Continuous Delivery/Deployment) | A change that passes CI is automatically packaged, and optionally promoted, toward Production |
| Rollback plan | A known, tested way to undo a release if something goes wrong after deployment |
| Canary deployment | Releasing a new version to a small slice of users first, before a full rollout |
| Feature flag | A toggle that lets code ship to Production switched off, then be enabled independently of deployment |

## Check yourself

Why is a rollback plan something a team needs even when every automated test in the CI/CD
pipeline passed?
