# Lesson 36 — Practice Questions: Monitoring and Deployment

**Chapter 2 · DP-700 Certification Prep · Lesson 36 of 81**

## What you'll learn

- The last Domain 3 practice set: monitoring tools versus deployment
  tools, and why DP-700 likes to blur that line
- Two worked scenario questions distinguishing the Monitoring Hub from
  deployment pipelines, and CI/CD via Git from Fabric's native promotion
  feature
- How this maps back to Fabric & Real-Time Analytics Chapter 3
  (Lessons 15, 16, 45, 52, 53, 65) and Git/GitHub & CI/CD Lessons 16 and 22

## Monitoring answers "what happened"; deployment answers "how did it get there"

Domain 3 splits cleanly into two families of tooling, and DP-700 loves to
put one family's name in an option where the other family is the correct
answer.

| Tool | Answers | Taught in |
|---|---|---|
| Monitoring Hub | "What ran, when, and did it succeed?" — a live view across pipelines, notebooks, and refreshes | Fabric Lesson 16 |
| Observability (logs/metrics/traces) | "Why did it fail, in enough detail to fix it?" | Fabric Lesson 52 |
| Alerts | "Tell someone the moment it fails, without them watching the hub" | Fabric Lesson 53 |
| Deployment pipelines (native Fabric feature) | "Promote this item from Dev to Test to Prod, inside Fabric" | Fabric Lesson 15 |
| Git integration + CI/CD | "Version-control items and automate promotion through a pipeline outside Fabric's UI" | Fabric Lesson 45, Git/CI-CD Lesson 16 |
| Blue-green / canary deployment | "Roll out a change to production gradually, with a fast rollback path" | Fabric Lesson 65 |

The trap: a scenario about *catching a failure* names "deployment
pipelines" as a wrong option, and a scenario about *promoting a change
safely* names "the Monitoring Hub" as a wrong option. Both are real
Fabric features. Neither answers the question actually being asked.

## Worked question 1

**Scenario:** A nightly pipeline has started failing intermittently, and
the team wants to know the moment it fails rather than discovering it the
next morning when a report is stale.

**Tempting wrong answer:** set up a deployment pipeline stage gate. That's
a promotion feature — it controls what code reaches production, not
what happens when a job in production fails.

**Correct answer:** an alert (Fabric Lesson 53) tied to pipeline run
status. The Monitoring Hub (Lesson 16) is where you'd go to *investigate*
after the fact, but the requirement here — "tell someone immediately" —
is specifically what alerting exists for.

## Worked question 2

**Scenario:** A team wants changes to a Fabric notebook tested in a Test
workspace before they reach Production, with a paper trail of exactly
what changed and who approved it.

**Tempting wrong answer:** the Monitoring Hub. It shows you run history,
not code changes or promotion approvals — wrong family entirely.

**Correct answer:** Git integration paired with deployment pipelines
(Fabric Lessons 15 and 45, and Git/CI-CD Lesson 22's "deploying on merge"
pattern). Git integration gives the version history and paper trail;
deployment pipelines (or a CI/CD workflow built on Git) give the
Dev → Test → Prod promotion gate.

## Key terms

| Term | Meaning |
|---|---|
| Monitoring Hub | Fabric's live, cross-item view of what ran and whether it succeeded |
| Alert | A push notification tied to a run status, so no one has to be watching |
| Deployment pipeline | Fabric's native Dev/Test/Prod promotion feature for workspace items |

## Check yourself

You're ready for Lesson 37 when you can sort any DP-700 monitoring-or-
deployment scenario into the right family first — "did something break"
versus "how does a change get promoted" — before even reading the options.
