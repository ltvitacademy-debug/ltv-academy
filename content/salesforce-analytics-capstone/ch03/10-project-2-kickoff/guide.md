# Project 2 Kickoff: The Business Questions

Project 1 gave you a lot of structure: each lesson told you which report to build and roughly how. Project 2 keeps the same shape, but the scaffolding is thinner. You still get a roadmap and worked examples, but you'll make more of the decisions yourself. This lesson sets up the project: who's asking, what they want to know, and how you'll define each measure before you touch a report.

All company details and numbers in this project are illustrative examples for a fictional company, Alder & Vale Systems. Your org will differ, and UI wording can vary by release, so trust the pickers your org shows you.

## What you'll learn

- How to read a service manager's request and turn it into measurable questions
- How to define backlog, first response time, resolution time, and satisfaction precisely
- Which Case fields you'll rely on, and where the data may not exist
- What "done" looks like for Project 2

## The scenario

Alder & Vale Systems runs Sales Cloud and Service Cloud. Its four-person support team, Ines Costa, Ravi Menon, Hannah Berg, and Omar Aziz, handles cases from customers of the software. The Head of Support has three worries: the queue feels like it's growing, customers say answers take too long, and she can't tell whether the team needs another hire or a better process. She wants a report pack and a short readout in two weeks.

Your job is not to build reports. Your job is to answer her questions with numbers she can trust.

## From worry to question

Vague requests become answerable when you name the measure, the population, and the time window.

- "The queue is growing" becomes: how many cases are open at quarter-end compared with quarter-start, and are we opening more than we close?
- "Answers take too long" becomes: how long from case creation to first reply, and from creation to closure, by priority?
- "Are customers happy?" becomes: what is the average satisfaction score, and how many customers actually responded?

## Define every measure before you build

Two analysts can get different answers from the same data because they defined a term differently. Write your definitions down first.

- **Backlog:** cases where IsClosed is false at the end of the period. Decide whether "New" and "Working" both count.
- **Resolution time:** closed date minus created date. Decide calendar hours or business hours. Standard reports show elapsed age; business-hours logic needs extra setup, so state which you used.
- **First response time:** Salesforce doesn't record this in a standard Case field for every org. Some orgs capture it with a custom date/time field, an automation, or milestone records if entitlements are in use. If the org doesn't track it, say so plainly and don't invent it.
- **Satisfaction (CSAT):** usually a custom field or survey responses, if the org collects them. Always report the response count next to the score.

## Fields you'll use

- Case Number, Status, Priority, Origin, Created Date, Closed Date
- Escalated (a checkbox), Case Owner, Account Name
- Age fields available in the Cases report type (check your field picker for exact names)

## Less hand-holding: what's different

In Project 1 the lessons prescribed the reports. Here the lessons describe the goal, show one worked example, and leave the remaining reports to you. Expect to make choices about filters, groupings, and chart types, and to justify them.

## Definition of done

By lesson 14 you should have a folder of reports, one service dashboard, a one-page definitions sheet, and a five-minute readout. Every number on the dashboard should reconcile to a source report.

## Recap

Start from the manager's worries, convert each into a measurable question, and lock the definitions before building anything. The definitions sheet is the first artifact of the project, and it protects you when someone asks why your backlog number differs from theirs.

## Check yourself

Pick one of the three worries and write the measure, population, and time window you'd use to answer it. What would you do if the data you need doesn't exist in the org?
