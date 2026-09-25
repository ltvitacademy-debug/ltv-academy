# ROI Reporting

Every marketing leader eventually gets the question: what did we get for that money? This lesson closes Chapter 7 by turning campaign data into return on investment, cost per lead and revenue-per-campaign views, and by being clear about what native reporting can and cannot attribute. All example numbers below are illustrative.

## What you'll learn

- The campaign fields that feed cost and revenue calculations
- How to build an ROI summary formula on the Campaigns report type
- How to calculate cost per lead and cost per won deal
- Where attribution in native Salesforce runs out, and what Campaign Influence adds

## The fields that matter

The Campaign object has cost fields, **Budgeted Cost** and **Actual Cost**, and roll-up fields that count what the campaign produced: leads, converted leads, opportunities, won opportunities and the total value of won opportunities. The value fields are calculated from opportunities whose Primary Campaign Source points at that campaign. Field labels vary slightly, so look in the field picker for names like "Actual Cost in Campaign" and "Total Value Won Opportunities in Campaign."

The quality of every ROI number depends on cost being entered. If Actual Cost is empty on half your campaigns, ROI is undefined, not zero. Filter to campaigns with a cost, and say so.

## ROI as a summary formula

ROI is the profit relative to cost:

ROI = (Value won minus Actual cost) divided by Actual cost

For a webinar that cost $10,000 (example) and is linked to $45,000 of won opportunities (example), the ROI is (45,000 minus 10,000) divided by 10,000, which is 3.5, or 350 percent. In a report on the Campaigns report type, this is a summary formula on the two roll-up fields, formatted as a percent. Group by campaign type, or by campaign, to compare. Always show the cost and the revenue columns next to the percent, so readers can see a big ROI on a tiny spend for what it is.

Also decide the revenue basis. Total value of won opportunities is revenue, not profit, so the formula above is closer to a return on spend. If leadership means profit margin, you need a margin figure that Salesforce probably does not hold.

## Cost per lead and per win

Two efficiency measures are often more actionable than ROI:

- **Cost per lead**: actual cost divided by number of leads in the campaign
- **Cost per won opportunity**: actual cost divided by number of won opportunities

Example: $10,000 spent, 200 leads and 5 won deals gives $50 per lead and $2,000 per win. A campaign with cheap leads and no wins may be worse than one with expensive leads that close. Reading both together shows it.

## Time lag

Revenue follows spend by weeks or months. A campaign that ran last month may show zero won value simply because its deals have not closed. Compare campaigns run in a period old enough for a full sales cycle, using the cycle length you measured in lesson 27. Newer campaigns can be reported on pipeline value (open opportunities) instead, labeled as pipeline.

## Where native attribution runs out

- **Single source credit.** The standard model credits one campaign per opportunity, usually the one recorded as the primary source. Earlier and later touches get nothing.
- **Campaign Influence** is an optional feature, depending on edition and configuration, that links campaigns to opportunities through contact roles and can split credit using models such as first touch, last touch or even distribution. It changes what your reports show, so check whether it is enabled and which model is used before you compare numbers.
- **Anything outside Salesforce** such as ad spend, web traffic and anonymous visits is invisible to standard reports unless integrated. Marketing automation tools often bring their own attribution reports.

The honest framing for stakeholders is that native campaign ROI is a useful, comparable estimate, not a complete accounting. Lesson 33 examines this kind of limit across the whole of native reporting.

## Recap

ROI needs cost and revenue on the same campaign, so enter costs and use a summary formula on Campaigns. Pair it with cost per lead and cost per win, allow for the sales cycle lag, and be clear that single-source credit, or a chosen Campaign Influence model, shapes every number.
