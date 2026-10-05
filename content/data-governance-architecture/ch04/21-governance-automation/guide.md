# Lesson 21 — Governance Automation

**Chapter 4 · Security and Platform Architecture · Lesson 21 of 30**

## What you'll learn

- What governance automation actually means architecturally: policy-as-code checks wired into a running pipeline, not just rules sitting in a repository
- Three places automated governance checks actually get inserted: CI/CD pipelines, scheduled compliance scans, and event-triggered checks
- Detection vs. automated remediation, and why most real architectures deliberately start with detection only
- How this lesson closes Chapter 4 by connecting policy as code (Lesson 19) to the platforms that enforce it (Lesson 20)

## From policy as code to policy enforced automatically

Lesson 19 covered writing governance rules as code. Governance automation is what happens next: that code has to actually run, against real resources, on some trigger, without a human remembering to run it manually. The architecture question this lesson answers is where and when those checks actually fire.

## Three places automated checks get inserted

- **CI/CD pipeline checks** — when a data pipeline or infrastructure change is proposed (a pull request), an automated policy check runs against the proposed change before it's allowed to merge — the same place application teams already run tests and linters, now running a policy-as-code check instead.
- **Scheduled compliance scans** — a job runs on a schedule (nightly, weekly) against everything already deployed, checking for policy drift: someone manually granted an access or changed a setting after the fact, outside any pipeline, and the scheduled scan is what actually catches it.
- **Event-triggered checks** — a change event itself (a new table created, a permission granted) triggers an immediate check, closer to real time than a schedule. This is the "push"/active-metadata pattern from Lessons 12 and 16, applied specifically to policy enforcement rather than just cataloging.

```
- name: governance-policy-check
  run: opa eval -i resource.json -d policy/ "data.governance.access.allow"
  continue-on-error: false
```

An illustrative CI pipeline step running an OPA policy check — the governance check runs in exactly the same pipeline as the application's own tests, and a failing check blocks the merge the same way a failing test would.

## Detection vs. automated remediation

- **Detection-only** — the automated check finds a violation and reports it (an alert, a ticket, a dashboard flag). A human still decides what to do and acts on it.
- **Automated remediation** — the system doesn't just report the violation, it fixes it directly: revoking an over-broad grant, removing an exposed endpoint, with no human in the loop at the moment of the fix.
- Most real governance automation architectures start with detection-only, and move only specific, well-understood, low-risk checks to automated remediation over time. An automated fix that's wrong, applied with no human reviewing it, can cause its own outage. Treat remediation as something a specific check earns after its detections have proven reliable, not as a default you reach for immediately.

## Closing Chapter 4

Chapter 4 moved from the broad shape of security architecture (Lesson 17) to specific access-control mechanisms (Lesson 18), to writing those mechanisms as versioned code (Lesson 19), to seeing how four real platforms actually implement all of it (Lesson 20), to this lesson's question of how that code actually gets run, continuously, without a human remembering to run it. Chapter 5 moves from architecture into strategy: how an organization actually plans, sequences, and documents a governance program using everything Chapters 1 through 4 covered.

## Key terms

| Term | Meaning |
|---|---|
| Governance automation | Policy-as-code checks wired into a pipeline or schedule so they run without manual action |
| CI/CD policy check | An automated governance check run against a proposed change before it merges |
| Scheduled compliance scan | A recurring job checking already-deployed resources for policy drift |
| Event-triggered check | A check fired immediately by a change event, rather than on a schedule |
| Detection-only | Reporting a violation without the system fixing it automatically |
| Automated remediation | The system fixing a detected violation itself, with no human in the loop |

## Lab

For one policy you've already written or seen (from Lesson 19's examples, or elsewhere), decide where you'd insert its automated check first: a CI/CD pipeline, a scheduled scan, or an event trigger. Justify your choice in one or two sentences based on how urgently that specific policy needs to be caught.

## Check yourself

Can you name the three places automated governance checks get inserted, explain the difference between detection-only and automated remediation, and explain why most real architectures deliberately delay moving a check from detection to remediation?
