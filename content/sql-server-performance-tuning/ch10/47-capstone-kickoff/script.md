# Script — Capstone Kickoff: A Slow Production Database

## Segment 1 (title)

Chapters 1 through 9 gave you a full methodology. This chapter is one continuous scenario across six lessons, where you apply all of it to a single genuinely slow production database — start to finish.

## Segment 2 (code: the company and the procedure)

Meet Meridian Outfitters — an outdoor gear retailer with a database called MeridianRetail. Its support reps use a CRM called MeridianConnect, and one stored procedure, usp_CustomerOrderHistory, powers the Order History panel every rep relies on. Three years ago dbo.Orders held two million rows. Today it holds fourteen million, largely because of a B2B wholesale program launched eighteen months ago — accounts like TrailWorks Co-op place thousands of orders a year, not dozens.

## Segment 3 (steps: what reps are reporting)

The ticket volume isn't vague. Starting about six weeks ago, reps report the Order History panel spinning twenty to thirty seconds before timing out — worst between ten AM and two PM, Meridian's peak call-center hours, and concentrated on specific accounts rather than every customer.

## Segment 4 (code: resist the urge to guess)

It would be easy to guess right now — "probably a missing index," "probably tempdb." But Chapter 1's loop exists to stop you from acting on a guess. Every clue here — intermittent, load-correlated, account-specific — is data you'll use, not noise you skip past.

## Segment 5 (outro)

Next up: gathering a real baseline, reading the actual execution plan, and checking real wait statistics — measuring before touching anything.
