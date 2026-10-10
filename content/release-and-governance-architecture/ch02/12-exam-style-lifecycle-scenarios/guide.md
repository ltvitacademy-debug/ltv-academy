# Lesson 12 — Exam-Style Lifecycle Scenarios

**Chapter 2 · Enterprise Deployment · Lesson 12 of 16**

## What you'll learn

- How to approach a scenario-based architecture question rather than a straight recall question
- A structured way to read a scenario for the actual decision being tested, not just the surface details
- Three worked lifecycle scenarios spanning change control, rollback, and multi-team coordination
- Why this style of reasoning matters beyond any specific exam, including Salesforce's own architect-level review processes

## Why scenario reasoning is a different skill

Everything in Lessons 1 through 11 can be stated as a definition — what a CAB is, what a rollback plan covers, what a metadata conflict looks like. Real architecture decisions, and any serious architecture assessment (including the kind of review board process Salesforce's own Certified Technical Architect program uses to evaluate candidates), rarely ask for a definition back. They present a messy, realistic situation and ask what you'd actually do, which requires first figuring out *which* governance mechanism the scenario is actually testing before you can answer at all. This lesson is a set of worked practice scenarios aimed specifically at that skill.

## A structured reading approach

Before answering any lifecycle scenario, it helps to extract four things from the prompt, in this order:

1. **What change is being proposed?** (declarative or programmatic, which object/process, how many users affected)
2. **What stage of the lifecycle is the scenario set at?** (design time, pre-approval, mid-deployment, post-incident)
3. **What's already missing or already gone wrong?** (a scenario usually hands you a gap on purpose)
4. **Which specific lesson's mechanism closes that gap?**

Jumping straight to an answer without doing this tends to produce a technically plausible but wrong answer, because the scenario was testing a governance-process gap, not a technical one (or vice versa).

## Worked scenario 1: the missing rollback plan

*A validation rule is deployed to production on a Friday afternoon to enforce a new required field on Opportunity. By Monday, sales reports a spike in failed saves across the whole sales team, and several reps worked around it over the weekend by leaving the field blank with a placeholder value. What should have happened differently?*

Reading the scenario: the change is declarative, already deployed (post-deployment), and the thing that's gone wrong is bad data now sitting in production from the workaround. The specific gap is Lesson 6's rollback planning — there's no indication a rollback plan or a safer deployment window (avoiding a Friday afternoon with no monitoring over the weekend) was ever considered. The answer isn't "validation rules are bad" — it's that this change needed a pre-approved rollback path and a deployment-timing decision that accounted for who'd be watching it over the following two days.

## Worked scenario 2: the architecture-fit question

*A development team proposes building a brand-new custom object to track customer preferences, when an existing, lightly-used custom object already captures nearly the same data under a different name. The CAB approves the deployment because it's technically well-built and well-tested. Two months later, reports are inconsistent because some processes write to the old object and some to the new one. What review step was skipped?*

Reading the scenario: this is a design-time problem wearing a deployment-time disguise — the CAB correctly judged the change safe to deploy, because that's genuinely what a CAB evaluates (Lesson 5). The actual gap is upstream: no architecture review board ever asked whether this new object duplicated existing structure before it was built. This scenario is testing whether you conflate CAB approval with architectural soundness — they're different questions, as Lesson 5 explicitly distinguishes, and Lesson 15 covers the ARB's role in catching exactly this kind of overlap before building starts.

## Worked scenario 3: the silent cross-team conflict

*Two teams each deploy an automation to the Account object in the same week, each thoroughly tested in isolation. After both go live, a report shows some Account records being updated twice with conflicting values. Neither team's individual testing would have caught this. What should have existed to catch it earlier?*

Reading the scenario: both changes are individually sound — this is explicitly a Lesson 8 metadata-conflict scenario, not a code-quality scenario. The gap is a shared release calendar (Lesson 7) and cross-team visibility that would have surfaced both teams' plans to touch the same object in the same window before either deployed, giving someone the chance to ask whether they'd conflict.

## Why this matters beyond any one exam

The reasoning habit this lesson teaches — read for the gap, map the gap to the specific mechanism, resist answering with a generic "test more" or "communicate better" — is exactly the discipline a real architecture review board or CAB meeting demands in the moment, not just a study technique. It's also the discipline Salesforce's own architecture-review processes at the senior/CTA level are built to assess, because the job itself is answering exactly these kinds of ambiguous, multi-layered scenarios under time pressure.

## Key terms

| Term | Meaning |
|---|---|
| Scenario reasoning | The skill of identifying which specific governance mechanism a realistic, messy scenario is actually testing, before answering |

## Lab

Write your own fourth scenario (3-5 sentences) modeled on the three worked examples above, intentionally testing one specific gap from any lesson in Chapters 1-2. Then write the structured four-step reading of your own scenario, and state which lesson's mechanism closes the gap you built in.

## Check yourself

Can you walk through the four-step structured reading approach from memory? For each of the three worked scenarios, can you explain in one sentence why the obvious-sounding answer ("test more," "communicate better") would have missed the actual gap being tested?
