# CloudWatch Fundamentals

Every service in this course — S3, Glue, Athena, Redshift, Lambda, Step Functions, DMS, EMR,
Kinesis — emits data about its own health and behavior. CloudWatch is where all of that data
goes. It isn't one more data pipeline component; it's the observability layer sitting
underneath everything else you've built in this course.

## What you'll learn

- CloudWatch's three pillars: metrics, logs, and events
- Namespaces and dimensions, and how they organize metrics
- Log groups and log streams, and where a service's output actually lands
- Why "it ran successfully once" and "it's monitored" are different claims

## The three pillars: metrics, logs, events

CloudWatch is built around three kinds of data. **Metrics** are numeric time series — a
count, a duration, an error rate, sampled over time (Lambda's `Errors` count, Redshift's CPU
utilization). **Logs** are the actual text output a service writes — a Lambda function's
`print` statements, a Glue job's driver output, an EMR step's stderr. **Events** describe
state changes happening in your AWS environment in near real time — an EC2 instance changing
state, a Step Functions execution failing — and can trigger automated reactions (this
capability has largely moved to **Amazon EventBridge**, CloudWatch Events' successor, though
the underlying idea is the same).

## Namespaces and dimensions organize metrics

Every metric lives inside a **namespace** — a container that groups related metrics, usually
by service: `AWS/Lambda`, `AWS/S3`, `AWS/Redshift`. Within a namespace, **dimensions** are
name/value pairs that further identify exactly which resource a metric describes — a Lambda
`Errors` metric carries a `FunctionName` dimension so you can isolate one function's error
count from every other function's. Without dimensions, a namespace-level metric would just be
an undifferentiated blob for every resource of that type.

## Log groups and log streams

Logs are organized in two layers. A **log group** is the top-level container, typically one
per resource or application (`/aws/lambda/my-function`). Inside a log group, **log streams**
are the individual sequences of log events — for Lambda, that's usually one stream per
concurrent execution environment. You can search across a log group using **CloudWatch Logs
Insights**, a query language built specifically for filtering and aggregating log data
without exporting it anywhere else first.

## Monitoring is not the same as "it worked once"

A pipeline that ran successfully during development hasn't been *monitored* — it's just been
observed once, by a human, watching it happen. Real monitoring means metrics and logs are
being collected continuously, whether or not anyone's watching, so that a failure at 3 AM
produces a signal instead of silence. That distinction is what the rest of this chapter
builds on: alarms (Lesson 54) turn CloudWatch data into automated notifications, and Lesson
55 ties monitoring together across an entire pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Metric | A numeric time series describing a resource's behavior over time |
| Namespace | A container grouping related metrics, usually by AWS service |
| Dimension | A name/value pair that identifies which specific resource a metric describes |
| Log group | Top-level container for a resource's or application's log output |
| CloudWatch Logs Insights | Query language for searching and aggregating logs across a log group |

## Check yourself

A Lambda function's `Errors` metric lives in the `AWS/Lambda` namespace with a `FunctionName`
dimension. Why does the dimension matter here — what would you lose if CloudWatch only
tracked a single, namespace-wide error count for every Lambda function combined?
