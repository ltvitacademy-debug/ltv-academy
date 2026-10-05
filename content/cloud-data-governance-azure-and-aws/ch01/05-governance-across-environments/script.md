# Lesson 5 — Governance Across Environments · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Governance has to hold across every environment, continuously — not just at the moment a landing zone is created. This lesson closes out Chapter 1.

## S2 · STEPS — Dev, test, and prod

Every environment should inherit from the same landing-zone pattern. What differs is intensity, not whether governance applies. Sandbox and dev can loosen convenience features, but never encryption or public exposure. Test and staging should mirror production closely — that's the entire point of staging. Production gets the tightest controls: least privilege, full audit logging, change approval. Treating "non-production" as a synonym for "ungoverned" is a costly mistake — real customer data regularly ends up in dev and test.

## S3 · STEPS — What policy drift is

Policy drift is when a resource's actual configuration silently stops matching what governance says it should be. It happens two ways: manual override drift, a one-off change made to debug something that never gets reverted, and policy gap drift, a new resource type that existing policy never anticipated.

## S4 · STEPS — Making drift visible

Azure Policy continuously evaluates resources against policy definitions and reports compliance state on an ongoing basis, not just at creation. AWS Config does the equivalent — recording configuration history and flagging resources that drift out of their expected state against Config rules. Neither tool prevents drift by itself; Chapter 4 covers the preventive side. Both just make drift visible, which is the precondition for fixing it.

## S5 · OUTRO

Chapter 2 starts next — identity and access management, the layer every other governance control in this course depends on.
