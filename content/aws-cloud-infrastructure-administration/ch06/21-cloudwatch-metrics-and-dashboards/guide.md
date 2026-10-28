# Lesson 21 — CloudWatch Metrics and Dashboards

**Chapter 6 · Monitoring: CloudWatch · Lesson 21 of 32**

## What you'll learn

- What CloudWatch is: the monitoring service already watching every resource you've launched since Chapter 2
- The real default metrics an EC2 instance reports automatically, and the one common thing it does *not* report on its own
- The difference between basic and detailed monitoring, and why that difference is really about cost
- How to publish your own custom metric and chart it on a dashboard

## CloudWatch: one service watching everything you've launched

**Amazon CloudWatch** is AWS's monitoring service — the umbrella over metrics,
alarms, logs, and dashboards for almost everything you deploy. You haven't
had to turn it on for any of the EC2 instances, S3 buckets, or VPC resources
built in earlier chapters; CloudWatch has been collecting data on them the
whole time, the same way Azure Monitor sits under every Azure resource. This
chapter works through CloudWatch piece by piece, starting with the simplest
and most immediate piece: **metrics**.

## Platform metrics: automatic, but not everything

A **metric** is a numerical value measured over time — CPU percentage, bytes
transferred, request counts. The moment you launch an EC2 instance, it starts
reporting metrics in the `AWS/EC2` **namespace** automatically, with nothing
to install: **CPUUtilization**, **NetworkIn** / **NetworkOut**,
**DiskReadBytes** / **DiskWriteBytes**, and **StatusCheckFailed**. These come
from the hypervisor watching the instance from outside, which is exactly why
they're free and automatic — and exactly why they stop short of anything
happening *inside* the guest operating system. A plain EC2 instance reports
CPU and network traffic out of the box, but it does **not** report memory
usage or free disk space on its own; that requires something running inside
the OS, which is where Lesson 23's CloudWatch Agent comes in.

## Basic vs. detailed monitoring: the real difference is cost

By default, EC2 instances report their platform metrics at five-minute
intervals — **basic monitoring**, included at no extra charge. Turning on
**detailed monitoring** (a checkbox at launch, or `aws ec2
monitor-instances` afterward) raises that to one-minute intervals, for a
small per-instance cost. The data itself is identical; detailed monitoring
just gives you a finer-grained view, which matters if you're trying to catch
a CPU spike that comes and goes inside a five-minute window.

## Example: a custom metric and a dashboard

Say an application processes orders, and "orders processed per minute" isn't
a metric AWS knows about. You can publish it yourself with `PutMetricData`,
giving it your own namespace, metric name, and value — AWS will store and
graph it exactly like a platform metric from that point on. A **CloudWatch
Dashboard** is a customizable page of widgets where you'd place that custom
metric right next to `CPUUtilization` from the same instance, so a reviewer
can see application load and server load side by side without jumping
between pages.

```
aws cloudwatch put-metric-data \
  --namespace "MyApp/Orders" \
  --metric-name OrdersProcessed \
  --value 42 \
  --unit Count
```

## Key terms

| Term | Meaning |
|---|---|
| CloudWatch | AWS's monitoring service for metrics, alarms, logs, and dashboards |
| Metric | A numerical measurement over time, grouped under a namespace (e.g. `AWS/EC2`) |
| Basic / detailed monitoring | Platform metrics at 5-minute (free) vs. 1-minute (small cost) intervals |
| Dashboard | A customizable CloudWatch page of widgets charting one or more metrics |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does a
plain EC2 instance report `CPUUtilization` automatically, but not its free
memory or free disk space?
