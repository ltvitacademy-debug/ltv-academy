# Lesson 24 — CloudTrail and Tracking Who Did What

**Chapter 6 · Monitoring: CloudWatch · Lesson 24 of 32**

## What you'll learn

- What AWS CloudTrail actually records, and how it's a fundamentally different kind of service than everything else in this chapter
- The real difference between CloudTrail's always-on Event History and a configured Trail
- Management events vs. data events, and why one is on by default and the other usually isn't
- A real example of using CloudTrail to answer "who did this, and when?" — something CloudWatch metrics and logs can't answer

## CloudTrail: a different question entirely

Everything so far in this chapter — metrics, alarms, logs — answers some
version of "what is happening, or what happened, inside my resources?"
**AWS CloudTrail** answers a completely different question: **who did
what, and when?** CloudTrail is AWS's **control-plane audit log** — it
records every API call made against your account, whether it came from the
Management Console, the CLI from Chapter 5, an SDK, or another AWS service
acting on your behalf. This is the exact same split the Azure course drew
between Azure Monitor (performance) and the Activity Log (administrative
actions) — AWS just gives its audit side a name of its own.

## Always on, for free: Event History

CloudTrail is **enabled automatically for every AWS account**, at no extra
charge, recording the last **90 days** of account activity as **Event
History**, visible right in the console with no setup. Each event captures
**who** (the IAM identity's ARN), **what** (the API call, e.g.
`RunInstances` or `TerminateInstances`), **when** (a precise timestamp), the
**source IP**, and whether the call **succeeded or failed**. That's enough
to answer most "who did this?" questions on a recent incident without
configuring anything at all.

## Beyond 90 days: creating a Trail

Event History's 90-day window and read-only console access aren't enough
for compliance retention or cross-region visibility. Creating a **Trail**
changes that: it delivers log files continuously to an S3 bucket (and
optionally into a CloudWatch Logs log group, tying straight back into
Lesson 23), for as long as you choose to keep them — years, if a compliance
requirement calls for it.

```
aws cloudtrail create-trail \
  --name org-audit-trail \
  --s3-bucket-name my-cloudtrail-logs-bucket \
  --is-multi-region-trail
```

## Management events vs. data events

CloudTrail splits what it records into two categories. **Management
events** are control-plane operations — creating, modifying, or deleting a
resource, like launching an EC2 instance or changing an IAM policy — and
these are logged by a Trail by default. **Data events** are the much
higher-volume, object-level operations inside a resource, like an S3
`GetObject` or `PutObject` call, or a Lambda function invocation; they're
not logged by default because of that volume (and the added cost), and have
to be turned on deliberately for the specific resources you actually want
object-level visibility into.

## Example: finding who stopped an instance

A VM goes down unexpectedly and nobody admits to it — the exact scenario
the Azure course used for the Activity Log. CloudWatch metrics will show
the instance went to a stopped state, but they can never show *who* stopped
it. CloudTrail can:

```
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventName,AttributeValue=StopInstances
```

That returns every `StopInstances` call in the lookback window, each one
tied to the IAM identity's ARN that made it, the timestamp, and the source
IP — the same question, answered with evidence instead of a guess.

## Key terms

| Term | Meaning |
|---|---|
| CloudTrail | AWS's control-plane audit log, recording who made which API call, when, and from where |
| Event History | CloudTrail's always-on, 90-day, console-viewable record — enabled automatically, no setup |
| Trail | A configured CloudTrail setup that delivers events to S3 (and optionally CloudWatch Logs) for longer retention |
| Management event / data event | Control-plane actions (logged by default) vs. high-volume, object-level operations (opt-in) |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why can
CloudWatch metrics show that an EC2 instance stopped, but never show *who*
stopped it — and which AWS service can?
