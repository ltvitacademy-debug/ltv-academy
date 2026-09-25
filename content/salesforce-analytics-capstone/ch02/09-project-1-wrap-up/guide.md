# Project 1: Wrap-Up & Presentation

You have five answers. This lesson turns them into the two things a hiring manager and a VP of Sales actually consume: a dashboard that stands on its own, and a short presentation that leads with the conclusion. All numbers are still illustrative Alder & Vale figures.

## What you'll learn

- Which dashboard components fit which Project 1 question
- How to reconcile every number before anyone sees it
- How to structure a three-minute readout
- How to turn the project into a portfolio write-up

## Assemble the dashboard

Every widget on a dashboard reads from a source report, so the reports you built in Lessons 6 to 8 become the components. Keep the layout simple, with the most important numbers at the top:

| Widget | Source report | Display |
|---|---|---|
| Won vs quota | Closed Won, Current FQ | Gauge, maximum $2.25M, showing $1.71M |
| Open pipeline this quarter | Open, Close Date = Current FQ | Metric, $1.35M |
| Pipeline by stage | Open, grouped by Stage | Funnel or bar |
| Attainment by rep | Closed Won by Opportunity Owner | Bar, using the attainment formula |
| Conversion by lead source | Leads by Lead Source | Bar or donut |
| Stalled deals | Open, no activity in 30+ days | Table |

Two design rules from the dashboards course apply. First, one report answers one question, so each widget stays honest. Second, a dashboard stores no data of its own: it reflects the source reports and the **running user's** visibility. Choose the running user deliberately, and confirm with the VP of Sales who should see per-rep numbers. Add at most one or two dashboard filters, such as Opportunity Owner, so the dashboard stays readable.

## Reconcile before you share

Wrong numbers that look right destroy credibility. Check that everything ties out:

- The six reps' Closed Won amounts sum to $1.71M, which equals the gauge.
- 38 deals at roughly $45K averages to about $1.71M.
- The four stage totals sum to $4.80M across 96 deals.
- The four lead-source counts sum to 1,000 leads and 122 conversions.
- Coverage: $1.35M divided by the $540K gap equals 2.5x.
- The three size bands sum to 140 won deals and $6.30M.

Any mismatch means a filter differs between reports. Fix that first. Also note the "as of" time on the dashboard, because it only reflects the last refresh.

## The three-minute readout

Lead with the answer, not the method. A structure that works:

1. **Headline (one sentence).** "We are at 76% of Q3 quota with a $540K gap, and current pipeline is likely to close only about $470K of it."
2. **Three findings, each with one number.** Coverage looks like 2.5x but is optimistic at a 35% win rate; Tomas and Priya have the thinnest coverage (1.1x and 1.4x); Purchased List converts at 5% versus 25% for Partner Referral. Add the large-deal timing risk if time allows.
3. **Recommendations, each tied to a decision.** Review the 21 stalled deals ($0.9M) this week; have managers work pipeline coverage with Tomas and Priya; test moving lead spend from Purchased List toward partner referrals; and start large-deal pursuit earlier next quarter.
4. **Risks and limits.** Illustrative single-org data, a 90-day conversion window, win rate by count, and user-entered close dates.
5. **The ask.** What decision or approval you need, and by when.

Keep charts to what supports these points. If a slide does not change a decision, cut it.

## Write it up for your portfolio

Use the Chapter 1 skeleton, adapted:

- **Question:** the VP's request in one or two sentences.
- **Data:** a Developer Edition org with generated data, clearly labeled illustrative.
- **Method:** report types, formulas, and SOQL, with a screenshot of each report.
- **Findings and recommendations:** the numbered items above.
- **Limitations:** stated plainly.

Add screenshots of the dashboard with annotations, and publish the write-up as a README plus a PDF. Do not include any real employer data.

## Recap

Reports become widgets; reconcile every total; open with the answer; tie every recommendation to a decision; state your limits. Project 2 asks you to repeat the process on Service Cloud data with less hand-holding.

## Check yourself

Your rep-attainment bars sum to $1.68M but the gauge says $1.71M. Name two likely causes and how you would find out which one it is.
