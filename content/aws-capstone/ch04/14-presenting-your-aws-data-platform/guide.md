# Presenting Your AWS Data Platform

Building the Northfield pipeline was the hard part. Presenting it well in an interview is a
separate skill — and one most candidates never practice. This lesson is the story arc: what to
say, what to show live, and what to describe instead of demo, so 10-15 minutes of interview time
lands the whole project.

## What you'll learn

- The five-beat story arc this project already fits, beat for beat
- What to demo live versus describe from the dashboard or diagram
- How to handle the inevitable "what would you do differently" question

## The story arc

This capstone was built in exactly this order for a reason — it's also the order to present it
in:

```
1. Business problem   Northfield's on-prem SQL Server + nightly manual export,
                       leadership wants same-day visibility, no full-time DBA
2. Architecture        S3 raw/curated zones -> Glue Crawler/ETL -> Redshift ->
                       Athena, Step Functions orchestrating on schedule
3. Build                Real resource names, real PySpark, real ASL — not a
                        toy diagram with boxes and arrows
4. Production practices CloudWatch alarms, least-privilege IAM, CI/CD,
                        cost optimization, disaster recovery
5. Results               Same-day visibility achieved; ad hoc questions answered
                        in Athena in seconds instead of a manual spreadsheet pull
```

Most candidates stop at step 3. Steps 4 and 5 are what separate a weekend tutorial from a project
that demonstrates you'd survive on a real data team — lead with the fact that this project has
all five.

## What to show live versus describe

Live AWS console access during an interview is unpredictable — screen-share lag, a service
that's mid-deploy, a demo account with different data. Plan for both:

- **Show live, if you can:** the CloudWatch dashboard (`northfield-pipeline-dashboard`) — one
  screen, immediately legible, proves the pipeline actually runs. An Athena query against
  `northfield_orders_curated` returning in seconds is a strong, fast demo.
- **Describe from a diagram or slide instead:** the full Step Functions state machine graph, the
  IAM policy JSON, and the GitHub Actions workflow. These are dense — walk through them verbally
  with the architecture diagram from Lesson 2 on screen, rather than scrolling through raw JSON
  live.

## Handling "what would you do differently at scale?"

This question comes up almost every time, and this capstone already has honest answers, since
Lessons 3-13 named them along the way:

- **Ingestion:** move from a nightly `bcp` export to AWS DMS with change data capture, if
  Northfield ever needed closer-to-real-time visibility (named in Lesson 3).
- **Redshift:** if query concurrency grew past what one workgroup handles well, add Redshift
  Serverless's concurrency scaling or split workloads across multiple workgroups.
- **DR:** the current ~24-hour RPO is honest for a nightly batch system (Lesson 13) — at scale,
  that's the first number that would need to shrink, likely via more frequent micro-batches.

Answering with specifics you already built reasoning for beats answering with a generic "we'd add
more monitoring" — it shows the trade-offs were real decisions, not guesses.

## Key terms

| Term | Meaning |
|---|---|
| Story arc | The problem -> architecture -> build -> production -> results narrative structure |
| Live demo | Showing a working system in real time, chosen for its reliability and clarity |
| Scale question | The near-universal "what would you do differently at scale" interview follow-up |

## Check yourself

Why does this lesson recommend describing the Step Functions state machine graph and IAM policy
JSON from a diagram instead of scrolling through them live in the AWS console?
