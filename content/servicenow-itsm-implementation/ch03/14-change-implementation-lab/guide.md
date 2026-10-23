# Lesson 14 — Change Implementation Lab

**Chapter 3 · Implementing Change Enablement · Lesson 14 of 32**

## What you'll learn

- How to walk a real company's change requirements through every piece from Lessons 10-13
- How to decide, concretely, which changes should be Standard vs. Normal vs. Emergency
- How to build a risk assessment rule that actually catches the real danger in this scenario
- How to chain a two-stage approval and confirm it fires on the right changes
- How Conflict Detection would catch a real scheduling collision before CAB even meets

## The scenario

You're implementing Change Enablement for **Meridian Freight**, a logistics company whose core ERP system runs on a single production database server (CI: `ERP-PROD-DB01`) and an application tier behind it (CI: `ERP-PROD-APP02`). The IT team has three recurring kinds of change: monthly OS and application patching on the ERP servers, occasional schema or configuration changes requested by the finance and operations teams, and rare middle-of-the-night emergency fixes when the ERP goes down. Your job this lesson is to walk that real mix of change types through everything Lessons 10-13 taught, end to end, as a worked scenario — deciding, configuring, and confirming each piece, in prose, the same way you'd reason through it on a real implementation.

## Step 1 — Classifying the recurring work

The monthly patching cycle is the clearest case: it's the same action, performed the same way, on a known schedule, every month, and it has already gone through its own internal review once. This is exactly what Lesson 10 described as a **Standard change** — so you build a Change Template for "Monthly ERP Server Patching," pre-populated with the implementation plan, the two affected CIs, and the already-approved risk and backout plan. Each month's patch cycle is created from that template and moves toward Scheduled with no new individual approval, because the authorization already happened once, at template-approval time.

Schema and configuration changes requested by finance or operations are the opposite case — every one is different, touching different fields, tables, or integrations, so none of them can be pre-authorized as a template. These are **Normal changes**, routed into the full assessment-and-approval path from Lessons 11 and 12. The rare middle-of-the-night ERP outage fix is an **Emergency change** — real authorization is still required, but from a smaller, faster path: in this implementation, the on-call change manager plus one senior infrastructure lead, rather than full CAB review.

## Step 2 — Building the risk assessment

For Normal changes, you build a Risk Assessment questionnaire with four real questions: does this change touch `ERP-PROD-DB01` or `ERP-PROD-APP02`? Does it require a maintenance window outside business hours? Is there a tested backout plan? Has an equivalent change been performed successfully before? Following Lesson 11's principle, you implement this as a **rules-based lookup** rather than open-ended scoring, because the one fact that matters most in this scenario is unambiguous: any change touching the production database directly is High risk, full stop, regardless of how the other three questions are answered. So the rule is: `touches ERP-PROD-DB01 = Yes` forces `risk = High`; otherwise, a tested backout plan plus prior successful execution keeps risk at Low or Medium. The risk field itself is read-only, calculated only from these answers — nobody can hand-pick "Low" for a database change just because they're in a hurry.

## Step 3 — Chaining the approval

Using Flow Designer's multi-stage approval pattern from Lesson 12, you build the Normal-change approval flow: Stage 1 is manager approval, required on every Normal change. Right after Stage 1 resolves, an If condition checks `change_request.risk`. For this scenario, because any production-database change is automatically High risk, that condition reliably catches exactly the changes that matter most — a Medium or High result adds Stage 2, CAB approval, before the change can move toward Scheduled. A Low-risk change (one that doesn't touch the production CIs at all — say, a cosmetic update to a reporting-only sandbox) completes after manager approval alone. You confirm this by walking two test cases: a change to a non-production reporting instance, which should resolve at Stage 1, and a change to `ERP-PROD-DB01`, which should correctly pick up Stage 2.

## Step 4 — Confirming Conflict Detection catches a real collision

Operations submits a Normal change to add an index to `ERP-PROD-DB01`, scheduled for Saturday 10 PM to 2 AM. Unknown to them, infrastructure has already scheduled a separate maintenance window on the same CI, Saturday 11 PM to 1 AM, for a storage firmware update. Because both changes affect the same Configuration Item with overlapping windows, Conflict Detection flags this automatically the moment the second change is scheduled — surfacing the collision before the CAB ever meets. At the CAB review (supported by the Change Calendar's visual view of that whole weekend), the board sees the flagged conflict directly on the record and resolves it by rescheduling the index change to the following Saturday, rather than letting both changes run concurrently against the same production database.

## What this lab confirms

Walking this one realistic mix of changes through Lessons 10-13 end to end — classification, risk calculation, chained approval, and conflict detection — is what separates "I can define Standard, Normal, and Emergency" from actually implementing Change Enablement: every piece has to connect to the next one, automatically, so the right changes get the right level of scrutiny without anyone having to remember to apply it by hand.

## Key terms

| Term | Meaning |
|---|---|
| Change Template (Standard) | The pre-approved record the monthly ERP patching cycle is created from, each month, with no new individual approval |
| Rules-based risk rule | The implementation choice in this scenario: any change touching the production database CI is automatically forced to High risk |
| Two-stage approval | Manager approval for every Normal change, with CAB approval added only when risk comes back Medium or High |
| Conflict Detection catch | The automatic flag raised when two scheduled changes overlap in time on the same Configuration Item |

## Check yourself

Walk through Meridian Freight's three change types one more time, out loud, without looking: which type is each of the three recurring kinds of work, why does the risk rule force any production-database change to High regardless of the other questionnaire answers, and what exactly would Conflict Detection have caught if the index change and the firmware update had both been approved without anyone noticing the overlap?
