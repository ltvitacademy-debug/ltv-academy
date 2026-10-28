# Lesson 23 — CloudWatch Logs and Log Groups

**Chapter 6 · Monitoring: CloudWatch · Lesson 23 of 32**

## What you'll learn

- What CloudWatch Logs actually is, and why it exists separately from the metrics in Lessons 21-22
- The log group / log stream structure every log in CloudWatch is organized under
- Why an EC2 instance's own operating-system logs don't show up there on their own, and what the CloudWatch Agent does about it
- A real example of searching log data with CloudWatch Logs Insights

## Logs: a different kind of data than metrics

Metrics are numbers over time; a **log** is a detailed, often unstructured
record of an event — a line in a web server's access log, an application
error with a stack trace, an operating-system message. **CloudWatch Logs**
is the centralized store those records land in, searchable long after the
instance that produced them might be gone. Nothing about this chapter's
metrics required CloudWatch Logs at all — logs are a genuinely separate
piece of the CloudWatch umbrella, there for the detail metrics were never
designed to hold.

## Log groups and log streams: the real structure

Every log that reaches CloudWatch Logs lives under two levels of
organization. A **log group** is the top-level container — typically one
per application or resource type, like `/aws/lambda/order-processor` for a
Lambda function, or a custom group like `/ec2/web01/var-log-messages` for an
EC2 instance's system log. Inside that group, a **log stream** is a sequence
of log events from one specific source — one EC2 instance, one Lambda
invocation's execution environment, one container task. Log group retention
is set per group (the default is **Never Expire**, but it's commonly set to
something concrete like 30, 90, or 365 days so storage costs don't grow
forever on logs nobody will ever read again).

## Why OS logs don't just show up

Lesson 21 covered why a plain EC2 instance doesn't report memory usage: its
default platform metrics come from the hypervisor, which can't see inside
the guest OS. The exact same limitation applies to logs. A file like
`/var/log/messages` sitting inside an instance's own filesystem never
reaches CloudWatch Logs by itself — something running *inside* the OS has
to ship it there.

## The CloudWatch Agent: the thing that ships them

That something is the **CloudWatch Agent**, installed on the instance
itself and driven by a JSON configuration file that lists which local log
files to watch and which log group/stream to send each one to:

```
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/messages",
            "log_group_name": "/ec2/web01/var-log-messages",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```

The same agent can also push custom OS-level *metrics* — memory and disk
usage among them — closing the exact gap Lesson 21 flagged.

## Example: searching with CloudWatch Logs Insights

Once log data is flowing, **CloudWatch Logs Insights** is the query
language for searching it, reading top to bottom much like the Azure
course's KQL:

```
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20
```

That returns the 20 most recent lines containing "ERROR" across every log
stream in the group — searching every instance's error output at once,
instead of SSHing into each one by hand.

## Key terms

| Term | Meaning |
|---|---|
| CloudWatch Logs | The centralized, searchable store for detailed log records, separate from metrics |
| Log group | The top-level container for related log streams, with its own retention setting |
| Log stream | A sequence of log events from one specific source inside a log group |
| CloudWatch Agent | Software installed inside an instance's OS to ship its logs (and OS-level metrics) to CloudWatch |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does an
EC2 instance's `/var/log/messages` file never appear in CloudWatch Logs
without the CloudWatch Agent installed?
