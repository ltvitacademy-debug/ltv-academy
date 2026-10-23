# Lesson 20 — CI/CD Lab

**Chapter 5 · ServiceNow DevOps & CI/CD Concepts · Lesson 20 of 26**

## What you'll learn

- How to apply Lesson 19's risk-based thinking to a real, concrete deployment decision
- How to read a CI/CD pipeline run and an ATF suite result as actual evidence, not a formality
- Why the same application can produce both a Standard Change and a CAB-reviewed Normal Change in the same week
- How to write the reasoning that justifies routing a change one way or the other

This lesson is a worked written scenario — there is no ServiceNow instance to click through here. The reasoning below is exactly what a developer or change coordinator would work through in a real DevOps-integrated ServiceNow environment, using the concepts from Lessons 17 through 19.

## The scenario

A team maintains the **Equipment Checkout** application — the same scoped application Course 6 introduced and this course's own capstone has been building toward. Their CI/CD pipeline lives in **GitHub Actions**, connected to ServiceNow DevOps the way Lesson 18 described: every pull request against the application's repository triggers a build, then runs the application's ATF suite (UI tests and server-side tests, built back in Chapter 4) against the change, then — once a PR merges — deploys to the target environment, reporting each stage back to ServiceNow.

Two pull requests land in the same week. Walk through both.

## Change A: a label and validation-message fix

The first PR fixes a cosmetic bug: a confusing field label on the checkout form, and a validation message that fired on the wrong condition for the equipment return date. The pipeline builds cleanly. The full ATF suite runs — the existing UI tests for the checkout form, plus a new UI test added specifically for the corrected validation message — and every test passes. The PR merges, and the pipeline reports a successful deploy event to ServiceNow DevOps.

**The reasoning:** This change touches presentation and validation messaging only — nothing in the approval routing, nothing in who can check out what equipment, nothing in the underlying data model. The ATF suite's passing result is real, specific evidence: the exact UI behavior that changed has a test that exercises it, and that test passes. That combination — narrow functional scope plus direct, passing test coverage of exactly what changed — is what a pre-approved **Standard Change template** exists for. ServiceNow DevOps's automatic Change Request, generated off the deploy event, can legitimately move through that template: fast, low-friction, and still a real governed record, just one that doesn't need a fresh CAB vote for a change this well-understood and this well-tested.

## Change B: a change to the approval routing logic

The second PR touches something more consequential: the server-side logic that decides which manager has to approve a checkout request above a certain dollar threshold. A recent reorganization means the old logic routes some high-value requests to a manager who no longer has authority over that equipment category. The fix updates the routing rule. The pipeline builds cleanly, and the ATF suite — including the server-side tests covering the approval logic — passes.

**The reasoning:** Tests passing here means exactly one thing: the code does what the existing tests check for. It does not mean the new routing rule is actually correct for every real scenario the business cares about, or that no edge case was missed — approval routing for equipment above a dollar threshold is exactly the kind of logic where a subtle mistake has real financial and audit consequences, and ATF tests can only check what someone thought to write a test for. This is a change with low *technical* risk evidence but high *business* risk, and Lesson 19's distinction applies directly: passing tests and low business risk are not the same thing. Even with every test green, this change belongs in front of the CAB — a Normal Change, reviewed by people who understand the approval-authority implications, not fast-tracked through a Standard Change template just because the pipeline turned green.

## The pattern to take away

Same application, same pipeline, same week, same ATF discipline — two different, correct outcomes. The deciding factor was never "did the pipeline succeed." It was what the change actually touched, and whether the test coverage that passed was evidence about the part of the system that actually carries the business risk.

## Key terms

| Term | Meaning |
|---|---|
| Pull request (PR) trigger | A pipeline run initiated automatically when code changes are proposed for review |
| Narrow functional scope | A change confined to a small, well-understood part of the application, like a label or message |
| Approval routing logic | Server-side rules that determine who must approve a request, often tied to business authority |
| Business risk vs. technical risk | Whether a mistake has real organizational consequence, versus whether the code behaves as its tests expect |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why did Change A and Change B get routed differently, even though both had a clean pipeline build and a fully passing ATF suite?
