# Script — Standard Filters

## Segment 1 (title)

Chapter two is about narrowing a report to the records that matter. We start with standard filters, the ones you'll use in almost every report you build.

## Segment 2 (steps: three kinds)

The Filters tab gives you three kinds. Show Me controls whose records you see, such as all, mine, or my team's. The date filter pairs a date field with a range like this quarter or last thirty days. And field filters let you choose any field, an operator, and a value. You'll combine all three in most reports.

## Segment 3 (screenshot: adding a field filter)

Here's the real Report Builder. Show Me, Close Date, and Opportunity Status are on top, and a new Lead Source filter is being added. The operator is contains, the value is Partner. There's also a Locked checkbox, which we'll come back to.

## Segment 4 (screenshot: locked filter results)

And here's the result: five opportunities, all with a Lead Source of Partner. Notice the padlock beside the Lead Source filter. A locked filter can't be changed by people who run the report, which protects the report's meaning.

## Segment 5 (code: WHERE)

If you write SOQL, none of this is new. Show Me is like an owner condition, the date filter is a date literal such as this quarter, and each field filter is another WHERE condition. Field filters are combined with AND by default, and in most orgs you can add up to twenty of them.

## Segment 6 (outro)

Standard filters look at fields on the report's own records. What if you need to filter by whether related records exist? That's a cross filter. Before you move on, practice adding a filter and watching the record count change. Next up: cross filters.
