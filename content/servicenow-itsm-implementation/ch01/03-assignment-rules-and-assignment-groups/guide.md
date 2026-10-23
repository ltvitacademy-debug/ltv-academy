# Lesson 3 — Assignment Rules & Assignment Groups

**Chapter 1 · Implementing Incident Management · Lesson 3 of 32**

## What you'll learn

- What an Assignment Group actually is, and why every incident needs one
- The legacy mechanism for automatic routing: `sysrule_assignment`
- The modern mechanism: a Flow Designer flow triggered on incident creation
- Choosing real routing criteria — Category, Configuration Item, caller location
- Avoiding the overloaded-agent problem with round robin and load balancing

## What an Assignment Group is, and why Incidents need one

An Assignment Group is simply a queue — a group record (`sys_user_group`)
that a set of agents belong to, and that incidents get routed to before
anyone picks up the work individually. Without one, every new incident
lands with no owner at all, and "who should be looking at this" becomes a
manual triage step for every single ticket. The implementation goal is
simple to state and easy to get wrong in practice: a new incident should
land in the correct group's queue the moment it's created, with no human
having to read it and decide first.

## Two ways to implement automatic assignment

ServiceNow gives you two real mechanisms, and a mature implementation
usually knows both and picks deliberately.

**Assignment Rules** (`sysrule_assignment`) are the legacy mechanism —
a rule with a condition and a target: "when Category is Network, set
Assignment Group to Network Operations." They run server-side at record
insert/update and have been part of the platform for a long time; they're
simple, fast, and still fully supported.

**Flow Designer**, which Flow Designer & Automation covered as the
successor to legacy Workflow, is the modern path: a flow with an
**Incident Created** trigger, a set of condition steps, and an action that
sets Assignment Group (and optionally Assigned To). The advantage over a
plain Assignment Rule is that the same flow can also notify the group,
log the routing decision, or call out to an Integration Hub step — the
routing decision is just one action inside a larger, auditable sequence.
New implementations increasingly default to a flow for this reason, but
Assignment Rules are not deprecated and remain a legitimate, simpler choice
for a straightforward one-field routing decision.

## Choosing real routing criteria

The criteria that actually drive good routing come from the record itself:
**Category** ("Network," "Hardware," "Software") is the most common and
most reliable signal; **Configuration Item** lets you route by the specific
service or server affected, which matters when Category alone is too
broad; and **caller's location** matters for organizations with regional
support teams, where the right group depends on where the caller sits, not
just what broke. A well-implemented rule or flow usually combines more than
one of these rather than relying on Category alone.

## Avoiding the overloaded-agent problem

Routing to the right **group** solves half the problem — the other half is
who inside that group actually gets the ticket. Setting `assigned_to`
directly in the rule or flow, every time, tends to overload whichever agent
is listed first or alphabetically. Real implementations instead use
**round robin** (each new incident goes to the next agent in the group, in
rotation) or **load balancing** (the next incident goes to whichever agent
in the group currently has the fewest open assignments) — both of which
keep work distributed instead of piling onto one person.

## Key terms

| Term | Meaning |
|---|---|
| Assignment Group | A queue of agents (`sys_user_group`) that an incident is routed to before individual pickup |
| `sysrule_assignment` | The legacy Assignment Rule mechanism: condition plus a target group/agent |
| Flow Designer routing | A flow triggered on Incident Created that sets Assignment Group as one action in a larger sequence |
| Round robin / load balancing | Distributing individual assignment within a group instead of hard-coding one agent |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: name the
two real mechanisms for automatically setting Assignment Group on a new
incident, and why routing by Category alone is sometimes not enough.
