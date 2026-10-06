# Lesson 31 — Capstone: Deploying the Agent

**Chapter 6 · Capstone · Lesson 31 of 32**

## What you'll learn

- The gap between "runs on my machine" and "safe to run unattended"
- A concrete pre-deployment checklist built from every control in this capstone
- Where monitoring (Lesson 27) hooks into the deployed version
- What this lesson intentionally leaves for the next course

## A working build and a deployable one aren't the same thing

Lessons 29 and 30 produced an agent that works correctly when you run it
yourself, watching the output. Deployment means something stricter: it has
to behave correctly when *no one is watching it run*, which is a different
bar. The checkpoint, the audit log, the budget, and the scoped credential
all already exist — deployment is about confirming each one actually holds
up outside a development session, not adding anything new.

## A pre-deployment checklist

```
[ ] Approval queue reachable by reviewers outside your dev machine
    (a real queue/dashboard, not a local terminal prompt)
[ ] Audit log written to durable storage, not an in-memory list
[ ] Budget and iteration limits read from config, not hardcoded
[ ] Credentials loaded from a secrets manager, never committed to code
[ ] A defined behavior for "approver didn't respond" (Lesson 20)
[ ] Monitoring wired to the audit log (Lesson 27's four signals)
```

Each line maps to a decision that was fine to skip while developing and
testing locally, but would silently break the moment this ran as a real
service: an in-memory audit log disappears on restart; a hardcoded budget
can't be adjusted without a code deploy; a terminal-prompt approval flow
has no reviewer watching it at 2 a.m.

## Monitoring hooks in here, not earlier

Lesson 27's four signals — rejection rate, limit-trip frequency, injection
flags, cost trend — only become *monitoring* once there's a deployed
system running continuously for them to describe. During development, you
were watching every run directly; in deployment, these aggregate signals
become the thing a team actually looks at, which is why they're the last
item on the checklist, not an afterthought.

## What this lesson deliberately doesn't cover

Real infrastructure choices — which cloud, which secrets manager, how to
provision the sandbox environment from Lesson 25 as actual infrastructure,
how to wire real alerting — are genuinely their own subject, not a capstone
footnote. This course has been about the agent's own logic and safety
design; the next course in this path, Azure AI & Cloud for AI Engineers,
picks up exactly here: deploying, securing, and monitoring AI services
like this one in a real cloud environment.

## Key terms

| Term | Meaning |
|---|---|
| Unattended operation | Running correctly with no developer watching — the real bar for "deployable" |
| Durable storage | Storage (database, file, log service) that survives a restart, unlike an in-memory list |
| Secrets manager | A system for loading credentials at runtime instead of hardcoding or committing them |

## Check yourself

Of the six checklist items above, which one would fail silently and
*look* fine in a quick test, but break badly the first time the service
restarts? Why does that make it easy to miss?
