# Lesson 23 — Service Configuration Management Practice

**Chapter 6 · Service Configuration & Asset Practices · Lesson 23 of 28**

## What you'll learn

- The purpose of the service configuration management practice, in ITIL 4's own terms
- What a configuration item (CI) is, and why the list of things that can be one is longer than most people expect
- Why CI *relationships* matter as much as the CIs themselves
- How this practice quietly supports the incident, problem, and change practices from Chapter 4
- Where the deep dive — the CMDB and ServiceNow's CSDM — is coming later in this path, not here

## The purpose, stated precisely

ITIL 4 defines the purpose of service configuration management as ensuring that accurate and
reliable information about the configuration of services, and the configuration items (CIs) that
support them, is available when and where it is needed. Read that twice — the practice isn't
"maintain a database." It's "make sure the right people can trust the right information about how
things are put together, at the moment they need it." The database is just the tool that makes
that possible at any real scale. A team of three can maybe keep this in their heads. An
organization running hundreds of services, thousands of servers, and constant change cannot.

## What counts as a configuration item

A configuration item is anything that needs to be managed in order to deliver a service. That
sounds broad because it is broad. A physical server is a CI. The application running on it is a
CI. A network switch is a CI. In some organizations, a piece of documentation — a disaster
recovery runbook, a contract — is tracked as a CI too, because losing track of it would create
real risk. Some models even treat a person's role (not the person, the role — "on-call database
administrator") as a CI, because a service depends on that role being filled. The test ITIL 4
applies isn't "is this a piece of hardware" — it's "does losing track of this put the service at
risk."

## Relationships are the actual value

A list of CIs by itself is just an inventory — useful, but not transformative. What makes
configuration management powerful is capturing the *relationships* between CIs: this application
runs on this server, which depends on this network device, which is patched through this change
schedule. That relationship graph is what turns a flat list into something you can reason with.
When a server goes down, the relationship graph tells you which applications are affected and
which customers notice — that's impact analysis. When an incident recurs, the relationship graph
tells problem management where to start looking — that's root-cause investigation. Neither of
those is possible from a spreadsheet of server names with no connections drawn between them.

## How this quietly supports practices you already know

Go back to Chapter 4. Incident management needed to know what else might be affected by a failing
component — that's configuration data. Problem management needed to trace a recurring incident
back to a shared root cause across multiple services — that's the relationship graph again. Change
enablement needed to assess the blast radius of a proposed change before approving it — same
graph, same data. None of those practices generate this information themselves; they all consume
it from configuration management. That's the pattern worth remembering: configuration management
is rarely the practice anyone notices directly, but remove it and the practices built on top of it
degrade immediately.

## What's intentionally out of scope here

Most real-world organizations implement this practice through a Configuration Management
Database, or CMDB — a system of record for CIs and their relationships. ServiceNow's own CMDB,
and the Common Service Data Model (CSDM) that structures it, is substantial enough to earn its own
dedicated course later in this path. This lesson's job is only to make sure you understand *why*
the practice exists and what it's protecting against, before you ever open a tool that implements
it.

## Key terms

| Term | Meaning |
|---|---|
| Configuration item (CI) | Anything that must be managed to deliver a service — hardware, software, documentation, even a role |
| Configuration management database (CMDB) | A system of record that stores CIs and the relationships between them |
| CI relationship | A documented dependency between two CIs (e.g., "runs on," "depends on") that enables impact analysis |
| Impact analysis | Using CI relationships to determine what else is affected when one CI fails or changes |

## Check yourself

Without looking back: why is a CMDB that only lists CIs, with no relationships recorded between
them, far less useful than one that captures how those CIs depend on each other — and which two
practices from Chapter 4 would feel that loss first?
