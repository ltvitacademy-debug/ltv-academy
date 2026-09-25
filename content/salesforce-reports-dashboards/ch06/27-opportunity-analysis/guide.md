# Opportunity Analysis

Pipeline shows how much is open, and win/loss shows how deals end. Between them sits the question of how deals behave: how big they are, how long they take, where they stall, and what is in them. In this lesson you will pick the right standard opportunity report types for each of those questions and learn the calculations that make them useful.

## What you'll learn

- Which opportunity report types answer which question
- How to calculate average deal size and sales cycle length
- How to find where deals stall using stage history
- How to slice opportunities by product, owner and segment without double counting

## Choose the report type first

The report type decides which fields and related records you can use, so choosing it is the first analytical decision. The Opportunities category in most orgs includes:

- **Opportunities**: one row per opportunity. The default for size, cycle and ownership.
- **Opportunities with Products**: one row per line item. Use it for product mix, quantity and revenue by product family.
- **Opportunity History**: one row per stage change or amount change. Use it to see how a deal moved.
- **Opportunities with Contact Roles**: one row per contact role. Use it to see who is involved in deals.

The exact list depends on which features your org uses (Products, Partners, Competitors). If a report type you expect is missing, ask whether the feature is enabled rather than assuming the data does not exist.

## Average deal size

Filter to Closed Won opportunities in a period, group by whatever you want to compare, and summarize Amount as an average. The most common mistake is averaging across all opportunities, which mixes open, lost and won deals. For the average of what you actually sold, restrict to won. Compare it with the median mentally: a single very large deal can drag an average well above what a typical deal looks like, so look at the sorted amounts too.

Bucketing (Chapter 2) is useful here. Bucket Amount into small, mid and large deals, then report count and win rate per bucket.

## Sales cycle length

Cycle length is how many days pass between when a deal is created and when it closes. Two native options:

- The standard **Age** field on an Opportunity, which reports days since creation and is useful for open deals
- A row-level formula subtracting Created Date from Close Date, filtered to closed won deals, then averaged

Group the result by lead source, product or owner and you will usually find that cycle length varies more than teams expect. Check that close dates are actual close dates for won deals, because reps sometimes leave planned dates untouched.

## Where deals stall

**Opportunity History** lets you measure time in stage. In a summary report grouped by Stage, the stage duration field shows how long deals spent there. A stage where the average duration is far longer than the rest is your bottleneck. Historical detail only exists for changes made after history tracking was on, so short histories may reflect recent tracking rather than recent behaviour.

## Slice without double counting

Reports that include related records repeat the parent. An Opportunities with Products report has one row per product line, so summing Amount at opportunity level will count the deal amount once per line. Sum the line item's own price or total field instead when you are using that type, and use record count carefully.

Good dimensions for slicing include Owner, Lead Source, Account Type or Industry, Record Type, and Type (new business versus renewal). Pick one or two per report. A matrix of Type by Stage often answers a question a single grouping cannot.

## Recap

Pick the report type that matches the grain you need. Average deal size means won deals only. Sales cycle can come from Age or a row-level formula. Opportunity History reveals stalled stages. And whenever a report type adds child rows, make sure your totals are not counting the parent more than once.
