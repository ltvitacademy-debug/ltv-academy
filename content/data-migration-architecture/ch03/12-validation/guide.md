# Lesson 12 — Validation

**Chapter 3 · Proving and Cutting Over · Lesson 12 of 18**

## What you'll learn

- The multiple levels at which a completed load has to be checked, not just one
- Why disabling validation rules during a load is a real but risky practice
- How spot-checking fits alongside, not instead of, systematic checks
- Why "it looked fine" isn't the same as "it was validated"

## Chapter 3 starts with proving the design actually worked

Chapters 1 and 2 built a plan and a design: scope, mappings, transformation rules, sequencing, and specific handling for relationships, files, and history. Chapter 3 is about proving that design actually holds up against real data — and **validation** is the first and most immediate check: confirming that a load that just ran actually did what it was supposed to do.

## Validation operates at more than one level

A single pass of "does it look right" isn't validation — real validation checks several distinct things, because each one catches a different class of problem:

- **Record counts**: did the number of records that loaded match the number expected from the source extract, accounting for any records deliberately excluded by scope? A count mismatch is often the fastest, cheapest signal that something went wrong, long before anyone looks at individual field values.
- **Required-field completeness**: are the fields the target schema marks as required actually populated on every loaded record, or did some records load with required fields quietly left blank (possible if validation rules were relaxed during the load, as discussed below)?
- **Referential integrity**: are relationship fields actually populated and pointing at real records, or did the sequencing design from Chapter 2 leave orphaned records behind despite the plan?
- **Field-by-field spot-checking**: picking a deliberate sample of records and manually comparing every field's value against the original source record, to catch mapping or transformation errors that a count or completeness check wouldn't notice (a value that loaded into the wrong field entirely, for instance, can still produce a correct record count and full completeness).

Each of these catches something the others miss — a load can pass a record-count check and still have widespread field-level mapping errors, or pass a spot-check on the ten records someone happened to look at while failing referential integrity on thousands of others.

## The risky practice of disabling rules during load

A common and genuinely useful technique during a migration load is to temporarily deactivate validation rules (and sometimes automation like triggers or Flows) that would otherwise reject legacy records that don't cleanly satisfy current business rules — rules written for how the business operates today, not for the messier reality of fifteen years of accumulated legacy data. This is a legitimate, widely used technique, but it is risky precisely because it removes a safety net the target org normally relies on. Using it responsibly means treating it as a deliberate, documented, time-boxed decision — exactly which rules are being disabled, for exactly how long, with an explicit step (checked off, not assumed) to re-enable every one of them immediately after the load finishes. A validation rule left disabled by accident after a migration is a silent, ongoing data-quality risk for the live org, not just a migration concern.

## Spot-checking is a complement, not a substitute

Manually reviewing a handful of records feels reassuring, and it genuinely catches things systematic checks miss — but it only ever proves that the specific records someone looked at are correct, not that the whole load is. A responsible validation process uses spot-checking alongside record-count, completeness, and referential-integrity checks precisely because each one covers a gap the others leave open; relying on spot-checking alone, however thorough it feels, is a common way for a widespread but structurally consistent error (every record in a particular mapping category being wrong in the same way) to pass unnoticed, simply because the sample happened not to include that category.

## Key terms

| Term | Meaning |
|---|---|
| Validation | Confirming a completed load actually did what it was supposed to do, checked at multiple levels |
| Record count validation | Comparing the number of records loaded against the number expected from the source |
| Referential integrity check | Confirming relationship fields are populated and point at real, correct records |
| Spot-checking | Manually comparing a deliberate sample of loaded records against their source records field by field |

## Lab

A migration loads 50,000 Contact records. The record count matches exactly what was expected. A spot-check of 25 random records shows every field correct. However, nobody ran a referential-integrity check. Explain what specific problem this validation process could still be missing, and describe how you would design a referential-integrity check for this Contact load to close that gap.

## Check yourself

Can you name the four levels of validation this lesson describes and give one example of a problem each one is specifically designed to catch? Can you explain why disabling validation rules during a load is described as risky even though it's a legitimate, widely used technique?
