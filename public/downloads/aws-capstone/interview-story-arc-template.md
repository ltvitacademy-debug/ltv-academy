# Interview Story Arc Template

> From Lesson 14 (Presenting Your AWS Data Platform). Fill this in
> for your own version of the capstone — or any future project —
> before an interview, not during one.

## The five-beat structure

Present the project in the order it was actually built. Skipping
straight to the architecture (beat 2) is the single most common
mistake — it buries the reason the project exists.

### 1. Business problem

*What was broken, for whom, and why did it matter?*

```
Fill in: ______________________________________________
(e.g. "Northfield's on-prem SQL Server fed a nightly manual CSV
export leadership had to open by hand — same-day visibility wasn't
possible, and there was no full-time DBA to build anything fancier.")
```

### 2. Architecture

*The shape of the solution, at the level of a whiteboard sketch.*

```
Fill in: ______________________________________________
(e.g. "S3 raw/curated zones -> Glue Crawler/ETL -> Redshift ->
Athena, with Step Functions orchestrating the whole run on a nightly
schedule.")
```

### 3. Build

*The real, specific things that exist — not a toy diagram.*

```
Fill in: ______________________________________________
(e.g. "Real resource names with a consistent naming convention, a
real PySpark transformation job with job bookmarks enabled, a real
Amazon States Language state machine definition.")
```

### 4. Production practices

*What makes this more than a weekend tutorial.*

```
Fill in: ______________________________________________
(e.g. "CloudWatch alarms on job failures, least-privilege IAM roles
scoped per service, a CI/CD pipeline for the Glue script, a cost
optimization pass, and a named disaster-recovery RPO/RTO.")
```

### 5. Results

*What changed, concretely.*

```
Fill in: ______________________________________________
(e.g. "Same-day visibility achieved; ad hoc questions that used to
require a manual spreadsheet pull now answered in Athena in
seconds.")
```

Most candidates stop at beat 3. Beats 4 and 5 are what separate a
weekend tutorial from a project that demonstrates you'd survive on a
real data team — lead with the fact that your project has all five.

## What to show live versus describe

Live cloud console access during an interview is unpredictable —
screen-share lag, a service mid-deploy, a demo account with
different data. Decide this in advance, not in the moment:

| Show live (fast, legible, proves it runs) | Describe from a diagram/slide (too dense to read live) |
|---|---|
| ______________________________ | ______________________________ |
| ______________________________ | ______________________________ |
| ______________________________ | ______________________________ |

(Northfield's own answer: show the CloudWatch dashboard and a live
Athena query returning in seconds; describe the full state machine
graph, IAM policy JSON, and CI/CD workflow verbally against the
architecture diagram instead of scrolling through raw JSON live.)

## The "what would you do differently at scale?" answer pattern

This question comes up almost every time. The weak answer is generic
("we'd add more monitoring"). The strong answer names a specific
component, the specific limit it would hit, and the specific fix —
ideally a trade-off you already reasoned about while building, not
one invented on the spot.

```
Component that would need to change first: ____________________
What breaks or slows down at 10x scale: ________________________
What you'd actually do about it: _______________________________
```

(Northfield's own answers: ingestion moves from a nightly export to
AWS DMS with change data capture if sub-day latency were ever needed;
Redshift concurrency scaling or workload splitting if query
concurrency grew past one workgroup; the ~24-hour RPO is honest for a
nightly batch system today, and would need to shrink via more
frequent micro-batches first.)

Answering with specifics you already built reasoning for beats
answering with a guess — it shows the trade-offs were real decisions,
not afterthoughts.
