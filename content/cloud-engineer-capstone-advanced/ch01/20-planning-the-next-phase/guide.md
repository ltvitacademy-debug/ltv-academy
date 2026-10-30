# Lesson 20 — Planning the Next Phase of the Platform

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 20 of 26**

## What you'll learn

- Why "the incident is fixed" and "the platform is ready for next season" are two
  different milestones, not one
- How to turn the audit Theo promised in Lesson 19 into an actual scoped plan with a
  defined boundary
- Why this planning conversation surfaces a second, separate tension — speed versus
  cost — before any of the hardening work actually starts
- How to structure a short platform-planning document that a VP of Engineering will
  actually read

## From "fixed" to "ready for next season"

The sale is over, the incident is closed, and leadership's hardest questions got real
answers in Lesson 19. It would be reasonable to treat that as the end of the project — but
Driftwood runs sales like this every quarter, and the next one is already on the calendar.
**Casey Lindqvist** books thirty minutes with Theo to scope what comes next, opening with a
question that reframes the whole remaining chapter of this capstone:

> "We know the platform survived this sale. I want to know what it would take for it to
> *not even come close* to a repeat next time — and what that actually costs us."

That's a genuinely different ask than anything so far in this capstone. Lessons 1 through
18 were about building the platform and then fixing a real problem under pressure. Lessons
19 through 26 are about the less dramatic, equally important work of turning one hard-won
lesson into a platform that's actually more resilient going forward — not just patched.

## Scoping the three real workstreams

Theo brings the promised audit from Lesson 19 into this meeting and uses it to structure
the next phase into three concrete pieces of work, each with a different owner and a
different kind of answer:

| Workstream | What it actually is | Where it lands in this capstone |
|---|---|---|
| **The dashboard/alert audit** | Reviewing every panel and alert threshold that reports a single aggregate across AZs, nodes, or regions, deciding which ones need the same per-dimension breakout the FinOps dashboard just got | Feeds directly into Lesson 23's hardening work |
| **The capacity question** | How much headroom the platform should carry into the next sale, and who decides — this is where Engineering's instinct to over-provision and Finance's instinct to control cost are about to collide | Lessons 21–22 |
| **Documentation and validation** | Making sure the fix, the new dashboard panel, and anything the other two workstreams produce are actually tested together and written down somewhere durable | Lessons 24–25 |

Naming these three as separate workstreams — instead of one vague "harden the platform"
backlog item — matters because each one has a different kind of done: the audit ends with
a reviewed list, the capacity question ends with a defined number everyone agrees to, and
the documentation ends with a document that outlives this particular incident.

## Why the capacity question can't wait for the audit to finish

It would be tidy to sequence this work — finish the audit, then talk about capacity, then
harden, then document. Real planning doesn't get that luxury. Casey already has an opinion
about capacity headed into this meeting, and so does **Dana Whitfield** from the budget
side — which means the capacity conversation is going to happen whether or not the audit is
done yet. Theo's job in this lesson is to scope it honestly as its own workstream with its
own stakeholders, not to let it get absorbed into "hardening" as an afterthought. Lesson 21
picks that conversation up directly.

## What "ready for next season" does NOT mean yet

Scoping this phase also means being explicit about what's intentionally out of bounds for
now, so the plan doesn't silently balloon:

- A full multi-region active-active redesign — out of scope; this phase hardens the
  existing AKS-plus-secondary-cloud architecture, it doesn't redesign it from scratch.
- Migrating off any current tooling (the FinOps dashboard, the existing Terraform modules)
  — the plan builds on what exists, not a rebuild.
- Solving the capacity question by guessing a bigger number and calling it solved — that's
  exactly the failure mode Lesson 22 is built to avoid.

## Key terms

| Term | Meaning |
|---|---|
| Platform hardening | Deliberate work to reduce the chance and blast radius of a future incident, done after the triggering incident is already closed |
| Workstream | A scoped, independently-ownable piece of planned work with its own definition of done |
| Headroom | Spare capacity carried above current measured demand, to absorb an unexpected spike |

## Lab

1. Write the one-sentence difference between "the incident is fixed" and "the platform is
   ready for next season" in your own words.
2. List the three workstreams this lesson scopes, and for each one, write its specific
   definition of done.
3. Explain, in a sentence, why the capacity question can't simply wait until the dashboard
   audit is finished.

## Check yourself

You're ready for Lesson 21 when you can name the three workstreams this phase is scoped
into, explain why each needs its own definition of done, and explain why the capacity
conversation is about to happen on its own timeline regardless of the audit's progress.
