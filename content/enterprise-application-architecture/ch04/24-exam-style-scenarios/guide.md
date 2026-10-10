# Lesson 24 — Exam-Style Scenarios

**Chapter 4 · Exam Preparation · Lesson 24 of 25**

## What you'll learn

- How to recognize the structure of a scenario-based architecture question
- A practiced approach to working through a scenario methodically rather than guessing
- Three worked scenarios covering declarative/programmatic, data modeling, and packaging judgment
- Why the "best" answer in a scenario question is usually the one that best fits the stated constraints, not the most technically impressive one

## Scenario questions test judgment under stated constraints

A scenario-based architecture question describes a business situation with specific, deliberately-placed details — a volume figure, a timeline, a licensing detail, an existing piece of automation — and asks which approach best fits. The skill being tested isn't "do you know every possible Salesforce feature," it's "can you weigh the actual constraints given and avoid being distracted by a technically interesting but wrong-for-this-situation option." The most common trap in these questions is choosing the most sophisticated-sounding answer instead of the one that actually fits the stated scenario — exactly the discipline Lesson 5 and Lesson 7 argued for throughout this course.

## A methodical approach

Before looking at the options, identify: what's the actual requirement, what constraints are explicitly stated (volume, timeline, licensing, existing systems), and what quality attributes are implicitly at stake (does this scenario hinge on scalability, maintainability, security)? Then evaluate each option against those specifics, not against which option sounds most advanced. An option that introduces unnecessary complexity for a scenario that didn't call for it is usually a distractor, not the intended answer.

## Worked scenario 1: declarative vs. programmatic

*A nonprofit with one part-time admin and no developer needs automation that sends a thank-you email when a donation is marked Received, and flags donations over a stated internal threshold for manual board review. What's the most appropriate approach?* Applying Lesson 5's factors: no bulk/async need described, no complex integration, no justification for Apex's testing framework over the actual complexity here, and critically, "one part-time admin, no developer" is a maintenance-capacity constraint that strongly favors a solution the admin can modify without filing a ticket. The right answer is a declarative, record-triggered Flow — not because Apex couldn't technically do it, but because nothing in the scenario justifies its cost, and the maintenance constraint actively argues against it.

## Worked scenario 2: data modeling

*A logistics company wants to track which driver delivered which package, where a driver can deliver thousands of packages over their career and a package is delivered by exactly one driver. Should Package reference Driver via lookup or master-detail?* Applying Lesson 16's lifecycle reasoning: a Package has its own independent meaning and lifecycle regardless of which driver delivered it — a package record shouldn't be deleted if a driver's record is ever removed from the org. This is a lookup relationship, not master-detail — the giveaway is that the "child" (Package) has independent existence from the "parent" (Driver), the opposite of the master-detail fit from Lesson 16's Claim Line Item example.

## Worked scenario 3: packaging

*A company has built an internal expense-approval application and is now being asked by a partner organization, unrelated to the original business, to license and use the same application inside the partner's own separate Salesforce org, with protection against the partner modifying the core approval logic.* This changes the situation from Lesson 19's typical internal case: the application is now being distributed externally to an unrelated organization, with an explicit requirement to protect the core logic from modification. That combination — external distribution plus IP protection — is exactly the case Lesson 19 reserved for a managed package, not an unlocked package, even though the application started life as an ordinary internal unlocked-package candidate.

## The pattern across all three

In each worked scenario, the correct answer followed directly from applying an already-taught framework (Lesson 5's factors, Lesson 16's lifecycle reasoning, Lesson 19's managed/unlocked distinction) to the specific details actually stated in the scenario — not from recalling an unrelated fact or picking the most elaborate-sounding option. That's the transferable skill this lesson is reinforcing: read the scenario for its actual constraints, apply the right framework, and resist the pull toward the more impressive-looking wrong answer.

## Key terms

| Term | Meaning |
|---|---|
| Scenario-based question | A question describing a business situation with specific constraints, assessing applied judgment rather than isolated recall |
| Distractor | An answer option that sounds technically sophisticated but doesn't actually fit the scenario's stated constraints |

## Lab

Write your own exam-style scenario (3-5 sentences) that tests the application-boundary reasoning from Lesson 4, including at least one specific detail (ownership, audience, or reuse signal) that should point a careful reader toward the correct boundary decision, and at least one plausible-sounding distractor detail that a careless reader might be tempted to over-weight. Then write the correct answer and explain, in one sentence, which detail was the real signal and which was the distractor.

## Check yourself

Can you describe, in your own words, the methodical approach this lesson recommends for working through a scenario question before looking at the answer options? Can you work back through this lesson's three worked scenarios and name, for each, which earlier lesson's framework provided the deciding factor?
