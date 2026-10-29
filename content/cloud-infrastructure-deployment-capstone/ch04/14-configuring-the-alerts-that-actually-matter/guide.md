# Lesson 14 — Configuring the Alerts That Actually Matter

**Chapter 4 · Monitoring the Deployed Environment · Lesson 14 of 32**

## What you'll learn

- Why alerting on every available metric creates noise instead of safety
- The three categories of alert that genuinely matter for a new deployment: resource thresholds, failed health checks, and security-relevant events
- A real worked example: four alerts that cover a basic deployment, and why each one earns its place
- How an alert connects to an actual notification, using Action Groups (Azure) or an SNS topic (AWS)

## Not every metric deserves an alert

Lesson 13 stood up the log destination monitoring depends on. The next instinct is to alert on everything the platform now makes visible — every metric, every log line, every threshold. That instinct is wrong. A metric existing doesn't mean a deviation in it matters, and an alert that fires on something nobody needs to act on just teaches people to ignore alerts (the subject of the next lesson). The real skill here is picking the small number of alerts that correspond to something a person genuinely needs to know about and can genuinely do something about.

## Three categories that actually matter

For a newly deployed environment, almost every alert worth having falls into one of three buckets. **Resource thresholds** — CPU, memory, and disk crossing a level that threatens availability, not just a level that's merely elevated. **Failed health checks** — a load balancer health probe failing, or a VM/EC2 status check failing, meaning the resource itself has stopped responding. **Security-relevant events** — repeated failed sign-in attempts, or an unexpected change to a network security group / security group, which are signals someone should look at regardless of resource load.

## A worked example: four alerts for a basic deployment

A basic deployment — the network, compute, and storage built in Chapters 1-3 — genuinely needs about four alerts to start:

1. **Sustained high CPU** — e.g., above 85% for 15 minutes, catching a runaway process or an undersized VM, not a brief normal spike.
2. **Low disk free space** — e.g., below 15% free, catching the exact failure mode from Lesson 13's disk example, with time to act before it's full.
3. **Failed health check / status check failure** — the instance is unreachable, which matters immediately regardless of what any other metric says.
4. **Repeated failed authentication attempts** — a security-relevant signal worth a human look, separate from anything about resource usage.

That's a deliberately short list. It's not "every alert this environment could possibly have" — it's the four that correspond to something a real person needs to be told about.

## Connecting an alert to a real notification

An alert rule by itself only evaluates a condition — it still needs somewhere to send the notification. Azure uses an **Action Group** (email, SMS, or a webhook) attached to the alert rule; AWS uses an **SNS topic** that a CloudWatch Alarm publishes to, with subscribers on the other end. Either way, the alert and the notification are two separate pieces wired together, and an alert with no notification attached is exactly as useless as no alert at all.

```
# Azure — CPU alert wired to an existing action group
az monitor metrics alert create --name "high-cpu-webserver" \
  --resource-group rg-prod-eastus --scopes <vm-resource-id> \
  --condition "avg Percentage CPU > 85" --window-size 15m \
  --action ag-oncall-team

# AWS — CloudWatch alarm wired to an SNS topic
aws cloudwatch put-metric-alarm --alarm-name high-cpu-webserver \
  --metric-name CPUUtilization --namespace AWS/EC2 \
  --statistic Average --period 300 --evaluation-periods 3 \
  --threshold 85 --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:111122223333:oncall-team
```

## Key terms

| Term | Meaning |
|---|---|
| Resource threshold alert | An alert on CPU, memory, or disk crossing a level that threatens availability |
| Failed health check | A load balancer probe or instance status check reporting the resource unreachable |
| Security-relevant event | A signal like repeated failed logins or an unexpected NSG/security group change |
| Action Group / SNS topic | The Azure / AWS mechanism that routes a fired alert to an actual notification |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why does this lesson recommend four alerts instead of alerting on every metric the platform makes available?
