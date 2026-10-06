# Service Performance Reporting

**Chapter 4 · Business Analytics · Lesson 20 of 22**

Support teams live and die by a different set of numbers than sales — not pipeline value, but how fast cases get resolved and how satisfied customers are with the answer. This lesson applies the same report-and-dashboard mechanics to Case data, where the questions (and the thresholds that count as "good") are different.

## What you'll learn

- The core metrics support leaders actually track
- Building a case-volume-and-age report
- Reporting on time-based milestones (first response, resolution)
- A service dashboard that balances volume, speed, and quality

## What support leaders track

Four numbers dominate most service dashboards: **case volume** (opened vs. closed, is the queue growing or shrinking), **case age** (how long open cases have been sitting, the support equivalent of a stuck deal), **response and resolution time** against whatever SLA or target applies, and **customer satisfaction**, when a post-case survey is in use.

## Case volume and age

Start from a **Cases** report type, grouped by **Status**, summarized by record count — that answers "how many are open, and in what state." Add **Priority** as a second grouping in a Matrix report, and volume becomes "how many urgent cases are sitting open," which is a very different (and more actionable) number than the raw total.

**Case age** — days since the case was opened, for still-open cases — surfaces the support equivalent of a stuck deal: a case that's been open three weeks looks identical to one opened an hour ago on a pure volume report, until you filter or sort by age.

## Time-based milestones

Cases often carry fields tracking **time to first response** and **time to resolution**, either as standard entitlement/milestone fields (where Entitlements and Milestones are configured) or custom fields built for the purpose. Reporting on these — average, and the percentage breaching target — turns "are we fast enough" from a feeling into a number leadership can actually act on.

## A balanced service dashboard

A service dashboard that only shows volume misses half the picture, and one that only shows speed misses the other half. A balanced build combines: a **metric widget** for open case count, a **gauge** for average resolution time against a target, a **table** for cases breaching SLA, and (where available) a **chart** of satisfaction scores over time — volume, speed, and quality, together.

## Recap

- Support dashboards track volume, age, response/resolution time, and satisfaction.
- Case volume by Status (plus Priority as a second grouping) is the foundation report.
- Case age catches the support equivalent of a stuck deal — filter or sort by it, don't just total volume.
- A balanced dashboard needs volume, speed, and quality together, not just one of the three.

## Check yourself

A service dashboard shows case volume trending down, which looks like good news. What second metric would you want before concluding the team is actually performing well, and why might volume alone be misleading?
