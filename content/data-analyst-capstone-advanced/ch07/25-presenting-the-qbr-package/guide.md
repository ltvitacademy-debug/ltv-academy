# Lesson 25 — Presenting the QBR Package to the Business

**Chapter 7 · Resolving the Discrepancy and Wrap-Up · Lesson 25 of 26**

## What you'll learn

- How to actually run the three presentations this capstone has been
  building toward — Executives, the Board, and Finance — each in its
  own real format
- What to say about Chapter 7's discrepancy, to whom, and why that
  answer is genuinely different depending on the audience
- Why "the numbers agree" is itself a deliverable, not a footnote
- What this capstone's full architecture actually bought the
  business, stated plainly

## Three presentations, three real formats

| Audience | Format | What actually happens in the room |
|---|---|---|
| Executives | Live Power BI session | Click from the Executive Summary into the Regional Drill-Down, answering follow-up questions on the spot |
| The Board | The published Tableau Public deck | Walk through the formatted dashboard from Lesson 18, as a presentation, not an exploration |
| Finance | The reconciled Excel workbook | Hand over the workbook itself, with its PivotTable and corrected `SUMIFS` total, for Finance's own sign-off |

Each of these is the real, finished version of the deliverable Lesson
1 originally scoped out for that audience — not a generic summary
adapted three ways, but three independently real artifacts.

## What to say about the discrepancy — and to whom

This is the part of "presenting" that's easy to get wrong. The
instinct to hide a mistake that's already fixed is understandable,
but it's the wrong instinct here, and the right answer isn't the same
for every room:

- **Finance** gets the full, specific story: what the bug was (an
  inclusive date boundary double-counting one day), how it was found
  (a cross-tool total mismatch), and that it's fixed and
  re-validated. Finance is the audience with the technical context —
  and the direct stake — to want that detail.
- **Executives and the Board** get the short version, if it comes up
  at all: "all three numbers were cross-checked against each other
  this quarter, a small discrepancy was found and corrected before
  this meeting, and all three now agree exactly." That's accurate,
  it's honest, and it doesn't bury a non-technical audience in a
  `SUMIFS` syntax discussion they don't need in order to trust the
  number in front of them.

Both of these are honest. Neither hides what happened. The difference
is which level of detail actually serves each audience — the same
judgment call Lesson 18 made about formatting, now applied to what
gets said out loud.

## What this capstone's architecture actually bought

It's worth stating plainly, out loud, what building one warehouse
underneath three independent front-ends actually accomplished this
quarter: a real, specific error got caught and fixed **before** it
reached a board meeting, not after. That's not a hypothetical benefit
of good architecture — it's the literal thing that happened in
Chapter 7. If Finance's Excel workbook had been the *only*
deliverable, or if all three tools had queried the same spreadsheet
formula instead of an independently-correct warehouse, this error
would have gone to the Board uncaught.

## Key terms

| Term | Meaning |
|---|---|
| Audience-appropriate disclosure | Giving each audience the right level of detail about a problem — honest in every case, but not identically detailed |
| Cross-tool validation | The practice (demonstrated for real in Chapters 6-7) of building the same figure independently more than once specifically to catch errors a single tool wouldn't reveal |

## Lab

1. Draft, in your own words, the one-sentence version of the Chapter
   7 discrepancy you'd give to an Executive or Board member.
2. Draft the full, specific version you'd give to Finance.
3. Write one paragraph stating, plainly, what this capstone's
   shared-warehouse architecture actually prevented this quarter.

## Check yourself

You're ready for Lesson 26 when you can explain why the discrepancy
gets disclosed differently to Finance than to Executives and the
Board, without either version being dishonest, and why a shared
warehouse is what actually made catching this error possible in the
first place.
