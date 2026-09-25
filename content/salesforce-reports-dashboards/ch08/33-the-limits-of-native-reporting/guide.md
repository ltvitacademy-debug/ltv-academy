# The Limits of Native Reporting

Seven chapters of this course have shown how much you can do with Salesforce's built-in
reports and dashboards: report types, filters, formulas, charts, dashboards, and full
sales and service analytics. This chapter is the honest counterweight. Every tool has
edges, and an analyst who knows where they are chooses the right tool early instead of
fighting the wrong one for a week.

A note on numbers: Salesforce adjusts report and dashboard limits between releases and
editions. Everything below describes limits in general terms ("in most orgs...") — always
check the current Salesforce documentation before you promise a stakeholder something
specific.

## What you'll learn

- The structural limits that come from how report types work
- The scale and performance limits that appear with large data
- Why historical questions are hard natively, and what partial help exists
- The calculation and data-blending gaps that push analysts toward other tools

## Limit 1: everything starts from a report type

Every report is built on one **report type**, a predefined set of objects and the
relationships between them. You already know the standard ones (Opportunities, Cases,
Opportunities with Products) and that admins can create custom report types. The limit is
that a report type is a fixed path through related objects. In most orgs only a few object
levels can be chained in one type, and you can't simply join any two objects because you
want to, the way you would with a T-SQL `JOIN` on any matching key.

Cross filters ("Accounts with Opportunities") and joined reports (several blocks side by
side) stretch this considerably, but each has its own caps, and neither gives you a true
row-level join across unrelated objects.

## Limit 2: scale and display

Reports run against live, transactional data. In most orgs a report page displays only the
first couple thousand rows even though summaries and charts count everything, and exporting
large volumes has its own rules. Dashboards also cap how many components and dashboard
filters they can hold. These limits are rarely a problem for a manager's pipeline view. They
become one when the question is "analyze all 4 million activity records."

## Limit 3: history

A standard report shows records **as they are right now**. Ask "what did the pipeline look
like on the first day of last quarter?" and a normal report cannot reconstruct it. Two
native features help for specific cases:

- **Reporting snapshots** copy the results of a report into a custom object on a schedule,
  building your own history from the day you set it up.
- **Historical trend reports** track changes over time for selected objects such as
  Opportunities and Cases, within limits on fields and dates.

Both need to be planned in advance. Neither can travel back and create history you never
captured.

## Limit 4: calculations and outside data

Formulas in reports work on the data in that report. You can't natively compute across
unrelated objects, run cohort analysis, or do statistical work. And reports can only use
data that lives in Salesforce. Revenue in your ERP, web traffic in an analytics tool, or a
budget in a spreadsheet cannot be blended into a native report.

## Limit 5: performance

Because reports query live data, very large objects, broad filters, and complex cross
filters can be slow or time out. Better filters on indexed fields help, but there is a
point where the tool, not your report design, is the constraint.

## Key terms

| Term | Meaning |
|---|---|
| Report type | The fixed set of related objects a report is built on |
| Reporting snapshot | A scheduled copy of report results into a custom object, for building history |
| Historical trend report | A report showing how selected fields changed over time |
| Blending | Combining Salesforce data with data from another system in one analysis |

## Recap

Native reporting is bounded by report types, scale, history, calculation scope, outside
data, and performance. Knowing each wall lets you recognize it early. The next lesson gives
you a practical framework for deciding what to do when you hit one.

## Check yourself

A stakeholder asks for a chart of pipeline as it stood on the first day of every quarter
for the last two years, but nobody set up snapshots or trend reporting. Why can't a
standard report answer this, and what could you set up so the question is answerable next
year?
