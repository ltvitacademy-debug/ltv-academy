# Lesson 28 — AI Governance Case Study: Credit Decisioning

**Chapter 6 · Applied AI Governance · Lesson 28 of 30**

## What you'll learn

- A full, fictional walkthrough applying this course's concepts to one realistic high-stakes AI use case
- Why credit decisioning is a textbook example of a "high risk tier" system under Lesson 24's framework
- How the roles, documentation, bias controls, and monitoring from earlier chapters work together on one real system, not as separate checklists
- What specifically went right, and what nearly went wrong, in this scenario

## The scenario (fictional, illustrative)

**Harrow Peak Financial**, a fictional regional consumer lender, is not a real company and this is not a real incident — it's a realistic composite built to show this course's concepts working together. Harrow Peak replaces part of its manual loan-approval process with a machine learning model that scores applicants and recommends approve, decline, or refer-to-human-review. Loan officers had been taking days per application; the model promises decisions in minutes.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** Before build, Harrow Peak's AI governance lead (Lesson 4's accountable role) flags credit decisioning as exactly the kind of consequential, person-affecting use case this course's Lesson 2 and Lesson 3 warn about — bias and the stakes of an automated decision are both high from day one, not something to worry about later.

**Chapter 2 (Data for AI):** The training data is five years of past loan outcomes. The team checks provenance (Lesson 7) and discovers a problem: for a period two years prior, one branch's loan officers had informally applied stricter scrutiny to applicants from a particular zip code cluster — a human bias baked directly into the "ground truth" labels. Lesson 9's bias-in-data training pays off here: the team doesn't just check the model's outputs, they check whether the *labels themselves* already encode the thing they're trying to avoid.

**Chapter 3 (Model Governance):** The resulting model gets a full model card (Lesson 12) listing training data sources, the known labeling issue and how it was mitigated, and the model's performance broken out by applicant subgroup, not just in aggregate. It's entered in the model registry (Lesson 13) rather than living only on one engineer's laptop, and its full lineage (Lesson 14) traces back through the exact data snapshot used for training.

**Chapter 4 (Security, Access and Monitoring):** Access to the model and the training data is restricted to the named team on the approved list (Lesson 18) — not "anyone in the data science department." Once live, the model is monitored for drift (Lesson 21): six months in, approval rates for one subgroup start declining relative to their historical rate, and the monitoring catches it before a human does.

**Chapter 5 (Responsible AI and Risk):** The drift triggers exactly the response Lesson 24's risk tiering anticipated: credit decisioning was tiered high-risk from the start, so a performance shift here triggers a mandatory human review of the pattern, not a quiet note in a ticket queue. The team also recognizes, per Lesson 26, that fair-lending and anti-discrimination obligations around credit decisions already applied before the model existed — "the AI made the call" was never going to be an acceptable answer to a regulator, which is exactly why Lesson 4's accountable-role structure and Lesson 16's approval workflow existed before this incident, not after it.

**Chapter 6 (this chapter):** An internal audit (Lesson 27) run on schedule for high-risk systems finds the drift response was handled correctly — logged, escalated, remediated — and uses it as the organization's example of the governance program actually working, not just existing on paper.

## What nearly went wrong, and what saved it

If Harrow Peak had skipped the labeling-bias check in Chapter 2, a biased historical pattern would have been quietly relearned by the model and presented as objective. If the model hadn't been risk-tiered high and placed under active drift monitoring, the subgroup approval-rate shift could have run for a year before anyone noticed. Nothing here is a product of luck — every control that caught the problem was one this course covered.

## Key terms

| Term | Meaning |
|---|---|
| Ground-truth label bias | Bias baked into historical outcome data itself, which a model then learns as if it were objective fact |
| High-risk tier | A risk classification that triggers the heaviest set of governance controls, as defined in Lesson 24 |
| Subgroup performance monitoring | Checking a model's metrics broken out by population group, not just in aggregate |

## Lab

Write a short memo (one paragraph) from Harrow Peak's AI governance lead to the executive team, explaining what the drift monitoring caught, why it was caught in time, and which two governance controls from this course deserve credit for the outcome.

## Check yourself

Can you trace, from memory, the single data problem that started this case study, and name the three separate controls — from three different chapters — that caught and corrected its downstream effect?
