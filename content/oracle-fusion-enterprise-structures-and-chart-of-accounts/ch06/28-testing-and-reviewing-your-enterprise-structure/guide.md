# Testing and Reviewing Your Enterprise Structure

Whether built screen by screen or through rapid implementation spreadsheets, an enterprise structure should never go live untested. This lesson covers the review a careful consultant runs before calling any chart of accounts, ledger, or legal entity setup "done."

## What you'll learn

- A practical testing checklist, mapped back to the chapters that built each piece
- How to test cross-validation rules deliberately, not just hope they work
- What to check in hierarchies before trusting a rollup report
- Why this review belongs before go-live, not after

## A testing checklist, mapped to this course

```
Enterprise Structure Review Checklist:
  [ ] Legal entities: correct jurisdiction, registration, legal address (Ch.2)
  [ ] Ledger: correct chart of accounts, calendar, currency, method (Ch.2)
  [ ] Balancing segment values assigned per legal entity (Ch.2)
  [ ] Business units: correct functions, correct ledger assignment (Ch.3)
  [ ] Reference data sets: correct business unit assignments (Ch.3)
  [ ] Calendar: correct period dates, adjusting period if needed (Ch.4)
  [ ] Currencies enabled, daily rates loading correctly (Ch.4)
  [ ] Chart of accounts: segment labels correct (Ch.5)
  [ ] Hierarchies: parent/child rollups produce expected totals (Ch.5)
  [ ] Cross-validation rules: both allow valid and block invalid combos (Ch.5)
```

## Testing cross-validation rules deliberately

A cross-validation rule that has never actually rejected anything hasn't been tested — it's just been assumed to work. A real test deliberately attempts to enter a known-bad combination (the exact kind of nonsense combination the rule was written to block) and confirms it is, in fact, rejected, *and* deliberately attempts a known-good combination and confirms it is accepted. Testing only the "it lets good combinations through" side and skipping the "it actually blocks bad ones" side is a common, costly shortcut; a rule that technically exists but was configured backward (or scoped to the wrong range) will not announce the mistake itself.

## Checking hierarchies before trusting a rollup

Before anyone relies on a hierarchy-based report (recall Lesson 23), pull a report for a known parent node and manually verify that the total matches the sum of its expected children — no more, no fewer. A hierarchy with a child accidentally attached to the wrong parent, or a child missing from the tree entirely, will produce a rollup number that is quietly wrong rather than obviously broken, which is exactly the kind of error that's cheap to catch now and expensive to catch after a quarter's financial statements go out the door.

## Why before go-live, not after

Every item on this checklist is dramatically cheaper to fix before the structure has live transactions posted against it than after — a theme this entire course has returned to repeatedly. Testing and review is not a separate phase bolted onto the end of implementation; it is the activity that confirms all the careful design work from Chapters 2 through 6 actually behaves the way it was intended to.

## Recap

A disciplined review checks legal entities, ledgers, business units, calendars, currencies, chart of accounts labels, hierarchies, and cross-validation rules — with cross-validation rules and hierarchy rollups specifically deserving deliberate, not assumed, testing. Next up, lesson 29: common enterprise structure mistakes, the patterns this review is actually designed to catch.
