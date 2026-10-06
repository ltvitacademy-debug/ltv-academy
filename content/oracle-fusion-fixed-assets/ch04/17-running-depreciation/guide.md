# Lesson 17 — Running Depreciation

**Chapter 4 · Depreciation and Adjustments · Lesson 17 of 33**

## What you'll learn

- What actually happens when you run the Calculate Depreciation process
- The difference between a preview (draft) run and a final run
- Why rollback exists, and when you'd use it
- What "assets that failed to depreciate" means and why it blocks period close

## The process that turns setup into numbers

Everything in Chapters 1–3 — books, calendars, categories, prorate conventions, additions — exists to feed one recurring process: **Calculate Depreciation** (often just called "running depreciation"), executed once per period, per book. It walks every asset currently in service in that book, calculates how much depreciation each one should recognize for the period based on its method, remaining life, and net book value, and produces the period's depreciation amounts.

## Preview versus final

Oracle Fusion Assets lets you run depreciation in two modes:

- **Preview (draft) mode** — calculates depreciation and lets you review the results (Lesson 30's reports are useful here) without committing anything or advancing the period. You can run preview as many times as needed while you're still finding and fixing problems.
- **Final mode** — commits the calculated depreciation, and this is the mode that actually **closes the current period** and advances the book's current open period to the next one (Lesson 8's one-way calendar rule applies here directly).

Because final mode closes the period, it's standard practice to run preview first, review exception reports, fix anything wrong, and only run final once the numbers are confirmed correct — exactly because Lesson 8 established that you generally can't undo a closed period afterward.

## Rollback: undoing a run that hasn't closed yet

If depreciation was run in final mode and something is discovered wrong *immediately afterward, before the period is officially closed and before accounting has been created against it*, Oracle Fusion Assets provides a **rollback depreciation** option that reverses the calculated amounts for that period, putting the book back in a state where depreciation can be rerun. Rollback is a narrow window, not a general undo button — once accounting has been created and transferred (Chapter 6), rolling back is far more disruptive and isn't the normal path for fixing a mistake (a correcting adjustment in a later period, covered in Lesson 18, usually is).

## Assets that failed to depreciate

Not every asset necessarily calculates successfully. An asset might fail to depreciate in a given period because of a data problem — a missing GL account, an invalid category assignment, a cost that's negative due to an unprocessed adjustment. Oracle Fusion Assets produces an exception report listing exactly which assets failed and why, and this is a genuinely hard stop: **a period generally cannot close while assets have failed to depreciate**, which is precisely the mechanism that forces someone to fix the underlying data problem rather than let a silently incomplete depreciation run close the books.

## Key terms

| Term | Meaning |
|---|---|
| Calculate Depreciation | The process, run per period per book, that calculates each in-service asset's depreciation for that period |
| Preview (draft) mode | A depreciation run that calculates and reports without committing or closing the period |
| Rollback depreciation | Reversing a final depreciation run before accounting has been created, to allow a rerun |

## Lab

Meridian Fabrication Co. runs depreciation in preview mode for its corporate book and the exception report shows two assets failed: one with a missing depreciation expense account, one with a category that was deleted after the asset was added. Explain what has to happen before Meridian can successfully run final depreciation for that period.

## Check yourself

Without looking back, can you explain the difference between preview and final depreciation runs, and why a period generally cannot close while assets have failed to depreciate?
