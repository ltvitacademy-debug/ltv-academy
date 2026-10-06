# Lesson 15 — Posting Mass Additions

**Chapter 3 · Adding Assets · Lesson 15 of 33**

## What you'll learn

- What the Post Mass Additions process actually does
- What happens to a line's queue status after a successful post
- What happens when a line fails to post, and how to fix it
- Why posting is the real boundary between "candidate" and "asset"

## The last step in the bridge

Lessons 13 and 14 built the picture: Create Mass Additions pulls eligible Payables invoice lines into an interface table, and Prepare Mass Additions is where a person reviews, categorizes, merges, or splits those lines and marks the good ones with a **POST** queue status. **Post Mass Additions** is the process that actually acts on every line marked POST: it creates brand-new assets for lines that represent new purchases, and it creates cost adjustments on existing assets for lines that were merged as additional cost.

## What changes when a line posts successfully

Once Post Mass Additions runs successfully against a line:

- A **new asset number** is generated (for a new addition) or an existing asset's cost is increased (for a merged addition).
- The line's queue status changes to **POSTED**, and it's no longer sitting in the interface table waiting for action — it's a real row in the asset tables now.
- The asset begins accumulating depreciation starting from its date placed in service, following the category book defaults (or overrides) applied during preparation.
- The link back to the originating Payables invoice distribution is preserved, so an auditor — or Lesson 31's reconciliation work — can trace a posted asset back to the invoice that funded it.

## When a line doesn't post

Not every line marked POST succeeds on the first attempt. Common reasons a line fails to post include a missing or invalid category, a depreciation date that falls in a period the book has already closed, or required fields left blank during preparation. A failed line typically returns to a status indicating it needs attention — effectively back into the review queue — rather than silently disappearing or posting with bad data. This is deliberate: Oracle Fusion Assets would rather force a correction than create a wrong asset.

## Why posting is the real boundary

Everything before Post Mass Additions — the invoice, the clearing-coded distribution, the interface table row, even a line correctly marked POST — is still just information *about* a future asset. Posting is the moment it actually becomes one: the moment it gets an asset number, starts a depreciation schedule, and joins every report and process covered in the rest of this course. Mistakes caught before posting are cheap to fix (edit the line, change the status, re-prepare). Mistakes caught after posting require an adjustment, a transfer, or in the worst case a retirement and re-addition — which is exactly why Lesson 14's review step exists.

## Key terms

| Term | Meaning |
|---|---|
| Post Mass Additions | The process that creates real assets (or cost adjustments) from mass addition lines marked POST |
| POSTED | The queue status confirming a line has successfully become an asset or asset cost adjustment |

## Lab

Meridian's three split forklift lines from Lesson 14 are all marked POST, and depreciation category "Vehicles — Material Handling" is correctly assigned to each. Walk through what happens when Post Mass Additions runs successfully, including what each forklift will have immediately afterward that it didn't have before.

## Check yourself

Without looking back, can you explain what distinguishes a line marked POST from one that's actually POSTED, and name two reasons a line might fail to post?
