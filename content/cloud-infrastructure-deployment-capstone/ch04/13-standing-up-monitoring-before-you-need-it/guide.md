# Lesson 13 — Standing Up Monitoring Before You Need It

**Chapter 4 · Monitoring the Deployed Environment · Lesson 13 of 32**

## What you'll learn

- Why monitoring belongs in the deployment itself, not on a "we'll get to it" list for later
- The real cost difference between finding a problem from an alert and finding it from a user complaint
- What the environment you deployed in Chapters 1-3 is already reporting on its own, and what it is not
- What "standing up monitoring" concretely means right now: a log destination, visible metrics, and a place alerts can land

## Flying blind is the default, not the exception

The smoke test in Lesson 12 confirmed the environment you built actually works. That feels like the finish line, but it isn't — a newly deployed environment with no monitoring configured is **flying blind**. The resources are running, traffic is flowing, and nobody will know anything is wrong until someone notices the hard way. Monitoring isn't a feature you bolt on once something breaks; it's part of the deployment, which is why this chapter comes immediately after the smoke test and before anything in this environment carries real traffic or real data.

## The real cost of finding out from a complaint

Here's the difference that matters. A disk fills up slowly over a few days of log growth. With monitoring in place, a disk-space alert fires at 85% full, and someone frees space or resizes the volume before anything breaks. Without monitoring, nobody knows until the disk hits 100%, the application can't write its logs or temp files, and it crashes — and the first anyone hears about it is a user reporting the site is down. Both scenarios start from the identical root cause. The only difference is whether the team found out from an alert, in advance, or from a complaint, after the damage. That gap is the entire reason this chapter exists.

## What's already there, and what still needs setup

Chapters 1-3 built VNets/VPCs, VMs/EC2 instances, and storage — and the moment those resources existed, Azure Monitor or CloudWatch (depending which platform you deployed to) started collecting their platform metrics automatically, exactly as covered earlier in this program. That part needs no extra work. What does **not** happen automatically: nothing is watching those metrics for you, nothing notifies anyone when a threshold is crossed, and application or OS-level logs aren't flowing anywhere centralized yet. Standing up monitoring means closing those three gaps — a log destination to collect logs into, visibility into the metrics that already exist, and a place for alerts to land — before this environment takes on real use.

## Example: creating the log destination first

The first concrete step, right after the smoke test, is creating the workspace or log group that everything else in this chapter will attach to:

```
# Azure — Log Analytics workspace
az monitor log-analytics workspace create \
  --resource-group rg-prod-eastus \
  --workspace-name law-prod-eastus

# AWS — CloudWatch Log group
aws logs create-log-group --log-group-name /prod/app-server
```

Every VM diagnostic extension, every CloudWatch Agent, and every alert configured later in this chapter points at one of these two destinations. Creating it now, as the first monitoring step, is what turns "the platform happens to be collecting data somewhere" into "someone can actually see it."

## Key terms

| Term | Meaning |
|---|---|
| Flying blind | Running a deployed environment with no monitoring, so problems are invisible until something fails outright |
| Log Analytics workspace / Log group | The central destination logs and diagnostics are sent to, created as part of standing up monitoring |
| Mean time to detect (MTTD) | How long it takes to notice a problem exists — the gap an alert closes that a user complaint doesn't |
| Platform metrics | Metrics Azure/AWS already collect automatically — present, but not yet visible or alerting until monitoring is configured |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why does a newly deployed environment already have platform metrics being collected, but still count as "flying blind" until monitoring is explicitly stood up?
