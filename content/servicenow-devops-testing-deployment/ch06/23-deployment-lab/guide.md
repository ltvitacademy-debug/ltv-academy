# Lesson 23 — Deployment Lab

**Chapter 6 · Deployment Planning & Rollback · Lesson 23 of 26**

## What you'll learn

- How to assess real severity and scope once a deployment has already gone live
- How to apply Lesson 22's decision criteria to one concrete, realistic incident
- Why this incident's root cause makes roll forward the right call, not a revert
- What Lesson 21's planning questions would have caught before the deployment even ran

## The scenario

The Equipment Checkout application ships a new approval-routing feature: requests over a certain dollar value now route to a department head for a second approval, instead of auto-approving after the first manager signs off. The deployment is scheduled and pushed live at 10:30 AM on a Tuesday — the middle of business hours, because the build happened to be ready and nobody checked whether that was actually a safe window. Within the hour, support tickets start coming in: some employees who submitted high-value checkout requests say they never received the second-approval notification email, and have no idea their request is sitting in someone's queue.

## Step 1 — Assessing severity and scope

Before deciding anything, the team checks what's actually broken versus what's still working. The approval records themselves are being created correctly, and department heads can see pending approvals by going directly into the Equipment Checkout approval list — the underlying workflow logic is sound. What's broken is narrower: the notification email that's supposed to alert a department head that something is waiting on them isn't sending, for requests that hit the new second-approval step. That's a real problem — those requests will sit unactioned until someone thinks to check manually — but it's not the critical workflow itself. Approvals are processing; a subset of the people who need to know they have a pending approval just aren't being told. That's moderate, not catastrophic.

## Step 2 — Finding the root cause

A quick look at the approval notification script shows the actual bug: the script reads the department head's field from the request record to build the notification, but for a chain of equipment-checkout request types added since the script was last touched, that field can legitimately be empty at the moment the second-approval step first fires — and the script has no null check for it. When the field is empty, the notification simply fails to send, silently, with no error visible to the requester or the approver.

## Step 3 — Deciding: roll forward, not revert

Applying Lesson 22's criteria: the issue is real but moderate, not widespread catastrophic failure — approvals are still processing correctly underneath. The root cause is already identified and precise: one missing null check in one script. And a revert would be the worse option here, because reverting the whole approval-routing feature would also remove the legitimate second-approval requirement for high-value requests entirely, re-exposing the exact compliance gap the feature was built to close. Rolling forward — shipping a small, tested fix that adds the missing null check and falls back to notifying a default escalation group when the department head field is empty — is both faster and safer than undoing the whole feature.

## Step 4 — What Lesson 21 would have caught

The fix resolves the incident, but the real lesson is upstream. This deployment skipped the timing question entirely: it went live at 10:30 AM on a business day instead of inside a planned maintenance window, which is exactly why the broken notifications were discovered by confused employees in real time instead of by a tester in a quiet window. A Change Calendar check wouldn't have caught this specific bug — it was a code defect, not a scheduling conflict — but deploying during business hours is precisely why a moderate bug turned into an hour of live support tickets instead of a quiet fix applied before anyone noticed.

## What this lab confirms

Severity assessment, root-cause identification, and the revert-versus-roll-forward decision all worked correctly here — that part of the response was sound. But the incident itself traces back to a planning gap from Lesson 21: the right technical fix doesn't undo the cost of deploying at the wrong time. Planning and rollback aren't two separate skills; a good rollback decision limits the damage from a planning mistake, but it doesn't erase it.

## Key terms

| Term | Meaning |
|---|---|
| Severity and scope | Whether an issue is cosmetic/narrow or affects a critical, widespread workflow |
| Silent failure | A bug that fails without throwing a visible error, like a notification that simply never sends |
| Null check | Code that confirms a field actually has a value before using it, preventing this exact kind of silent failure |
| Escalation group | A fallback group notified when the intended approver can't be determined |

## Check yourself

Walk through this incident one more time, out loud, without looking: why did the team choose roll forward over a full revert, and separately, what single planning decision from Lesson 21 — if made differently — would have kept this from becoming a live, business-hours incident in the first place?
