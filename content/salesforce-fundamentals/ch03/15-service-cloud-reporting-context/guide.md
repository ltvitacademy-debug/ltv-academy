# Service Cloud Reporting Context

Lessons 13 and 14 covered what a Case record is and how it moves through its lifecycle.
This lesson closes Chapter 3 by connecting that structure to the actual numbers an analyst
gets asked to report: the handful of service metrics that show up in nearly every support
dashboard, and where each one comes from in the data you now understand.

## What you'll learn

- What Average Handle Time measures, and which fields it depends on
- What Case Resolution Time measures, and why it's the metric leadership asks for first
- What First Contact Resolution measures, and why it's harder to calculate than it sounds

## Average Handle Time

**Average Handle Time (AHT)** is the average amount of time a support rep actively spends
working a case — talking to the customer, researching the issue, typing up notes — from
the moment they start working it to the moment that unit of work ends. It's a rep-level
and team-level efficiency metric: a rising AHT can mean cases are genuinely getting harder,
or it can mean a process problem (a rep spending too long hunting for information a
knowledge base should surface instantly). AHT depends on activity-level timestamps tied to
a Case, not just the Case's own Status field — which is exactly why understanding what
data actually sits behind a Case, from Lesson 13, matters before trying to calculate it.

## Case Resolution Time

**Case Resolution Time** is the total elapsed time from when a Case is created to when it's
Closed — the clock a customer actually feels, as opposed to AHT's clock of active rep
effort. It's usually the very first number a support leadership team asks an analyst for,
because it's the simplest proxy for "are we getting back to people fast enough." Calculating
it correctly means reading Created Date and Closed Date (or a Closed Date/time field, if the
org tracks one) off the Case record — straightforward in principle, but easy to get wrong if
a case gets reopened, since a naive resolution-time calculation can undercount a case that
bounced between Closed and In Progress more than once.

## First Contact Resolution

**First Contact Resolution (FCR)** measures the percentage of cases resolved during the
customer's very first interaction, with no case reopened, escalated, or requiring a
follow-up. It's the metric that best captures genuine service quality rather than just
speed — a team can have a fast average resolution time while still frustrating customers
with cases that get closed prematurely and reopened. FCR is also the hardest of the three
to calculate reliably, because "first contact" isn't a single field Salesforce hands you by
default; it typically has to be inferred from whether a Case was ever reopened or from
custom fields an org has built specifically to track it — a good example of why an analyst
has to understand what's standard versus what's been custom-built for a given org, which is
exactly where Chapter 4 picks up.

## Key terms

| Term | Meaning |
|---|---|
| Average Handle Time (AHT) | Average active time a rep spends working a case |
| Case Resolution Time | Total elapsed time from case creation to Closed |
| First Contact Resolution (FCR) | Percentage of cases resolved on the customer's first interaction, no reopen |

## Check yourself

Why can a support team have a fast Case Resolution Time while still scoring poorly on
First Contact Resolution? What does that combination actually reveal about how the team is
closing cases?
