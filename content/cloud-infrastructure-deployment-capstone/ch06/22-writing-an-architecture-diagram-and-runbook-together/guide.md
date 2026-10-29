# Lesson 22 — Writing an Architecture Diagram and Runbook Together

**Chapter 6 · Documentation & Handoff · Lesson 22 of 32**

## What you'll learn

- The real difference between an architecture diagram (the visual "what") and a runbook (the
  practical "how to operate and troubleshoot it")
- Why these two documents are written together rather than separately, and what breaks when
  they're not
- What actually belongs in a runbook: common tasks, who to contact, and where logs live
- How to write a runbook entry that only makes sense because a diagram backs it up

## Two documents, two different jobs

An **architecture diagram** shows what exists: the VNets or VPCs, the subnets inside them, which
VMs or instances sit where, how traffic flows between tiers, and which resources talk to which. It
answers "what is this environment, and how is it laid out?"

A **runbook** answers a completely different question: "how do I operate this thing day to day,
and what do I do when it breaks?" It's the practical, step-by-step reference for common tasks —
restarting a service, rotating a credential, checking why a VM stopped responding — plus who to
contact when a step doesn't work, and where the logs actually live.

Neither document replaces the other. A diagram with no runbook tells you the shape of the house
but not how to turn on the heat. A runbook with no diagram tells you to "restart the web tier" with
no way to know which three VMs that actually means, or how they relate to the load balancer and
database behind them.

## Why they're written together

The real reason these two get written together, not as separate projects weeks apart, is that
**the diagram gives the runbook its context**. A runbook step like "check web-vm-01 through
web-vm-03" only makes immediate sense to someone who can glance at the diagram and see those three
VMs sitting behind a load balancer in the Web Tier, in a specific subnet, in a specific region.
Without that picture, the runbook is a list of names and commands with no mental map behind it —
technically correct, but slow to use under pressure.

Consider a runbook entry for a stuck web tier:

```
## Runbook: Web Tier Unresponsive
1. Check web-vm-01/02/03 (see diagram: Web Tier, East US 2)
2. Connect via bastion-vm (diagram: Management subnet)
3. Restart IIS: Restart-Service W3SVC
4. Still down? Escalate to Platform on-call (PagerDuty)
```

Step 1 points straight back at the diagram. Step 2 does too. An engineer who has never touched this
environment before can follow both because the diagram already told them where the Web Tier and
the Management subnet sit, and how to reach one from the other.

## What a runbook actually needs

A useful runbook isn't a general essay about the system — it's narrowly practical. At minimum it
should cover the common tasks someone will actually need to perform (restarts, credential
rotations, scaling actions), who to contact when a task fails or an unfamiliar symptom shows up,
and exactly where to find logs for each major component, by name and by path or portal location.
Anything vaguer than that forces the next person to go hunting during an outage, which is the
opposite of what a runbook is for.

## Key terms

| Term | Meaning |
|---|---|
| Architecture diagram | A visual record of what exists in an environment and how it's laid out — VNets/VPCs, subnets, tiers, and connections |
| Runbook | A practical, step-by-step reference for operating and troubleshooting an environment — common tasks, contacts, log locations |
| Topology | The shape of how an environment's components connect to each other, as shown in a diagram |
| Escalation contact | The person or team a runbook names to reach when a documented step doesn't resolve the problem |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does a runbook step like
"check web-vm-01 through web-vm-03" depend on the architecture diagram to actually be useful during
an incident?
