# Lesson 30 — Capstone: Design Service Workflows & Integrations

**Chapter 9 · Capstone: Enterprise Technical Architecture · Lesson 30 of 32**

## What you'll learn

- Why Domain Separation — not a second instance — is the right tool for Meridian's three hospital
  systems, applying Chapter 2's real use-case test instead of assuming it
- The integration architecture for consolidating three different legacy HR systems into one HR
  Service Delivery process, without forcing an unrealistic big-bang migration
- Why event-driven integration fits part of this work and request-response fits a different part
  of it, using Chapter 4's actual decision criteria
- How Meridian's security architecture balances HIPAA-relevant access controls with usability
  across three different hospital cultures, without repeating Chapter 5's workaround failure mode
- How these three decisions reinforce each other as parts of one architecture, not three
  unrelated choices

## Does Meridian actually qualify for Domain Separation?

Lesson 29 established that Meridian doesn't justify a second production instance. But Chapter 2's
Domain Separation lesson was explicit that this capability exists for exactly two real situations:
separate subsidiaries under one parent company, or a managed service provider serving genuinely
distinct clients — never as a generic "give every department its own folder" default. Check
Meridian against that test honestly. St. Catherine's, Lakeshore, and Prairie View are, functionally,
separate subsidiaries under one new parent: St. Catherine's helpdesk staff have no legitimate
reason to see Lakeshore's incident queue day to day, and Prairie View's HR cases shouldn't be
visible to Lakeshore's HR team by default. At the same time, Meridian's corporate leadership
genuinely needs one combined view across all three for board reporting and enterprise risk
management. That's precisely the shape Chapter 2 described — real structural separation at the
operating level, with a legitimate need for visibility above it. The decision: one instance, three
domains (St. Catherine's, Lakeshore, Prairie View), under one Meridian corporate domain at the top.
Accept the real cost Chapter 2 named honestly — every script, report, and integration built from
here forward has to be written with domain awareness — because, unlike a generic multi-department
situation that Chapter 8's governance tools would handle more cheaply, Meridian's separation need is
genuinely structural.

## Consolidating three legacy HR systems without a big-bang migration

St. Catherine's runs Workday, Lakeshore runs ADP Workforce Now, and Prairie View runs a homegrown,
on-premises PeopleSoft-based module with no modern API. Migrating all three onto a single HR system
of record inside an eighteen-month window is not realistic, and trying to force it would blow up
the timeline the board actually asked for. The real decision, applying Chapter 4's integration
strategy thinking: ServiceNow HR Service Delivery becomes the **system of engagement** — where HR
reps and employees actually work cases — while each legacy platform stays the **system of record**
for now, reached through three separate integrations. Workday's available connector pattern
supports an IntegrationHub spoke; ADP needs a custom Scripted REST integration; Prairie View's
aging on-prem module, with no real API surface, needs a MID Server-based integration pulling from a
scheduled data extract. All three go into the integration inventory from Chapter 4, each with a
named technical owner, before a line of integration code gets written.

## Choosing the right pattern for each piece of HR data flow

Chapter 4's event-driven-versus-request-response lesson applies differently to different parts of
this integration. A new-hire or termination record syncing from Workday into ServiceNow doesn't
need an immediate answer — nobody's waiting on that sync to continue a transaction — so it's a
genuine fit for event-driven integration: Workday publishes a worker-change event, ServiceNow
subscribes and processes it asynchronously, and a slow moment in Workday never blocks an HR rep's
screen. Compare that to an HR rep opening a case and needing this employee's *current* department
and work location confirmed before they can route the case correctly — that rep is waiting, right
now, for an answer, which is exactly Chapter 4's case for request-response. Defaulting to one
pattern for all of it — request-response because it's simpler, or event-driven because it sounds
more scalable — would be the mistake Chapter 4 warned against: matching the pattern to the real
situation, not to a preference.

## Security: HIPAA-relevant data, three different cultures

Some of what flows through this platform is genuinely sensitive — health-related leave cases in HR
Service Delivery, facilities requests tied to specific patient-care units — the kind of
regulated-adjacent data Chapter 5 and course 10's access-control content both treat as deserving
real friction: tight field-level ACLs, logged access, narrow role scoping. But Chapter 5's
usability lesson is just as real here: if the *entire* platform is locked down at that same level,
Lakeshore and Prairie View staff — already wary of a centrally imposed system — will do exactly what
Chapter 5 predicted: share logins to get around slow approval chains, or quietly rebuild their own
tracker outside ServiceNow the moment the official one is too much friction for ordinary work. The
right design applies Chapter 5's risk-proportionate principle literally: strict, audited access
only on the narrow set of tables and fields that actually hold regulated data, and fast, low-friction
access everywhere else — routine incidents, standard facilities requests, ordinary HR cases that
carry no sensitive health information at all.

## How the three decisions reinforce each other

These aren't three independent choices — they lock together. Domain Separation defines exactly
where the sensitive cross-hospital visibility risk concentrates: the Meridian corporate domain at
the top, which is the one place data crosses hospital and cultural boundaries, and therefore the one
place Chapter 5's strictest controls matter most. The HR integrations have to write every incoming
record tagged to the correct domain from the start, or domain separation breaks silently the first
time a Workday-sourced record lands with no domain assigned. One architecture, three chapters
applied together — not three unrelated technical choices.

## Key terms

| Term | Meaning |
|---|---|
| System of engagement vs. system of record | Where work actually happens (ServiceNow) versus where the authoritative data still lives (each legacy HR system) |
| Integration inventory | Chapter 4's maintained record of every integration, its pattern, authentication, and named owner |
| Event-driven fit | A data flow where nobody waits for an immediate answer, favoring asynchronous, decoupled integration |
| Risk-proportionate friction | Chapter 5's principle: strict controls only where real risk justifies them, frictionless everywhere else |

## Check yourself

A Lakeshore HR rep says the new platform feels "slower than ADP ever was" for routine leave
requests with no health information involved. Using this lesson's security design, explain what
most likely went wrong — and what you'd check first before loosening anything.
