# Lesson 15 — Designing Security for a Service Organization

**Chapter 3 · Applying Security · Lesson 15 of 24**

## What you'll learn

- Why a service org's security design starts from queues, not
  ownership
- How escalation tiers change the OWD and sharing-rule choices from
  what a sales org needs
- Where case teams and public groups fit into a support model
- A full worked design for a fictional support organization

Lesson 14 designed security around ownership — each rep owned a
territory. A support organization is shaped differently: cases often
start unowned, get worked by whoever is available, and escalate
through tiers. This lesson designs for that shape, using another
fictional company.

## The scenario: Harbor Point Support

**Harbor Point Support** is the (invented) customer service arm of a
software company. Cases come in from email, a web form, and phone.
Three tiers handle them:

```
Tier 1 (Frontline) ── Tier 2 (Specialists) ── Tier 3 (Engineering Escalation)
      ↑ cases start here, get escalated up when unresolved
```

Cases are not owned by an individual at first — they land in a queue,
and whoever is free picks one up.

## Step 1 — Org-wide defaults built around queues, not ownership

Unlike Meridian's reps, Harbor Point's agents don't "own" a fixed book
of customers — a case could be worked by any Tier 1 agent today and a
different one tomorrow. That argues for:

| Object | OWD | Why |
|---|---|---|
| Case | Public Read Only | Any agent may need to see any case to help a customer, even one they don't own |
| Account | Public Read Only | Support needs quick lookup of any customer's account |
| Contact | Controlled by Parent | Follows the account |

This is the opposite instinct from Lesson 14's sales design, and
that's the point: OWD isn't a style preference, it follows how the
business actually works. A service org built around shared queues
needs broader read access than a sales org built around individual
territories — Public Read Only, not Private, is the honest default
here, with **write** access handled by case assignment and teams, not
by the OWD.

## Step 2 — Queues replace most "ownership"

Instead of assigning every new case to a person, Harbor Point routes
cases into **queues**: "Tier 1 - General," "Tier 1 - Billing," "Tier 2 -
Technical." A queue is really a special kind of public group — any
member of the queue can take a case from it, and cases sit in the
queue unowned until someone does. This replaces most of the
individual-ownership model Lesson 14 relied on.

## Step 3 — Escalation uses case teams, not reassignment

When Tier 1 can't resolve a case, the old-fashioned move is to
**reassign** it to Tier 2 — but that loses the Tier 1 agent's context
and makes the customer repeat themselves. Harbor Point instead adds a
**case team**: the original Tier 1 agent stays on the case with Read
Only access, and a Tier 2 specialist joins with Read/Write and becomes
the new primary owner. If the case escalates again, a Tier 3 engineer
joins the team the same way. Everyone who ever touched the case can
still see it; whoever's actively working it has edit rights.

## Step 4 — Sharing rules for the exceptions

Public Read Only on Case already gives every agent visibility. The
sharing rules that remain are about **write** access for specific
groups:

- A criteria-based rule — "where Priority equals Critical" — grants
  the Tier 3 queue Read/Write on critical cases immediately, before
  anyone manually escalates, so engineering can start investigating in
  parallel.
- A public-group rule grants the Support Manager group Read/Write on
  every case, for quality review and reassignment, without putting
  managers in a role hierarchy that doesn't reflect how support teams
  actually operate.

## Putting it together

```
OWD: Public Read Only (Case, Account)
  + Queues instead of individual ownership (Tier 1/2/3)
  + Case teams for escalation (context travels with the case)
  + 2 sharing rules (Critical → Tier 3 write; Managers → write everywhere)
= every agent can see any case to help a customer,
  only the right tier can edit at each stage,
  nothing is lost when a case escalates.
```

## Key terms

| Term | Meaning |
|---|---|
| Queue | A holding area for unowned records that any member can claim; functions like a special public group |
| Escalation via case team | Adding the next tier to a case team instead of reassigning, so prior context stays visible |
| Queue-driven OWD | An OWD choice driven by shared, unowned work rather than individual territories |

## Check yourself

Harbor Point's design uses Public Read Only on Case. If this were a
support org handling sensitive data (say, healthcare cases) where even
read access had to be restricted by tier, what OWD would you start
from instead, and what would have to replace the simple "any agent can
read any case" assumption?
