# Lesson 16 — Large Data Volume Review Checklist

**Chapter 3 · Managing Volume · Lesson 16 of 16**

## What you'll learn

- How to run a structured LDV risk review against a real or proposed Salesforce org
- The specific question to ask for each of this course's three chapters
- Why this checklist belongs at design-review time, not just at incident-response time
- How to turn checklist findings into a prioritized, phased recommendation

## Why a checklist, and why now

Across fifteen lessons, this course has built a toolkit for diagnosing and fixing LDV problems one at a time. The last skill to build is the ability to run a structured review *before* those problems force themselves onto an architect's desk as production incidents — during a design review for a new object, a health-check engagement on an existing org, or a pre-go-live review ahead of a major data migration. A checklist is the right format for this because LDV risk is genuinely multi-dimensional (Lesson 2): an org can look perfectly healthy on one axis and be heading for trouble on another, and a structured pass through each dimension catches that in a way that an unstructured "does anything look slow" review doesn't.

## The checklist

**Chapter 1 — Read path**
- For each object expected to carry large volume, what are its most common filter conditions in reports, list views, and SOQL — and are they built against automatically-indexed fields (Lesson 3) or custom fields that would need a Support-requested index?
- For those same filters, does the selectivity math (Lesson 4) actually clear the standard-index or custom-index threshold at the object's *projected* volume, not just its current volume?
- Is any object showing symptoms that selective, indexed queries alone won't solve — specifically, a standard/custom field join cost that a skinny table (Lesson 5) would address?
- Does the org have a single object so large that whole-object partitioning (divisions, Lesson 6) is worth a serious conversation, understanding that enabling it is a one-way decision?

**Chapter 2 — Write path**
- Run the SOQL aggregate checks from Lesson 7: group by OwnerId and by each major parent lookup field, on every object expected to carry large volume. Flag anything approaching the ~10,000-record guideline for ownership or parent skew.
- For any object with meaningful skew, has anyone verified whether bulk loads/updates against it are hitting lock contention (Lesson 8), and if so, are batches organized to group by parent ID (Lesson 9) before resorting to serial mode?
- Does the org have any planned or recurring large-scale structural changes (role reorganizations, territory changes, bulk ownership reassignment) that should be using deferred sharing calculation (Lesson 10) rather than letting recalculation fire per change?

**Chapter 3 — Volume management**
- Does the org have an active, ongoing archiving process (Lesson 11) for any object accumulating historical data it doesn't need to keep in its active working set — or has nothing ever been archived?
- For data that is archived, is there a defined target (a Big Object, Lesson 12, or an external system) with its constraints already evaluated against the data being moved?
- For data that is genuinely deleted rather than archived, is the deletion strategy (soft delete, hard delete, truncation — Lesson 13) matched to the actual volume and permanence the situation calls for?

## From checklist to recommendation

A checklist produces findings, not a finished plan. Following Lesson 14's triage framework and Lesson 15's case-study pattern, the next step is to group findings by chapter, identify which volume-management gaps (if any) are making the read-path and write-path findings worse, and sequence recommendations so that shrinking the active data set (where relevant) happens before — or at least alongside — the more targeted read-path and write-path fixes, rather than treating every finding as an independent, equally-urgent fix.

## Key terms

| Term | Meaning |
|---|---|
| LDV risk review | A structured, checklist-driven pass through an org's read-path, write-path, and volume-management risk, done proactively rather than reactively |
| Projected volume | An object's expected future record count, used for selectivity and skew checks rather than its current count alone |

## Lab

Using this lesson's checklist, perform a structured LDV review of a hypothetical org: a custom Claim__c object (parent: Account) projected to reach 15 million records within three years, currently at 1.8 million, with no archiving process in place and occasional bulk-update timeouts already appearing on a small number of large accounts. Walk through each of the three chapters' checklist questions as they'd apply to this object, and produce a short, prioritized list (most urgent first) of what you'd recommend investigating or fixing.

## Check yourself

Can you run through this lesson's checklist from memory, one bullet per chapter, without looking back at earlier lessons? Can you explain why a checklist-driven LDV review is more reliable than an unstructured "does anything seem slow" review, and why volume-management findings should generally be sequenced early in a remediation plan?
