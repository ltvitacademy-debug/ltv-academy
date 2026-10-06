# Lesson 15 — Assembling the Deliverables

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 15 of 35**

## What you'll learn

- How to pull fourteen lessons' worth of separate artifacts into one
  capstone deliverables package
- A consistency check to run across the package before anyone reads it
- The folder structure this program uses to organize everything built
  so far
- Why assembling isn't just copying files — it's one more governance
  pass

**Reminder:** LTV Global and the package structure below are fictional
and illustrative, invented for this capstone.

## What's been built so far

Nothing in Lessons 16 through 18 can start until everything built
across Lessons 1-14 is actually gathered in one place. Right now it's
scattered: a charter in a lab response, a CDE list in one lesson, a
glossary in another, SQL scripts in a third. This lesson is the
gathering step, not a new deliverable of its own.

## The deliverables package

```
LTV-Global-Governance-Program/
  01-charter.md                  (Lesson 1 lab)
  02-landscape-inventory.md      (Lesson 2)
  03-cde-register.md             (Lesson 3, updated with DateOfBirth)
  04-raci.md                     (Lesson 4)
  05-glossary-dictionary.md      (Lesson 5)
  06-classification.md           (Lesson 6)
  07-quality-checks.sql          (Lesson 7)
  08-lineage.md                  (Lesson 8)
  09-authoritative-sources.md    (Lesson 9)
  10-access-retention-policy.md  (Lesson 10)
  11-kpis-workflow.md            (Lesson 11)
  12-operating-model.md          (Lesson 12)
  13-ai-governance-strategy.md   (Lesson 13)
  14-architecture.md             (Lesson 14)
```

Fourteen files, one per lesson, numbered in build order — anyone
opening the folder can follow the program the same way a student
follows the chapter.

## The consistency check

Marcus Ibe doesn't just zip the folder. He runs one pass across all
fourteen files looking for four kinds of drift:

| Check | What it catches |
|---|---|
| Name consistency | The same person's title or spelling everywhere — "Amara Chen, Head of Risk & Compliance" not "Risk Manager" in one file and "Compliance Head" in another |
| CDE consistency | The Lesson 3 CDE register, Lesson 6 classification, Lesson 7 rules, and Lesson 10 access table all list the same four (now five) elements, not a different count in each |
| Decision consistency | Lesson 9's authoritative-source table matches what Lesson 14's architecture actually implements — no silent disagreement between a decision and its diagram |
| Dated-ness | Every file states when it was last reviewed, so the package doesn't quietly go stale the way the pre-program documentation already had |

Finding `DateOfBirth` listed as a CDE candidate in Lesson 6 but missing
from Lesson 3's register is exactly the kind of drift this check is
built to catch — and exactly what Lesson 12's operating model expects
the governance office to keep current going forward.

## Why this is governance work, not clerical work

Assembling a folder sounds like the least interesting step in the
whole program. It isn't: a governance package with silent
inconsistencies between its own files is worse than one with an
honest gap, because it looks finished when it isn't. The consistency
check above is the same discipline Lesson 7 applied to data — trust,
but verify — turned on the program's own documentation.

## Key terms

| Term | Meaning |
|---|---|
| Deliverables package | The complete, organized set of artifacts a governance program produces, assembled in one place |
| Consistency check | A review pass confirming related documents agree with each other, not just that each one is individually complete |
| Staleness | The risk that a once-accurate document silently stops reflecting current reality |

## Lab

Gather the labs and notes you've produced across your own work in
this chapter into a single numbered folder structure, following the
pattern above. Run the four-point consistency check against your own
files and note at least one piece of drift you find — even a small
one, like a name spelled two different ways.

## Check yourself

- Why is assembling the package treated as governance work rather than
  clerical work in this lesson?
- Name the four consistency checks Marcus Ibe runs across the package.
- What specific piece of drift does the chapter-wide example in this
  lesson catch, and where did it originate?
