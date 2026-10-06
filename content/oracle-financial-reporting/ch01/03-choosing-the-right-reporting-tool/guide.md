# Choosing the Right Reporting Tool

You now know the four tools exist, and where their output lives. This lesson turns that map into a decision you can actually make on the job: a client or a manager asks for "a report," and you need to figure out, fast, which of the four tools they actually need. Getting this wrong wastes hours — building a BI Publisher data model for something that should have been a five-minute OTBI analysis, or trying to force a formatted statutory statement out of a tool that was never meant to produce one.

## What you'll learn

- A practical decision framework built around four questions
- Worked examples matching real requests to the right tool
- Why "just use Excel" is not, by itself, an answer
- What to do when a request genuinely needs more than one tool

## Four questions to ask before you build anything

**1. Does the output need to look exactly the same, in a precise, pre-defined layout, every time?**
If yes — a statutory financial statement, a check, a government form, a customer invoice — you are looking at either **Financial Reporting Studio** (for financial statements driven off GL balances) or **BI Publisher** (for almost anything else with a precise required layout).

**2. Is this a one-time or occasional question someone wants answered quickly, where the exact layout doesn't matter much?**
If yes — "show me all payables invoices over $10,000 that are more than 30 days old" — that's **OTBI**. Build an ad hoc analysis, get the answer, move on.

**3. Does this output need to run unattended, on a schedule, and land in someone's inbox or a shared folder automatically?**
If yes, you're in **BI Publisher** territory, scheduled through the Scheduled Processes work area, regardless of whether the data originally came from an OTBI-style query or a SQL-based data model.

**4. Does the requester actually want to work the numbers themselves, live, in a spreadsheet — pivoting, drilling, building their own layout — or does this need a formal, collaborative, signed-off narrative package?**
If yes, that's **Smart View**: straight ad hoc analysis for the first case, Report Packages for the second.

## Matching requests to tools

| Request | Right tool | Why |
|---|---|---|
| "I need the Income Statement for March, formatted the same way it's always been." | Financial Reporting Studio | Formatted financial statement off GL balances, consistent layout every period |
| "Can you show me every supplier invoice over $10,000 that's more than 30 days past due, right now?" | OTBI | Quick, ad hoc, exact layout doesn't matter |
| "We need the 1099-MISC forms generated and emailed to each vendor automatically in January." | BI Publisher | Precise required layout, scheduled, automated delivery |
| "I want to pull GL balances into Excel myself and build my own variance analysis." | Smart View | User wants to work live data directly in a spreadsheet |
| "Finance needs a signed-off board package combining commentary and numbers from five contributors." | Smart View Report Packages | Collaborative, author/review/sign-off workflow |
| "Give me a dashboard the AP team can check every morning." | OTBI (dashboard) | Recurring, interactive, viewed inside the application |

## "Just use Excel" is not an answer by itself

New consultants sometimes default to "export everything to Excel and go from there." That's not wrong exactly — Smart View *is* Excel — but it skips the actual decision. Exporting a one-time OTBI result to Excel for a quick calculation is fine. Rebuilding a recurring, scheduled, formatted statutory report by hand in Excel every month, when BI Publisher could run it unattended, is a waste of everyone's time and introduces manual error into something that should be automated. The framework above exists so "Excel" is a conscious choice, not a reflex.

## When a request needs more than one tool

Real requests are often layered. "Give me the AP aging as a live dashboard the team checks daily, and also email a PDF version to the controller every Friday" is two tools, not one: an OTBI dashboard for the first half, a BI Publisher report scheduled weekly for the second. Part of being a good consultant is recognizing when a single request should be split, rather than forcing one tool to do a job it wasn't built for.

## Recap

Four questions get you most of the way to the right tool: does the layout need to be exact and consistent, is this quick ad hoc exploration, does it need to run unattended on a schedule, and does the requester want to work the data themselves or get a signed-off package. Next up, lesson 4: before you build any of this, who is even allowed to see it — reporting security and data access.
