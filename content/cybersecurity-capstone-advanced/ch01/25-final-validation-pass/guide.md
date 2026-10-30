# Lesson 25 — The Final Validation Pass

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 25 of 26**

## What you'll learn

- Why the whole program gets checked together at the end, not just
  each piece checked once in isolation
- The four things this final pass actually validates, and the
  specific question asked of each one
- Why this pass is the same discipline as Lesson 24's validation gate,
  applied one level up — to the entire capstone, not one rollout
- What "done" actually means for this capstone, stated as a checklist
  rather than a feeling

## Why check everything together, at the end

Each piece of this program was validated on its own as it was built —
the pilot segmentation, the identity consolidation, the automation,
the corrected risk register. But a program built in pieces can still
have a seam between the pieces that nothing individually catches.
This final pass exists to ask one more question none of the earlier
checks asked: do all four pieces agree with each other, right now, at
the same time, across both OT segments?

## The four things validated together

| Piece | What's checked |
|---|---|
| Segmentation | Both the OT/SCADA pilot segment and the new second segment enforce least-privilege network policy, and the second segment's validation gate from Lesson 24 has actually closed with all three criteria passed |
| Identity consolidation | Azure AD and AWS IAM Identity Center report the same standing-access counts for both segments, with zero orphaned or shadow local accounts remaining anywhere in scope |
| Automation | The dual-check validation job is running on its production schedule against both segments, logging results, and its 30-day stale-grant sweep from Lesson 19 has completed at least one real cycle |
| Risk register | GRC-RISK-0147 shows status Closed with the real finding and all four corrective actions marked complete, and no new open item from this phase is sitting without an owner or a due date |

## Finding the seam a single check would miss

Running these four checks together, instead of trusting each one's
own most recent individual result, is what actually catches a seam.
For example: the automation's dashboard might show "all clear" because
it's reporting against last week's account list, while the identity
platform already processed three new privileged grants since then that
the automation hasn't picked up yet. Neither check is wrong on its own
— the gap only exists *between* them, at this moment, and only a pass
that looks at both together, at the same instant, can see it.

## Why this is Lesson 24's discipline, one level up

Lesson 24 refused to trust a single data point before flipping on
enforcement for one segment. This final pass applies the identical
standard to the entire capstone: don't declare the program done because
each component individually reports "healthy" — confirm all of them
agree, checked together, right now. It's the same principle that
caught the original discrepancy in Lesson 12, applied one more time,
at the largest scale this capstone reaches.

## What "done" actually means here

| Checklist item | Status required |
|---|---|
| Both OT segments segmented and gate-passed | Complete |
| Identity counts match across Azure AD and AWS for both segments | Complete |
| Automation running on schedule, logging, sweep completed once | Complete |
| Risk register closed, corrective actions complete, no orphaned open items | Complete |

Only when every row reads "complete," confirmed together in the same
pass, is the program actually validated — not when each piece's own
dashboard happened to look fine the last time someone checked it.

## Key terms

| Term | Meaning |
|---|---|
| Point-in-time validation | Confirming several systems' state at the exact same moment, rather than trusting each one's most recent separate check |
| Seam | A gap that exists only between two individually correct components, invisible to either one checked alone |

## Lab

1. Write the specific question this final pass asks of each of the
   four pieces, in your own words.
2. Describe, in a few sentences, a plausible seam this pass could
   catch that none of the program's individual component checks would.

## Check yourself

You're ready for Lesson 26 when you can explain why checking all four
pieces together, at the same moment, catches something that checking
each piece individually — even correctly — cannot.
