# Lesson 22 — The Investigation Graph and Entity Timelines

**Chapter 6 · Incident Investigation in Sentinel · Lesson 22 of 32**

## What you'll learn

- What the **investigation graph** actually shows, and why it exists as a visual tool rather than
  just a list of alerts
- How the graph is built directly from the entity mapping configured on an analytics rule back in
  Chapter 3
- What an **entity timeline** shows, and how it differs from the graph
- How an analyst actually uses the graph and a timeline together to scope an incident

## The graph: a visual map of what's connected

Opening a Sentinel incident drops an analyst straight into the **investigation graph** — a visual
map with the incident itself at the center and lines radiating out to every **entity** involved:
user accounts, hosts, IP addresses, and files. Chapter 3's lesson on entity mapping covered how an
analytics rule tells Sentinel which fields in a raw log correspond to a user, a host, or an IP
address when an alert fires. The graph is the direct payoff of that configuration: without entity
mapping, Sentinel would have no structured way to know that "this IP" and "this account" in an
alert's raw data are even related objects worth drawing a line between. With it, the graph can show
an analyst, at a glance, that one compromised account connects to two different hosts and one
suspicious external IP — a relationship that would take several minutes to piece together by
reading raw log fields one at a time.

## A concrete example: following the lines

Say an incident's graph shows a central alert node connected to one user entity, that user entity
connected to two host entities, and one of those hosts connected to an external IP entity. Reading
that graph tells an analyst a real story before they've read a single raw log line: one account
touched two different machines, and one of those machines talked to an outside address. That's
exactly the kind of lateral-movement pattern an analyst wants to catch early, and the graph surfaces
it visually instead of requiring the analyst to cross-reference alert fields by hand.

## The entity timeline: one entity's full history

Clicking directly on any entity node in the graph opens that entity's **timeline** — a
chronological list of every alert and related activity involving that specific entity, not just the
activity tied to the current incident. The timeline answers a different question than the graph
does. The graph answers "what is this incident connected to, right now?" The timeline answers "what
else has this specific user or host done, including things from before this incident even
started?" If the compromised account's timeline shows a successful sign-in from an unfamiliar
country two days before the incident's alerts even fired, that's a real finding the graph alone
would never surface, because the graph is scoped to the current incident's entities and connections,
not to one entity's full history.

## Using both together to scope an incident

A thorough investigation uses the graph to find which entities are connected to the current
incident, then opens each suspicious entity's timeline to check whether that entity was doing
anything unusual before or after the incident's own alerts fired. That combination — breadth from
the graph, depth from the timeline — is how an analyst answers the real scoping question every
incident raises: is this contained to what already triggered an alert, or does it reach further
than the alerts alone show?

## Key terms

| Term | Meaning |
|---|---|
| Investigation graph | A visual map centered on an incident, showing its entities and how they connect |
| Entity | A user, host, IP address, or file involved in an incident, identified via entity mapping |
| Entity timeline | A chronological history of all activity involving one specific entity, beyond just the current incident |
| Entity mapping | The Chapter 3 analytics-rule configuration that tells Sentinel which raw fields represent which entity type |

## Check yourself

An incident's graph shows one compromised user connected to two hosts, one of which talks to an
external IP. What question does the graph answer that the entity timeline doesn't, and what
question does the timeline answer that the graph can't?
