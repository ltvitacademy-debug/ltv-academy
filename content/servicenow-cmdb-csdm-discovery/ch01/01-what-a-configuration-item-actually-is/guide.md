# Lesson 1 — What a Configuration Item Actually Is

**Chapter 1 · CMDB Fundamentals · Lesson 1 of 26**

## What you'll learn

- The real definition of a Configuration Item (CI), and why it exists as a concept at all
- The one distinction that trips up almost every new administrator: a CI is not a work record
- How a CI and a work record connect to each other through a reference field
- Why "needs its state and relationships tracked" is the actual test, not "is this a thing"

## CI is not a new word — you've already seen it twice

ITIL 4 Foundations Lesson 23, Service Configuration Management Practice,
introduced the Configuration Item conceptually, as an ITIL practice: an
organization tracks the components of its services so it can understand
what it has, how those components depend on each other, and what breaks
if one of them changes. Platform Fundamentals Lesson 11, Base Tables &
Table Extension, named the actual ServiceNow table behind that practice:
`cmdb_ci`, the base table behind every configuration item type in the
CMDB — a server, a database instance, a network switch. This lesson
connects those two: the ITIL practice is the *why*, `cmdb_ci` is the
*where*, and a CI record is the actual thing that lives there.

## The real definition

A Configuration Item is any component of IT infrastructure or, under the
modern Common Service Data Model you'll meet in Chapter 3, any business
or technical service, application, or other asset — that needs its
state, configuration, and relationships tracked in order to deliver and
manage services. A physical server is a CI. A specific installation of
an application on that server is a CI. A network switch is a CI. A
database instance is a CI. What makes something a CI isn't that it's
expensive, or that someone bought it, or that it has a serial number —
it's that *tracking it matters for managing services*. If nobody needs
to know this thing's current state, its configuration, or what it
connects to, it probably doesn't need to be a CI.

## The distinction that actually matters: a CI is not a work record

This is the single most important idea in this lesson, and it's where
new administrators most often get confused. An Incident is not a CI. A
Change Request is not a CI. A Problem record is not a CI. These are
**work records** — task-table records (recall the Task Table Hierarchy
from Platform Fundamentals Lesson 12) that represent something someone
is doing: investigating an outage, implementing a change, tracking a
known error. A CI represents something that *exists* — a piece of
infrastructure, a service, an application — independent of whatever work
is currently happening to it.

The two meet through a reference field. An Incident record has a
`cmdb_ci` field that points at the specific CI affected by that
incident — say, the exact application server that went down. The
Incident is not the server. The Incident *references* the server. Close
the Incident, and the server CI keeps existing; delete the server (and
update the CI to reflect that), and any Incidents that referenced it
still show what was affected at the time. Mixing these up — treating an
Incident as if it were itself a piece of infrastructure, or expecting a
CI record to track the back-and-forth of resolving an outage — is a
reliable way to build a CMDB that doesn't actually model anything real.

## Why this test matters once you're building a real CMDB

"Does this need its state and relationships tracked for managing
services" is a genuinely useful filter, because it's tempting to try to
put everything into the CMDB — software licenses, vendor contracts,
office printers, a conference room's AV equipment. Some of those are
legitimately CIs if their state and dependencies matter operationally.
Many are better modeled as plain assets, with no service relationships
to track, or aren't worth modeling at all. You'll apply this filter for
real in Chapter 3 when you start deciding which parts of a company's
estate actually belong in CSDM's domains, and getting the filter wrong
early is exactly how CMDBs end up bloated with records nobody maintains
— a problem you'll see the consequences of in Lesson 3.

## Key terms

| Term | Meaning |
|---|---|
| Configuration Item (CI) | Infrastructure, a service, or an application whose state, configuration, and relationships need tracking to manage services |
| `cmdb_ci` | The base table in ServiceNow that every CI type extends |
| Work record | A task-table record (Incident, Change, Problem) representing something being done, not something that exists |
| `cmdb_ci` field | The reference field on a work record that points to the specific CI it's about |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why is
an Incident record never itself a CI, even though every Incident form
has a field literally named `cmdb_ci`?
