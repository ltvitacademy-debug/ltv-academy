# Lesson 17 — Automation Design: Flow vs. Apex

**Chapter 3 · Application Architecture Practice · Lesson 17 of 25**

## What you'll learn

- How to apply Lesson 5's declarative-vs-programmatic factors to a real, multi-part automation requirement
- Why a single requirement often splits across Flow and Apex rather than landing entirely on one side
- Record-triggered Flow order of execution basics an architect needs to reason about conflicts
- A worked example showing the automation-design step of Lesson 15's process in practice

## From principle to applied design

Lesson 5 established the factors that decide declarative versus programmatic: complexity, volume, async needs, integration complexity, testability, and who maintains it. This lesson is about *applying* those factors to design the automation for one real feature — the automation-and-UI-design step (step 6) of Lesson 15's solution design sequence — rather than treating the choice as a single up-front decision made once per project.

## Requirements usually split, they don't land entirely on one side

A realistic requirement for the warranty-claims scenario: "When a Claim is marked Approved, update the related Equipment's warranty status, notify the customer by email, and if the claim amount exceeds a threshold, create a follow-up task for a manager to review." Applying Lesson 5's factors piece by piece: updating the related Equipment record on a status change is straightforward conditional logic — comfortably declarative, a record-triggered Flow. Sending a notification email is also comfortably declarative if it's a simple templated email — but if the notification logic needs complex formatting, attachments assembled from multiple records, or delivery-failure handling, that piece alone might justify an invocable Apex method called from the Flow, while the rest of the automation stays in Flow. The threshold check and task creation is simple conditional logic — declarative again. The result, correctly reasoned through, is one Flow doing most of the work, calling out to a small, focused piece of Apex only for the one piece that genuinely needed it — not a wholesale choice of "this feature is a Flow feature" or "this feature is an Apex feature."

## Record-triggered Flow order of execution matters for conflicts

When multiple pieces of automation exist on the same object — several record-triggered Flows, perhaps alongside an Apex trigger — an architect needs a working understanding of how Salesforce's save order generally proceeds: before-save automation (including before-save record-triggered Flow logic and before triggers) runs first and can modify the record's field values on the same database operation without a separate DML save, which is more efficient; after-save automation (after-save Flow logic, after triggers, processes depending on the committed record) runs once the record is actually saved. Within before-save or after-save, having multiple Flows or triggers on the same object means their relative order isn't something the architect freely controls to the same degree a single, well-organized piece of automation would be — which is precisely why Lesson 9's warning against Flow sprawl and Lesson 6's one-trigger-per-object pattern aren't just maintainability advice; they directly reduce the number of order-of-execution conflicts an architect has to reason about in the first place.

## A worked design note, the kind Lesson 15 expects

For the Claim-approval example: "Automation approach: one record-triggered Flow on Warranty Claim, after-save, triggered on Status = Approved. Updates Equipment.Warranty_Status__c declaratively. Calls an invocable Apex method (`ClaimNotificationService.sendApprovalNotice`) for the customer email, because the notification requires assembling claim history across related records that a Flow's native email action can't cleanly format. Threshold check and manager task creation handled declaratively within the same Flow. Rationale: only the notification-formatting piece met the programmatic bar from Lesson 5; the rest stayed declarative for admin maintainability." That's a short paragraph, not a long document — but it's the difference between a defensible design decision and an unexplained one.

## Key terms

| Term | Meaning |
|---|---|
| Before-save automation | Logic (Flow or trigger) that runs before a record is committed, able to modify field values without a separate save operation |
| After-save automation | Logic that runs once a record is already committed, used for actions that depend on the saved record (like sending a notification) |
| Split automation design | Designing a single requirement so declarative and programmatic pieces each handle the part of the work they fit best, rather than forcing the whole requirement onto one side |

## Lab

Take the Claim-approval requirement from this lesson (update Equipment status, send notification, conditionally create a manager task) and write your own automation-approach design note, in the format shown above, but for a different variation: assume the notification email is now a simple, fixed-text templated email with no attachments or formatting complexity. Does the Apex piece still earn its place under Lesson 5's factors? Justify your answer either way.

## Check yourself

Can you explain why a realistic automation requirement often splits between Flow and Apex rather than being purely one or the other? Can you explain, in your own words, why having fewer, well-organized pieces of automation on an object (rather than many scattered Flows and triggers) reduces order-of-execution risk, not just maintenance burden?
