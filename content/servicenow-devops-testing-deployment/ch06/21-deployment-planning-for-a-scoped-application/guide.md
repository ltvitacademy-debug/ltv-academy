# Lesson 21 — Deployment Planning for a Scoped Application

**Chapter 6 · Deployment Planning & Rollback · Lesson 21 of 26**

## What you'll learn

- Why a technically correct deployment can still cause real business disruption
- Sequencing: why dependency order matters for a scoped application, not just within one Update Set
- Timing: deploying inside a real, planned maintenance window instead of whenever the build finishes
- Communication: why notifying affected users is part of the deployment, not an afterthought
- How to put sequencing, timing, and communication together into one deployment plan

## The deployment that "worked" and still caused a mess

Every mechanic covered so far in this course — Update Set batching, collision resolution, source control commits, ATF coverage, a green CI/CD pipeline run — can all be executed flawlessly, and the deployment can still go badly. A scoped application can push to Production with zero technical defects and still break someone's afternoon, because deployment planning isn't only a technical question. It's also a sequencing question, a timing question, and a communication question. Skip any one of the three, and "it deployed cleanly" and "it went fine" stop meaning the same thing.

## Sequencing: what has to go first

Chapter 2 covered why Update Sets that depend on each other have to be promoted in the correct order — promote them out of sequence and you get preview errors or, worse, functionality that's silently broken because something it depends on isn't there yet. A scoped application deployment has the exact same problem at a larger scale. If your application depends on a shared script include, a plugin, or a separate application that hasn't been activated on the target instance yet, deploying your application first doesn't fail loudly — it can activate "successfully" and then fail the first time a user actually triggers the feature that needed the missing piece. Planning a deployment means mapping out every real dependency first and confirming each one is already present on the target instance, in the right state, before your application goes in.

## Timing: deploying into a real window, not just "when it's ready"

A build being ready is not the same as it being the right moment to deploy it. This course's companion ITSM implementation course covered two real, practical tools for this: the **Change Calendar**, which gives you a visual view of everything already scheduled on the target instance for a given window, and **Conflict Detection**, which automatically flags when your planned change overlaps in time with another change touching the same Configuration Item. Using both before you commit to a deployment time means checking not just "is my code done" but "is this actually a safe, low-traffic window, and is anything else already scheduled against the same system at the same time." A deployment planned around a real maintenance window, confirmed clear by Conflict Detection, is a fundamentally different risk profile than one dropped in whenever the pipeline happens to go green.

## Communication: telling people before you touch their workflow

The sequencing can be perfect and the timing can be a legitimate low-traffic window, and the deployment can still cause a support ticket storm if the people who use the application have no idea it's happening. Proactively notifying affected users and teams — even a short heads-up that a feature will be briefly unavailable or will look different afterward — is not a courtesy layered on top of deployment planning. It's part of what makes the deployment actually succeed from the business's point of view, not just the platform's. A user who hits an unexpected change mid-task and has no idea why will treat it as an outage, regardless of how clean the underlying deployment was.

## Putting the three together

A real deployment plan for a scoped application answers all three questions before the deployment runs: what has to already be in place on the target instance, and in what order (sequencing); when, specifically, is this safe to run, confirmed against the Change Calendar and Conflict Detection (timing); and who needs to know beforehand, and how will they be told (communication). A plan that only answers the first question is a technical checklist, not a deployment plan.

## Key terms

| Term | Meaning |
|---|---|
| Sequencing | Deploying dependencies in the correct order so nothing activates before what it relies on is already present |
| Change Calendar | A visual view of everything already scheduled on the target instance for a given window |
| Conflict Detection | Automatic flagging of a planned change that overlaps in time with another change on the same Configuration Item |
| Maintenance window | A planned, low-traffic period chosen deliberately for a deployment, not just "whenever the build is ready" |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: give a real example of a deployment that is technically flawless — zero defects, correct sequencing — but still causes business disruption, and say exactly which of the three planning questions (sequencing, timing, communication) it skipped.
