# Lesson 25 — Lineage Review Checklist

**Chapter 5 · Applied Lineage · Lesson 25 of 25**

## What you'll learn

- A single, usable checklist pulling together all five chapters of this course
- How to use it to review a lineage record you're handed, or one you're about to build
- The one habit, repeated across every case study in this course, that actually prevents the kinds of bugs you just practiced on
- Where the Data Governance career path continues from here

## How to use this checklist

Run through this list whenever you're handed an existing lineage diagram to review, or you're about to document lineage for a new pipeline yourself. It isn't a trivia recap — every line maps to a real failure mode you saw play out in this course's case studies (Lessons 22-24).

### Concepts (Chapter 1)

- [ ] Does the record capture the full path — origin, every transformation, and every destination — not just "source → final report"?
- [ ] Is it clear whether you're looking at **business lineage** (plain domain terms, for stakeholders) or **technical lineage** (table/column names, for engineers) — and does the business view actually trace back to the technical one, rather than being maintained separately?
- [ ] For anything that might need a precise impact check, is lineage recorded at the **column level**, not just the table level? (Recall Lesson 22: a table-level arrow alone would have hidden the actual bug.)
- [ ] Do you know, for this specific lineage record, which capture approach produced it — manual, static parsing, or runtime capture — and therefore how much to trust it?

### Tracing data (Chapter 2)

- [ ] Can you name the actual source system each piece of data originates in, not just "the warehouse"?
- [ ] Is every transformation step's logic (filters, joins, calculations) captured specifically enough to check, rather than described vaguely as "cleaning"?
- [ ] Does the record extend all the way to the final consumption point — the dashboard, the semantic model, the executive report — not stopping at the warehouse?

### Dependencies and impact (Chapter 3)

- [ ] Before changing anything, have you checked **every** downstream consumer of the thing you're changing, not just the one report you already know about? (Recall Lesson 22: three other reports were silently affected.)
- [ ] Have you checked upstream too — does this field depend on something fragile, like a source system's field whose meaning could silently change? (Recall Lesson 22's `TransactionType` field.)
- [ ] If multiple systems each hold their own version of the same real-world concept, is there a clearly designated **source of record** and matching key, or is matching happening informally on whatever field happens to overlap? (Recall Lesson 23's email-based match.)

### Documentation (Chapter 4)

- [ ] Is the lineage record itself documented somewhere a new team member could find and understand it, not just known by the one person who built the pipeline?
- [ ] Is there a plan for keeping it current — who updates it, and when — rather than assuming it will stay accurate indefinitely?

### Applied practice (Chapter 5)

- [ ] When something breaks, do you default to walking the lineage path backward from the broken figure (Lesson 24's approach), rather than re-checking every system from scratch?
- [ ] After any fix, does the lineage record itself get updated to reflect what was actually learned — not just the code?

## The one habit that actually prevents these bugs

Every case study in this course shared the same shape: a number or a record looked fine for a long time, until one upstream change quietly broke an assumption nobody had written down. The single habit that would have caught each one earlier is the same: **whenever something upstream changes, check what's downstream before assuming it's fine** — which is exactly what impact analysis (Chapter 3) and column-level lineage (Chapter 1) exist to make fast enough to actually do, every time, instead of only after something breaks.

## Key terms

| Term | Meaning |
|---|---|
| Lineage review | Systematically checking an existing lineage record against a checklist like this one, rather than assuming it's complete |
| Impact-first habit | Checking downstream consumers before making an upstream change, rather than after it breaks something |

## Lab

Pick any one of the three scenarios from this chapter — the revenue report, the customer data, or the Northfield Pantry practice lab — and run it through this entire checklist as if you were reviewing it fresh. Note which checklist items it would have failed *before* the fix, and which items the fix itself addressed.

## Where the path continues

This closes Data Lineage & Impact Analysis — all 5 chapters and 25 lessons, from what lineage is to tracing it through real systems, using it for impact analysis, documenting it, and applying it to realistic scenarios. The Data Governance career path continues next with **Master & Reference Data Management** — the discipline of deciding, for the handful of concepts every system in a company depends on (a customer, a product, an account), which system actually gets to be the one authoritative version everything else defers to. If Lesson 23's missing source-of-record decision stood out to you, that's exactly the problem the next course is built to solve properly.

## Check yourself

Without rereading the checklist, can you name at least one item from each of this course's five chapters, and explain which single habit — repeated across all three case studies in this chapter — would have caught each problem earlier?
