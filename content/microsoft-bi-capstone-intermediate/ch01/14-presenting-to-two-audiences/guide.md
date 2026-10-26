# Lesson 14 — Presenting to Two Different Audiences

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 14 of 16**

## What you'll learn

- Why the same facts need two different presentations, not one
- A short, business-impact framing for the Sales Director
- A fuller, technical walkthrough for the Operations Manager
- The one thing both versions must say accurately, no matter how they're framed

## Same facts, different jobs

You now have one real story: a mismatch was found, root-caused, fixed, and documented. The Sales
Director and the Operations Manager both deserve to hear about it — but "deserve to hear about
it" doesn't mean "hear the identical words." Each audience has a different job to do with this
information.

## For the Sales Director: brief, business-impact framing

The Sales Director needs to know whether the numbers she's been presenting to leadership were
reliable, and for how long. She doesn't need DAX syntax. A version built for her:

> "Last week we found that the Executive Summary's Total Sales figure wasn't responding to the
> region filter — it was always showing the company-wide total, even when a specific region was
> selected. It's fixed and verified across every region now. Company-wide totals with no region
> selected were accurate the whole time; the issue only affected the figure when a specific region
> was filtered."

Notice what this version does: states what was wrong in plain business terms, states the current
state clearly ("fixed and verified"), and proactively answers the question she'll actually
ask — "was anything I presented wrong?" — instead of leaving her to ask it.

## For the Operations Manager: the fuller technical walkthrough

The Operations Manager reported the bug and will want to understand it, partly because she'll be
the one who notices if something like it happens again. A version built for her can include the
real mechanics:

> "The Executive Summary's card was bound to a measure called `Total Sales (All Regions)`, which
> uses `CALCULATE` with `ALL(TerritoryDim)` to intentionally ignore region filters — it's meant to
> be a company-wide benchmark for a different card. With no region selected, that measure and the
> normal `Total Sales` measure return the same number, which is why it wasn't caught at first.
> I've rebound the card to the correct measure, renamed the benchmark measure so this is less
> likely to happen again, and validated it across every territory."

This version respects that she'll ask follow-up questions and wants the real explanation, not a
simplified one.

## The one thing that can't change between versions

Both versions must agree on the facts: what was wrong, which numbers were affected, which numbers
were *not* affected, and that it's fixed and validated. The *framing* and *level of detail*
change with the audience — the *truth* doesn't. A simplified explanation that's also inaccurate
isn't good communication, it's just a different problem.

## Key terms

| Term | Meaning |
|---|---|
| Business-impact framing | Communicating what a technical issue meant for decisions made, not how it works internally |
| Technical walkthrough | A fuller explanation including the actual mechanism, for an audience that wants it |

## Lab

Write both versions yourself, in your own words, grounded in Lesson 13's root-cause document.
Keep the Sales Director's version to 3-4 sentences. Let the Operations Manager's version be as
long as it needs to be to actually explain the mechanism.

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: what's allowed to differ between
the two versions of this explanation, and what's never allowed to differ?
