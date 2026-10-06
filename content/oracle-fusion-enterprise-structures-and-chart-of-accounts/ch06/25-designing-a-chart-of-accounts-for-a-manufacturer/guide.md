# Designing a Chart of Accounts for a Manufacturer

Chapters 1 through 5 gave you every individual piece. This lesson puts them together in one worked example: designing a chart of accounts for a fictional manufacturer, **LTV Manufacturing Corporation**. (This is the same fictional company you'll return to for the capstone project later in this path — treat this lesson as your first real rehearsal for that project.)

## What you'll learn

- How to translate a company's real operating structure into segment decisions
- A complete, worked five-segment design for LTV Manufacturing Corporation
- Why each segment got its label, and why some tempting segments were left out
- How this design connects back to every earlier chapter

## The scenario

LTV Manufacturing Corporation is a fictional mid-sized manufacturer with two legal entities (a US parent and a Canadian subsidiary), three cost-center-level departments per entity (Assembly, Fabrication, and Corporate Overhead), and a need to track intercompany transactions between the two entities. Following Lesson 5's design principles, the goal is the simplest structure that satisfies these real requirements — not the most elaborate one possible.

## The worked design

```
LTV Manufacturing Corporation — Chart of Accounts Structure
  Segment 1: Company          (4 digits)  — Balancing (primary) label
  Segment 2: Cost Center       (3 digits)  — Cost Center label
  Segment 3: Account            (4 digits)  — Natural Account label
  Segment 4: Intercompany        (4 digits)  — Intercompany label
  Segment 5: Future              (3 digits)  — no label (reserved)
```

- **Company** carries the mandatory primary balancing label, with one value per legal entity (1000 = US Parent, 2000 = Canadian Subsidiary) — this is what Lesson 9's balancing-segment-value assignment hooks into.
- **Cost Center** carries the cost center label, with values for Assembly (410), Fabrication (420), and Corporate Overhead (510) — grouped under parent/summary values for "Manufacturing" and "Corporate" in a tree (Lesson 23), so reports can roll up either way.
- **Account** carries the mandatory natural account label, classifying every transaction into asset, liability, equity, revenue, or expense ranges.
- **Intercompany** carries the intercompany label, with values matching the Company segment's values exactly (per Lesson 21's restriction), so an intercompany transaction records *which other entity* it's really with.
- **Future** is a reserved, unlabeled segment with no values enabled yet — a common, deliberate practice so that if a genuinely new reporting need appears later (a product line segment, for example), the chart of accounts structure itself doesn't need to be redesigned from scratch, only the Future segment's value set needs to be populated.

## What was deliberately left out

A tempting fifth "real" segment might be **Product Line**, since LTV Manufacturing makes more than one product. It was deliberately not added as an active segment in this design, because the business does not yet need product-level financial reporting — that's exactly the "simplest structure that satisfies today's requirements" principle from Lesson 5 in action. The reserved Future segment exists precisely so this decision doesn't become a costly redesign if that need does appear later.

## How this connects back

Every chapter in this course shows up in this one design: Chapter 2's legal entities map to Company segment values; Chapter 3's business units will eventually be assigned against this structure; Chapter 4's calendar and currency apply per ledger, not per segment; and Chapter 5's labels, value sets, hierarchies, and cross-validation rules are exactly what made this design coherent rather than a guess.

## Recap

A real chart of accounts design starts from a company's actual operating structure, applies the simplest-structure principle, and reserves room for predictable future growth without over-building today. Next up, lesson 26: deploying flexfields and structures — turning this worked design into something a ledger can actually use.
