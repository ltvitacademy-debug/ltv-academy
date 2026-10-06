# Lesson 14 — Preparing Mass Additions

**Chapter 3 · Adding Assets · Lesson 14 of 33**

## What you'll learn

- What happens to a mass addition line between arriving and becoming an asset
- The key queue statuses you'll see and set
- How to merge, split, and assign lines correctly
- Why this review step is where most mass-addition errors get caught

## The review step between candidate and asset

Lesson 13 ended with a mass addition line sitting in the Fixed Assets interface table — a candidate, not yet an asset. **Prepare Mass Additions** is the review screen (or spreadsheet upload) where someone in Fixed Assets looks at every new line and decides what should actually happen to it before it's allowed to post.

Every mass addition line carries a **queue status** that tracks where it is in this review:

- **NEW** — just arrived from Create Mass Additions, not yet reviewed.
- **ON HOLD** — flagged for review, not ready to post (missing information, needs a decision, pending clarification from the requester).
- **POST** — reviewed, categorized, and marked ready to become an asset addition or a cost adjustment on the next Post Mass Additions run.
- **MERGED** — combined with another line rather than becoming its own asset.
- **SPLIT** — divided into multiple lines (for example, one invoice covering several distinct assets).
- **DELETE** — rejected; it should never become an asset (a line that was actually an expense, miscoded in Payables).

## Deciding what each line becomes

Reviewing a mass addition line means answering a few real questions:

- **Is this a brand-new asset, or additional cost on an existing one?** If Meridian already has an asset for a machine and gets a follow-up invoice for an upgrade kit installed on it, that line should be **merged** into the existing asset as a cost addition, not created as its own separate asset.
- **Does the category need to be set or corrected?** Mass addition lines often arrive with a default or blank category that needs to be confirmed or changed based on what was actually purchased.
- **Does one invoice line actually cover multiple physical assets?** A single $90,000 invoice line for "3 forklifts" needs to be **split** into three lines of $30,000 each before each forklift can be posted as its own asset with its own number.
- **Is the depreciation start date and book correct?** The GL date from Payables isn't always the right date placed in service — a machine might be invoiced in one period but not actually installed and usable until weeks later.

## Why this matters

This review step exists because Create Mass Additions is a mechanical process — it moves data based on account coding, with no judgment about what the purchase actually was. Prepare Mass Additions is where a person applies the judgment: catching a miscoded expense before it becomes a fictitious asset, catching a bundled invoice before it becomes one oversized asset instead of several real ones, and setting the category correctly so depreciation calculates the way it should from day one.

## Key terms

| Term | Meaning |
|---|---|
| Queue status | The current state of a mass addition line in the review process (NEW, ON HOLD, POST, MERGED, SPLIT, DELETE) |
| Merge | Combining a mass addition line into an existing asset as additional cost, rather than creating a new asset |
| Split | Dividing one mass addition line into multiple lines, each becoming its own asset |

## Lab

Meridian receives a mass addition line for $90,000 described as "3 forklifts, Model FX-200." Using the queue statuses above, describe the steps you'd take to prepare this line correctly before it's ready to post, including which status it should carry at each step.

## Check yourself

Without looking back, can you name the six queue statuses a mass addition line can carry, and explain the difference between merging a line and splitting one?
