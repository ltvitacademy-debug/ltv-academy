# Capstone: Wrap-Up & Portfolio Presentation

You've built two dashboards for Harborline Supply Company. The last step is the one many
analysts skip: turning the dashboards into a story a VP can act on, and into a portfolio
piece that shows your thinking, not just your clicks. This lesson covers both. As before,
every figure is an illustrative example.

## What you'll learn

- How to boil two dashboards down to a one-page result
- A five-part structure for a ten-minute VP presentation
- How to turn numbers into a verdict and an ask
- What belongs in a portfolio write-up, and what does not

## The one-page result

Before any slides, write the result on one page. This is the example set from the two
builds:

| Sales (this quarter) | Service (this month) |
|---|---|
| $3.9M won, 65% of the $6.0M quota | 1,840 opened, 1,725 closed |
| $4.2M open pipeline, 2.0x coverage of the $2.1M gap | Backlog up 115 to 412 |
| 31% win rate, about $48K average deal | 38 high-priority cases over 5 days, 9 escalated |
| 23 stalled deals worth $1.1M | 68% within the 2-day target, average age 2.8 days |

If you can't state each side in one sentence, the dashboards are not finished.

## Know what the viewer sees

Open your finished dashboard as a viewer would. The header shows when the data was last
refreshed and who the dashboard is viewed as (the running user). A VP's first question is
usually "is this current?" and the second is "why can't my manager see this?" Be ready to
answer both, because both come straight from how you built it.

## The five-part ten-minute presentation

1. **Headline:** the verdict in one sentence.
2. **Evidence:** two or three components that prove it, no more.
3. **Risk:** what could go wrong or what the data can't tell us.
4. **Ask:** the specific decision or action you need.
5. **Next:** what you'll do this week.

## Turning numbers into a verdict

Compare these two ways of saying the same thing. Weak: "Win rate is 31%." Strong: "At our
31% win rate, a rough count-based rule of thumb, the $4.2M of open pipeline converts to
about $1.3M. Added to the $3.9M already won, we land near $5.2M, roughly $0.8M short of
quota. The 23 stalled deals worth $1.1M are where we recover it. I need those owners
contacted this week."

The strong version does arithmetic you can check, flags its own assumption (a win rate by
count is not a win rate by amount), and ends in an ask.

Service works the same way: "The backlog grew by 115 this month and 38 high-priority cases
are over five days old, 9 escalated. Only 68% of closed cases hit our two-day target. I
recommend adding coverage on high-priority cases, starting with the escalated nine."

## Limits and next steps

An honest close builds trust. Three limits from this capstone:

- The quota is hard-coded into the coverage formula and must be updated by hand.
- There is no daily backlog trend unless historical trend reporting or snapshots were set up.
- Revenue from an ERP cannot be blended natively.

Per Chapter 8's framework, these are evidence, not failures. The first two are candidates
for native fixes (a stored quota field, snapshots), and the third is a candidate for
CRM Analytics or Tableau. The native dashboards fully answer Monday's and Thursday's
questions, and that is the point.

## The portfolio write-up

Structure your write-up like the presentation, in five sections:

1. **Problem and audience:** who asked, and what they needed to decide.
2. **Data and report types:** which report types and why.
3. **Design decisions:** formulas, buckets, dashboard filters, running user, layout.
4. **Results:** screenshots of your own dashboards and the one-page result.
5. **Limits and next steps:** what native couldn't do and what you'd do about it.

Build it from a Developer Edition org or sample data. **Never include confidential
employer or customer data** in a portfolio, and blur or replace any real names.

## Recap

Two dashboards became a one-page result, a five-part presentation with a verdict and an
ask, and a portfolio write-up that shows decisions and limits. You've completed Salesforce
Reports & Dashboards. The next course, Salesforce CRM Analytics & Tableau Next, picks up
exactly where native reporting's limits begin.

## Check yourself

A colleague's presentation ends with "so the win rate is 31%." Rewrite that ending as a
verdict with one calculation you can check, one stated assumption, and one specific ask.
