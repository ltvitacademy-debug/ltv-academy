# Script — Pipeline & Conversion Analysis

## Segment 1 (title)

Three of Project One's questions live in this lesson: which lead sources convert, does pipeline cover the gap to quota, and which deals have gone quiet. All numbers are illustrative.

## Segment 2 (code: conversion by source)

Start with conversion by source. Web converts ten percent. Partner Referral, twenty-five. Phone Inquiry, twenty. Purchased List, just five percent. Overall, one hundred twenty-two of a thousand leads converted, twelve-point-two percent. Purchased List supplies a quarter of all leads and converts worst. That's a resource decision, not just a statistic.

## Segment 3 (code: the report recipe)

The recipe. Leads report type, created in the last ninety days, grouped by Lead Source. Add a row-level formula flagging converted leads as one or zero, then a summary formula: flag sum divided by row count. Use the formula editor's picker for exact field names.

## Segment 4 (screenshot: win rate formula)

Here's the same pattern in a real Trailhead example: a summary formula named Win Rate, sitting next to Sum of Amount and Record Count. Ours will use won flag sum divided by row count, giving a thirty-five percent win rate, one hundred forty won of four hundred closed.

## Segment 5 (code: pipeline by stage)

Now pipeline. Closed equals false, grouped by stage. Ninety-six open deals worth four-point-eight million. Prospecting one-point-two, Qualification one-point-two-five, Proposal one-point-three-five, Negotiation one million. Same result in SOQL, with GROUP BY StageName.

## Segment 6 (code: coverage vs. expected value)

Coverage. One-point-three-five million closing this quarter, against a five-hundred-forty-thousand-dollar gap, is two-and-a-half-times. Looks healthy. But thirty-five percent of one-point-three-five million is about four hundred seventy-three thousand. Short by roughly sixty-seven thousand. Say so, and hedge it: win rate by count is a blunt tool.

## Segment 7 (code: stalled deals)

Finally, stalled deals. Open opportunities where last activity is older than thirty days, or blank. Twenty-one deals worth nine hundred thousand dollars. Keep it as a table on the dashboard, so managers can act.

## Segment 8 (outro)

Next, the same lens on the six reps.
