# Lesson 1 — Gathering Real Requirements Before You Deploy Anything

**Chapter 1 · Planning a Real Deployment · Lesson 1 of 32**

## What you'll learn

- Why requirements gathering is the actual first step of any real deployment — before you ever
  open the Azure or AWS console
- The five things you need pinned down before sizing or choosing anything: expected traffic/load,
  compliance requirements, budget constraints, availability needs, and who the users actually are
- What it really costs, in rework, when a team skips this step
- How a short written requirements brief becomes the input to every decision in the rest of this
  chapter

## Requirements come before tools, every time

It's tempting to treat "deploying to the cloud" as starting the moment you create a resource
group or launch an instance. In a real job, it starts earlier than that — with a conversation, or
a short document, that answers: what is this actually for, who's going to use it, and what happens
if it goes down? Skipping straight to provisioning without answering those questions isn't moving
fast — it's deferring decisions you'll be forced to make anyway, just later and under worse
conditions, usually after something breaks or a bill arrives three times larger than anyone
expected.

## The five things you need before you provision anything

Every real deployment brief, however informal, answers five questions:

- **Expected traffic/load** — how many users, how many requests, and when: steady all day, or a
  sharp spike at 9am?
- **Compliance requirements** — does this workload touch regulated data (health records, payment
  data, HR records) that brings a framework like HIPAA, PCI DSS, or SOC 2 along with it?
- **Budget constraints** — what's the actual monthly ceiling, not an aspirational one?
- **Availability needs** — does this need to survive a datacenter outage at 2am, or is "back up by
  9am business hours" good enough?
- **Who the users are** — internal employees on a corporate network, or the general public on the
  open internet? That alone changes the security posture.

None of these require a cloud console. They require asking the stakeholder who actually owns the
workload.

## What skipping this step actually costs

Teams that skip straight to "just stand something up" almost always pay for it later, in one of
two directions. Undersized infrastructure, chosen by guessing instead of asking about real load,
buckles the first time traffic spikes — an outage, not a minor inconvenience. Oversized
infrastructure, chosen "to be safe," quietly wastes budget every single month with nothing to show
for it. Worse than either: compliance requirements discovered after the fact. A workload deployed
without knowing it touches HIPAA-regulated data often has to be partially rebuilt — encryption,
access logging, and network isolation retrofitted onto a live system cost far more than designing
them in from the start.

## From requirements to a decision

A short written brief — even five bullet points — is what the rest of this chapter builds on.
Lesson 2 uses it to choose a cloud provider. Lesson 3 uses the load numbers to size compute and
storage. Lesson 4 uses all of it to sketch the architecture. Skip this lesson's step, and every
decision after it is a guess dressed up as an engineering choice.

## Key terms

| Term | Meaning |
|---|---|
| Requirements brief | A short written record of a workload's expected load, compliance needs, budget, availability target, and user base, gathered before any infrastructure is chosen |
| Expected load | The realistic number of users/requests a workload will see, including peak periods — not a guess |
| Compliance requirement | A legal or contractual control (e.g. HIPAA, PCI DSS, SOC 2) triggered by the type of data a workload handles |
| Availability target | How much downtime a workload can tolerate, often expressed as an uptime percentage or a recovery time |

## Check yourself

A stakeholder tells you only "we need this live by Friday." Before you provision anything, what
are the five questions you still need answered — and what's the real risk of deploying without an
answer to any one of them?
