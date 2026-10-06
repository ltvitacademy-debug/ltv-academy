# Running and Scheduling BI Publisher Reports

You've built a data model and a template. This lesson closes the loop: how the finished report actually gets run — on demand or on a recurring schedule — and where its output ends up. This is also where BI Publisher earns the "unattended, scheduled delivery" role from the Chapter 1 decision framework.

## What you'll learn

- Running a report on demand with parameters
- The Scheduled Processes work area and job definitions
- Setting a recurring schedule
- Delivery options: where the output actually goes

## Running on demand

A BI Publisher report can be run manually at any time by a user with access: supply the parameters defined in the data model (lesson 16) — a period, a business unit, a date range — pick an output format, and run it. This is functionally similar to selecting a point of view for a Financial Reporting Studio report, just with parameters specific to this report's own data model rather than the shared GL balances cube.

## Scheduled Processes and job definitions

For a report to run unattended, it needs a **job definition** — a configuration that registers the report (or more precisely, a specific report definition) as something that can be submitted through the **Scheduled Processes** work area, Oracle Fusion's general-purpose place for running and monitoring background jobs, not just reporting jobs. Once a job definition exists for a report, a user can submit it like any other scheduled process: supplying the same kinds of parameters you'd supply running it manually, but this time specifying when and how often it should run.

## Setting a recurring schedule

Within Scheduled Processes, a report's recurrence can be configured in familiar terms — daily, weekly, monthly, or a specific custom pattern (say, the second business day of every month, which matters a great deal for close-related reports that need to wait for subledgers to close first). The underlying scheduling engine is Oracle's **Enterprise Scheduler Service (ESS)**, which runs the job at the specified times without anyone needing to remember to click "run."

## Delivery options

Once a scheduled report runs, its output needs to go somewhere. Typical delivery options include:

- **Saving to a shared location** within Oracle Fusion where authorized users can retrieve it later.
- **Emailing** the output directly to one or more recipients — the mechanism behind a request like "email the 1099s to vendors automatically every January" from Chapter 1.
- **Printing** to a configured printer, relevant for physical documents like checks.
- Depending on configuration, delivery to other destinations such as FTP locations.

A single scheduled job can sometimes be configured to deliver through more than one of these channels at once, matching how real recurring business processes often need the same output to reach more than one audience in more than one way.

## Recap

Running a BI Publisher report on demand means supplying parameters and picking an output format; running it unattended requires a job definition submitted through Scheduled Processes, scheduled via Oracle's Enterprise Scheduler Service, with output delivered by saving, emailing, printing, or other configured channels. Next up, lesson 19: specific, common financial BI Publisher reports you'll actually run in practice.
