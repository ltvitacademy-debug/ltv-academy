# Script — Running and Scheduling BI Publisher Reports

## Segment 1 (title)

You've built a data model and a template. Now let's close the loop: how does the finished report actually get run, on demand or on a recurring schedule, and where does the output end up?

## Segment 2 (steps)

Running on demand means supplying the parameters defined in the data model, a period, a business unit, a date range, picking an output format, and running it. That's functionally similar to selecting a point of view for a Financial Reporting Studio report, just with parameters specific to this report's own data model.

## Segment 3 (steps)

To run unattended, a report needs a job definition, registering it so it can be submitted through Scheduled Processes, Oracle's general-purpose work area for background jobs. Once that exists, a user submits it like any scheduled process, supplying the same kinds of parameters, but also specifying when and how often it should run.

## Segment 4 (steps)

Recurrence gets configured in familiar terms, daily, weekly, monthly, or a custom pattern like the second business day of every month, which matters for close-related reports waiting on subledgers to close first. The underlying engine is Oracle's Enterprise Scheduler Service, running the job without anyone needing to remember to click run.

## Segment 5 (outro)

And once it runs, output needs somewhere to go, saved to a shared location, emailed directly to recipients, printed to a configured printer for things like checks. A single job can deliver through more than one channel at once. Up next, lesson nineteen: specific, common financial BI Publisher reports you'll actually run in practice.
