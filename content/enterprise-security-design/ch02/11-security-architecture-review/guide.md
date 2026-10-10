# Lesson 11 — Security Architecture Review

**Chapter 2 · Applying Security Architecture · Lesson 11 of 15**

## What you'll learn

- Why security architecture needs a review *process*, not just good individual designs
- What a review board actually checks, borrowing the vocabulary built across this chapter and the last
- Health Check as a concrete, score-based tool for one specific part of that review
- How to run a lightweight review for a smaller change, when a full board isn't warranted

## Good designs still need a second set of eyes

Every lesson so far in this course has been about designing security well — boundaries, least privilege, defense in depth, threat modeling, encryption, monitoring, secure code, integration security. None of that guarantees a specific change, made under deadline pressure by one well-intentioned person, actually holds up. A **security architecture review** is the organizational practice of having someone other than the designer check a design against a consistent standard before it ships — the same reason code review exists for code, applied one level up, to the architecture itself.

This isn't about distrust of any individual architect. It's about the fact that a single person, deep inside their own design, reliably misses things a second reviewer — who wasn't in the room for every tradeoff decision and isn't anchored on the same assumptions — catches on a fresh read. This is also where the earlier STRIDE-style threat modeling (Lesson 5) gets formalized into an actual checkpoint: a review board's job includes confirming a threat model was actually done, not just that it could theoretically have been done.

## What a review board actually checks

A functioning review process has a consistent checklist, built from exactly the vocabulary this course has already covered, rather than an open-ended "does this look okay?" conversation:

- **Boundaries (Lesson 1):** Has every boundary this change touches or creates been identified, and does a control exist at each one?
- **Least privilege (Lesson 2):** Does any new or changed access grant more than the specific, justified need requires?
- **Defense in depth (Lesson 3):** If the design's primary control fails, is there a second, independent layer that limits the damage?
- **Threat model (Lesson 5):** Was a STRIDE-style pass actually done for this change, and were the findings addressed or explicitly accepted as a known, documented risk?
- **Encryption and data protection (Lessons 6–7):** Does any newly exposed sensitive field need encryption, and if so, has the probabilistic/deterministic tradeoff been considered deliberately?
- **Monitoring (Lessons 4, 8):** If this change fails silently, will anything actually detect that it failed?
- **Secure development (Lesson 9):** For custom code, is sharing behavior deliberate and documented, and is CRUD/FLS enforced where it needs to be?
- **Integration security (Lesson 10):** For any new integration, are OAuth scopes and the integration user's own access both scoped to the minimum needed?

## Health Check: a concrete tool for one slice of this review

**Health Check** is a built-in Salesforce tool that gives a quantitative score, from 0–100, measuring how closely an org's actual security settings match Salesforce's own recommended baseline — password policies, session settings, and related org-wide security configuration. The score is weighted by risk tier (high-risk settings count the most, informational settings don't affect the score at all), and Salesforce publishes grade bands for interpreting it (roughly: 90%+ is considered excellent, 80–89% very good, 70–79% good, and below that is a meaningfully weaker posture). An organization with specific regulatory requirements can import a **custom baseline** so the score measures compliance against that organization's own required settings rather than Salesforce's generic recommendation.

Health Check is valuable and genuinely concrete, but an architect should be precise about its scope: it measures org-wide settings, not record-level sharing design, not custom Apex's sharing/CRUD discipline, not whether a specific integration's OAuth scope is appropriate. It's one useful, scorable input into a review — not a replacement for the broader checklist above.

## A lightweight review for smaller changes

Not every change justifies convening a full review board. A smaller, well-scoped change (adding one new field, a minor Flow update) can go through a lightweight version: the developer or admin making the change answers the checklist above themselves, in writing, and a single peer reviewer signs off — rather than nothing being checked at all because "it's too small for the full process." The goal is that every change gets *some* deliberate check proportional to its risk, not that every change gets the same heavyweight process regardless of size.

## Key terms

| Term | Meaning |
|---|---|
| Security architecture review | The organizational practice of checking a design against a consistent standard before it ships |
| Review board | A group (or process) that performs that check, using a defined checklist rather than open-ended judgment |
| Health Check | Salesforce's built-in tool scoring org-wide security settings (0–100) against a baseline standard or a custom baseline |
| Custom baseline | An alternative, organization-specific set of required settings Health Check can score against instead of Salesforce's default |

## Lab

Your org's Health Check score is 72% ("Good," per the grading bands above), driven mainly by a weak password policy and long session timeout settings. Separately, a new integration was just approved with a Connected App scoped to `full` access and an integration user with "View All Data." Explain why Health Check's score alone would not have caught the integration issue, and walk through the full review checklist above against the integration specifically, noting where it fails.

## Check yourself

Can you explain, in your own words, why a security architecture review process matters even when the original architect is skilled and well-intentioned? Can you state exactly what Health Check measures and name at least two things it does *not* measure that this lesson's broader checklist does cover?
