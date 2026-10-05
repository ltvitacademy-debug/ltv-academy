# Lesson 11 — Match Review and Stewardship

**Chapter 2 · Matching and Consolidation · Lesson 11 of 25**

## What you'll learn

- Why the "review band" from Lesson 7 needs a human, and what that human actually does
- False positives vs. false negatives, and why both carry real cost
- The match review workflow, from queue to decision to feedback
- How this closes out Chapter 2 and sets up Chapter 3

## Why review needs a human

Lesson 7 established that probabilistic matching produces a middle band — scores too uncertain for the system to decide automatically. That band exists because the two ways an automated system can get it wrong both carry a real cost:

- **False positive** — merging two records that are actually different entities. A customer's data gets contaminated with a stranger's purchase history, address, or preferences. Hard to detect after the fact, and erodes trust in the whole system once discovered.
- **False negative** — failing to merge two records that are actually the same entity. The duplicate persists, defeating the entire point of MDM for that record, but it's a quieter failure that doesn't actively corrupt anything.

A human steward, with context an algorithm doesn't have — knowing the business, recognizing a known edge case, or picking up the phone to check — is the right tool for exactly this uncertain middle band.

## The steward's job

- **Confirm or reject.** Review the candidate pair, look at the evidence (which fields matched, which didn't, how confident each was), and decide: same entity, or not.
- **Fix the source data.** Sometimes a review reveals the real problem isn't the match logic — it's that a source record has a typo or an outdated field. Correcting it at the source prevents the same uncertain match from reappearing.
- **Tune the rules.** A pattern of reviews landing the same way (say, every time a candidate pair agrees on a specific field, it turns out to be a real match) is evidence the thresholds or weights from Lesson 7 should be adjusted — stewardship isn't just case-by-case decisions, it's the feedback signal that improves the automated matching over time.

## The review workflow

1. A pair (or candidate group) lands in the review queue because its score fell between the lower and upper thresholds.
2. A steward reviews the evidence and makes a decision: **merge**, **reject** (confirmed different entities, don't merge), or **needs more data** (escalate or wait for additional information).
3. The decision is recorded — both to resolve that specific case and as a labeled example that can inform future rule or threshold tuning.

This is the same stewardship concept introduced generally in Lesson 5's governance pillars, made concrete: this is the actual day-to-day work an MDM data steward does.

## Closing out Chapter 2

This chapter built the mechanics: matching concepts and blocking (Lesson 6), deterministic and probabilistic matching (Lesson 7), deduplication (Lesson 8), golden records (Lesson 9), survivorship rules (Lesson 10), and now the human review step that handles what automation can't resolve alone (Lesson 11). Chapter 3 moves from mechanics to domains — applying everything from this chapter to the specific master data types organizations actually manage: customer, product, vendor, and employee/location master data.

## Key terms

| Term | Meaning |
|---|---|
| False positive (match) | Incorrectly merging two records that are actually different entities |
| False negative (match) | Failing to merge two records that are actually the same entity |
| Review queue | The set of candidate match pairs whose scores fall in the uncertain middle band, awaiting steward decision |

## Lab

Imagine a candidate match pair: same last name, same city, different first name, different phone number. Would you lean toward merge, reject, or needs-more-data? Write one sentence justifying your call, and one sentence on what additional piece of evidence would change your mind.

## Check yourself

Can you explain why both false positives and false negatives carry real cost, and describe the three things a match review outcome can be recorded as (merge, reject, needs more data)?
