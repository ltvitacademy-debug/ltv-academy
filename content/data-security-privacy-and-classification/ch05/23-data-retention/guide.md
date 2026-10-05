# Lesson 23 — Data Retention

**Chapter 5 · Lifecycle and Compliance · Lesson 23 of 30**

## What you'll learn

- Why "keep everything forever" and "delete everything fast" are both failure modes
- The four parts of a real retention schedule: category, period, trigger, disposition
- How over-retention quietly becomes a breach-exposure problem
- How under-retention quietly becomes a legal and audit problem

## Why retention is a policy, not a default

Left alone, most systems do one of two things: they keep every row forever because nobody set an expiration, or an engineer "cleans up" an old table without checking whether anything downstream — legal, finance, audit — still needs it. Neither is a decision; both are accidents. **Data retention** is the deliberate practice of deciding, in advance and by data category, how long something is kept and what happens to it afterward.

Retention sits downstream of classification (Chapter 2) and access control (Chapter 3) for a reason: you can't set a sensible retention period for data you haven't identified as regulated, financial, or personal. A column classified as PII under a records-retention policy for tax documents might need seven years. The same kind of column in a marketing click-stream table might need ninety days. Classification tells you which rule applies; retention tells you how long the clock runs.

## The two failure modes

**Over-retention** feels safe — "we might need it someday" — but it's a real liability. Every extra year of customer records sitting in a database is another year that data can be breached, another year it must be secured, and another year someone has to honor a right-to-erasure request against it (Lesson 24). Storage is cheap; the exposure isn't. Many breach post-mortems involve data that was years past any legitimate business need.

**Under-retention** is the opposite failure: deleting records before a legal, tax, or contractual obligation to keep them has expired. A finance team that purges invoices after one year when the applicable rule requires seven has created an audit finding, not efficiency. Under-retention also breaks **legal holds** — when litigation or an investigation is reasonably anticipated, normal retention schedules are suspended for the relevant data, and deleting it on schedule anyway can be treated as destroying evidence.

## The four parts of a retention schedule

A usable retention schedule answers four questions for every data category, not just "how long":

1. **Category** — what kind of data this is (customer transaction records, employee HR files, support tickets, system logs)
2. **Retention period** — how long it's kept, stated as a duration, not a vague "as needed"
3. **Trigger event** — what starts the clock (contract end date, account closure, last activity, fiscal year end) — retention periods rarely start at creation
4. **Disposition action** — what happens when the period ends: secure deletion, anonymization, or transfer to archive

Skipping the trigger event is the most common mistake. "Seven years" means nothing without a starting point — seven years from when the record was created, or from when the relationship ended, produces very different deletion dates for a customer who stayed ten years.

## Key terms

| Term | Meaning |
|---|---|
| Retention schedule | A documented policy mapping data categories to retention periods, trigger events, and disposition actions |
| Legal hold | A temporary suspension of normal deletion for data that is or may become relevant to litigation or investigation |
| Disposition | The action taken when a retention period ends — secure deletion, anonymization, or archival |
| Over-retention | Keeping data longer than any legitimate business or legal need requires, increasing breach exposure |

## Lab

Pick one table or data category you have access to at work or in a personal project (an email archive, a spreadsheet of contacts, a log file). Write a one-paragraph retention schedule for it using all four parts: category, retention period, trigger event, and disposition action. Note whether the data currently sitting in that table already violates the period you just wrote.

## Check yourself

Can you explain, in your own words, why "keep it forever just in case" is itself a risk decision rather than a safe default — and why a retention period needs a trigger event, not just a duration?
