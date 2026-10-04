# Script — Performance Considerations

## Segment 1 (title)

We're closing out the deployment and administration chapter by pulling everything together — dataset design, caching, expressions — into one coherent way to think about report performance. And it starts with a single diagnostic question.

## Segment 2 (steps: diagnostic question)

Is every report slow, or just one? If it's every report, that's almost never about any single report's design — it's infrastructure. Report processing is memory-intensive, hosting the report server and its database on separate machines tends to help, and if the whole server's straining, that's the scale-out deployment from earlier in this chapter, spreading load across multiple instances. But if it's just one report, the fix lives inside that report — and dataset query efficiency is where you look first, before touching caching at all.

## Segment 3 (steps: the fix order)

Filter and sort and aggregate at the data source, not inside the report — every unnecessary row is cost you're paying twice. Tie report parameters to query parameters so you're retrieving less in the first place. Only once the query itself is efficient does caching become a real multiplier — a snapshot in particular, since caching still makes the very first requester pay the full cost, while a snapshot runs on its own schedule and never makes a live user wait. And watch expression complexity — a heavy expression repeated across a table's rows adds up fast; that's often better as a calculated field, computed once instead of re-evaluated per row.

## Segment 4 (screenshot: execution-summary-report-part1)

And here's what "measure, don't guess" actually looks like — a report built on top of the execution log itself. A hundred ninety-three total executions over this month, a hundred eighty-three successful, ten failed. Failed Executions is its own number worth watching, not just speed. And look at the Day of Week chart — load isn't even across the week at all, it spikes hard on Friday and Saturday. That's the kind of thing you'd never catch just eyeballing one slow report in isolation.

## Segment 5 (screenshot: execution-summary-report-part2)

Same report, scrolled down — and this is the diagnostic question from the start of the lesson, answered with actual numbers instead of a guess. Top 10 Most Executed, Top 10 Longest Running, Top 10 Largest Reports, Top 10 Users. DivisionSummary only ran once, but it's sitting at the top of Longest Running — that's your signal. CommissionDetails ran a hundred seventy-eight times and still processes fast. That's "is it every report, or just one" turned into a report you could hand someone, not just an opinion.

## Segment 6 (outro)

That's Chapter 8. Next up: the capstone — building a real paginated report suite that pulls together everything from datasets through deployment.
