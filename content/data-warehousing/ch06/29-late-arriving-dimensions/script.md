# Script — Late-Arriving Dimensions

## Segment 1 (title)

Chapter 5 taught you to process dimensions before facts, so every fact row always has a real dimension to reference. This lesson covers the legitimate case where that order breaks down anyway.

## Segment 2 (steps: the hotel loyalty example)

Microsoft's own guidance gives a clean example. A hotel guest checks in and joins the loyalty program right there — a membership number gets issued immediately, because the fact of the stay needs recording now. But the actual paperwork, the guest's name and address and other details, might not get processed for days, if ever. The fact shows up before the dimension's full details do.

## Segment 3 (real Microsoft Fabric diagram)

Zoom out to the general fact-load process and you can see exactly where this fits. For every dimension key a fact row needs, the ETL process looks up the current surrogate key. If that lookup fails — no matching row exists yet — the process still has to insert the fact, so it creates a new dimension row on the spot, using Unknown placeholder values for everything except the natural key it trusts is real.

## Segment 4 (steps: closing the loop)

That new row is called an inferred member, and it gets an audit attribute, IsInferredMember, set to true. When the real details eventually arrive, the dimension load process treats the update as a late-arriving detail, not a Slowly Changing Dimension change — the attributes just get updated in place, and the flag flips back to false. There's no real history to preserve here, because the row never had real values to begin with.

## Segment 5 (outro)

Late-arriving dimensions handle facts that beat their dimensions to the warehouse. Next lesson shifts to pure performance: pre-summarized aggregate tables built on top of a detailed fact table.
