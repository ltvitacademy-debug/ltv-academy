# Lesson 14 — Performance Strategies for Large Data

**Chapter 3 · Managing Volume · Lesson 14 of 16**

## What you'll learn

- How to assemble the full toolkit from Chapters 1–3 into one coherent strategy
- Why performance at LDV scale is a lifecycle discipline, not a one-time fix
- How to triage a real performance complaint to the right chapter's tools
- Why volume management (archiving, deletion) is what keeps the other tools working over time

## One toolkit, three angles

This course has built up a specific toolkit, one lesson at a time: Chapter 1 covered how to keep *reads* fast (indexing, selectivity, skinny tables, custom indexes, divisions). Chapter 2 covered how to keep *writes* reliable under concentrated load (recognizing and avoiding skew, understanding record locking, organizing bulk loads, sequencing sharing-model changes with deferred calculation). This chapter has covered how to keep the *active data set itself* from growing without bound (archiving, Big Objects, deletion strategies). None of these three angles substitutes for the others — a perfectly-indexed query still chokes on a heavily skewed data model, and a well-organized bulk load still gets slower every year if nothing ever archives or deletes anything.

## Performance at LDV scale is a lifecycle, not an event

A common mistake is treating LDV performance work as a one-time remediation project: fix the slow queries, fix the locking errors, declare the org "LDV-ready," and move on. In reality, an org's data volume keeps growing every day it's in production, which means the conditions that create LDV problems (selectivity thresholds, skew ratios, total active record count) keep shifting too. A query that was comfortably selective at 2 million records can drift toward the selectivity threshold at 6 million. An Account that had a healthy number of child records at launch can accumulate its way into parent skew territory three years later with no single change responsible for it. This is exactly why Chapter 3's volume-management techniques matter architecturally, not just operationally: ongoing archiving and deletion are what keep the growth curve that the rest of this toolkit has to deal with from accelerating unchecked.

## Triage: matching a real complaint to the right tool

A practical architect, faced with a reported performance problem, works through roughly this triage:

- **Is it a read-path complaint** (a report, list view, or query is slow)? Start with Lesson 4's selectivity check against the actual filter being used, then Lesson 3's indexing question, then consider whether a skinny table (Lesson 5) or, for a whole-object problem, divisions (Lesson 6) are warranted.
- **Is it a write-path complaint** (a bulk load or update is failing or timing out)? Check for skew (Lesson 7) on the objects involved first, since that's the root cause behind most lock contention (Lesson 8); then look at how the load's batches are organized (Lesson 9) before considering serial mode; and if the operation touches the sharing model, role hierarchy, or ownership at scale, check whether deferred sharing calculation (Lesson 10) should have been used.
- **Is it a "the org just feels slower every year" complaint**, with no single query or load clearly to blame? That's usually a volume-management problem — an org that has never archived or deleted anything is asking every tool in Chapters 1 and 2 to work against an ever-larger, ever-less-selective active data set. The fix here is Chapter 3's: establish what can be archived (Lesson 11), where it should go (Lesson 12), and how it actually gets removed from the active set (Lesson 13).

## Why this triage matters more than memorizing individual fixes

The individual facts in this course — selectivity thresholds, the 10,000-record skew guideline, the 15-day Recycle Bin window — are useful, but an architect's real value is in correctly diagnosing *which* category a real-world symptom belongs to before reaching for a fix. Applying a read-path fix (like requesting a custom index) to what's actually a write-path skew problem wastes a Support case and doesn't solve anything. Treating a volume-management problem as if it needs a one-time query optimization pass means the same complaint will resurface in another year or two, because nothing was done about the thing actually causing the data set to keep growing.

## Key terms

| Term | Meaning |
|---|---|
| Read-path toolkit | Indexing, selectivity, skinny tables, custom indexes, divisions (Chapter 1) |
| Write-path toolkit | Skew detection, record-locking awareness, bulk-load organization, deferred sharing calculation (Chapter 2) |
| Volume-management toolkit | Archiving, Big Objects, deletion strategies (Chapter 3) |
| LDV lifecycle | The ongoing, recurring nature of LDV performance work, driven by an org's continuously growing data volume |

## Lab

A client reports: "Everything in Salesforce has gotten slower over the past two years, but we can't point to one specific broken report or failed job — it's just generally sluggish." Using this lesson's triage framework, explain why this complaint is most likely a volume-management issue rather than a read-path or write-path one, and outline the first two concrete diagnostic steps you'd take (drawing on earlier lessons) to confirm that diagnosis before recommending any specific fix.

## Check yourself

Can you describe, in your own words, why LDV performance work has to be treated as an ongoing lifecycle rather than a one-time project? Can you walk through this lesson's triage framework and correctly route a read-path, a write-path, and a volume-management complaint to the right chapter's tools?
