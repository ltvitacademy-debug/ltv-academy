# Lesson 29 — Designing an Access Governance Model

**Chapter 6 · Applied Security and Privacy · Lesson 29 of 30**

## What you'll learn

- How to assemble Chapter 3's separate access-control concepts into one working model
- The five building blocks a real access governance model needs
- How this design would have specifically prevented the Brightfield incident from Lesson 28
- Where access governance models fail in practice, even when well-designed on paper

## From separate concepts to one model

Chapter 3 covered role-based access control, least privilege, segregation of duties, access reviews, and privileged access as distinct topics. An **access governance model** is what you get when you stop treating them as five separate lessons and design them as one connected system: roles define what access looks like, least privilege constrains how much any one role gets, segregation of duties constrains which roles one person can hold at once, and reviews continuously verify the first three are still true.

## The five building blocks

1. **Role definitions.** Start from job function, not from copying an existing person's access. "Support agent" needs read access to a customer's account to help them — not write access to pricing tables. Each role's access should be written down and justified, not inferred from whoever happened to request it first.
2. **Least-privilege mapping.** For each role, map the *minimum* systems and data it needs, scoped as narrowly as the work allows — read-only where write isn't needed, row-level or column-level restriction (Lesson 22) where full-table access isn't needed, masked fields where real values aren't needed.
3. **Segregation-of-duties rules.** Define which role combinations are never allowed on one person — the classic example being "can create a vendor" and "can approve vendor payments" — and check new access requests against that list before granting them, not after an audit finds the conflict.
4. **A request and approval workflow.** Access isn't self-granted. A request names the role needed, a business justification, and an approver who isn't the requester — closing the exact gap that let Brightfield's contractor receive broad access on an informal ask.
5. **Periodic recertification.** On a fixed schedule — quarterly is common — every active grant gets reviewed by a manager or data owner who confirms it's still needed. This is the step that catches access that should have been revoked but wasn't, which is exactly what went wrong in Lesson 28's case study.

## Mapping this back to Brightfield

Brightfield's incident traced to two specific missing pieces: there was no request-and-approval workflow requiring a named, scoped justification (building block 4), and there was no recertification cadence that would have caught the still-active login (building block 5). A role-based model alone wouldn't have been enough — RBAC defines *what* access looks like, but only an approval workflow and recertification catch access that was granted correctly, then outlived its reason to exist.

## Where this fails even when well-designed

An access governance model on paper is not the same as one that's actually followed. The two most common practical failures are **approval fatigue** — if every request requires a cumbersome multi-step sign-off, approvers start rubber-stamping without reading, defeating the point — and **recertification as a checkbox** — if a manager reviewing forty access grants every quarter just clicks "approve all" without genuinely checking, the review step exists on paper but catches nothing in practice. A model is only as strong as the discipline behind its weakest regularly-performed step.

## Key terms

| Term | Meaning |
|---|---|
| Access governance model | The connected system of roles, least-privilege mapping, segregation-of-duties rules, approval workflow, and recertification that together control who can access what |
| Request and approval workflow | The process requiring a named justification and an independent approver before access is granted |
| Approval fatigue | A failure mode where high-volume, low-friction approvals are rubber-stamped rather than genuinely reviewed |

## Lab

Design a one-page access governance model for a small hypothetical team (5-10 people) handling customer data. Define three roles, one least-privilege rule for each, one segregation-of-duties pair that should never be combined, and a recertification cadence. Then note which of the five building blocks you found hardest to write concretely, and why.

## Check yourself

Can you name the five building blocks of an access governance model from memory, and explain specifically which two of them would have prevented the Brightfield incident from the previous lesson?
