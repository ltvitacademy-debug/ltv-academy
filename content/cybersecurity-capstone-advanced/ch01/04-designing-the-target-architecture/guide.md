# Lesson 4 — Designing the Target Architecture

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 4 of 26**

## What you'll learn

- How the inventory findings from Lesson 3 and the scope from Lesson 2 turn
  into one named target architecture
- The three pillars of the target state: a segmented OT/IT boundary, a
  consolidated identity view, and an automated inventory
- How the three pillars depend on each other, instead of being three
  independent projects running in parallel
- Why Mara writes the target architecture down before touching a single
  firewall rule or IAM policy

## From findings to a named architecture

Lesson 2 scoped the pilot to Riverbend's OT/SCADA boundary. Lesson 3 showed
that identity at Hartwell is sprawled across Entra ID and three AWS
accounts with no system of record. Those are findings, not a plan. This
lesson is where Mara turns them into something buildable: a single target
architecture with three named pillars, each one a direct answer to a
specific problem the first three lessons surfaced.

Okonjo asks for this in writing specifically because it's the document that
will anchor every remaining technical lesson in this chapter — Lessons 5
through 9 each build exactly one piece of what gets defined here.

## Pillar one: a segmented OT/IT boundary

Today, Riverbend's SCADA systems share a flat network with corporate IT.
The target state carves that out into its own controlled zone: a dedicated
OT/SCADA network segment with an explicit allow-list for every path in or
out, replacing the implicit "anything on this network can reach anything
else" default. Lesson 5 designs the actual zones and rules; this pillar
just states the destination — **no traffic reaches the OT/SCADA segment
unless a specific rule says it can, and every rule has a documented
reason.**

## Pillar two: a consolidated identity view

Today, answering "who can reach the OT/SCADA boundary" means separately
checking Entra ID groups and AWS IAM groups and roles across the
`Hartwell-OT-Analytics` account, with no guarantee either side is current.
The target state is one federated view: AWS IAM Identity Center federated
to Entra ID, so Entra ID becomes the single place identity lifecycle events
happen, and AWS access follows from Entra ID group membership instead of
being managed separately. Lesson 6 builds this; this pillar states the
destination — **one identity plane, not two.**

## Pillar three: automated, queryable inventory

Today, "who currently has standing access to OT/SCADA" is a question that
takes manual, point-in-time digging across multiple consoles to answer, and
the answer is stale the moment anyone's access changes. The target state is
a Python automation that queries both Entra ID and AWS IAM on a schedule,
normalizes what it finds into one record format, and writes the result into
a queryable table that lives alongside Hartwell's other security
telemetry in Microsoft Sentinel. Lessons 8 and 9 build this; this pillar
states the destination — **the answer to "who has access right now" is
always one query away, not a project.**

## Why these three pillars depend on each other

It would be a mistake to treat these as three parallel, independent
projects. They're sequenced because each one depends on the one before it:

- Segmentation (pillar one) is what makes the OT/SCADA boundary a boundary
  worth having an identity view *about* in the first place — there's no
  point consolidating access to a system that any device on the flat
  network can already reach anyway.
- The consolidated identity view (pillar two) is what gives the automation
  (pillar three) a single, coherent source to query — without it, the
  Python script would just be automating the same scattered manual process,
  faster.
- The automated inventory (pillar three) is what makes the whole
  architecture *provable*, not just designed — it's the artifact that will
  later let Mara, and eventually the compliance audit and the SIEM, each
  independently check whether the access the architecture describes
  matches the access that actually exists.

That third point matters more than it looks like it does right now. Hold
onto it — it's the exact mechanism this capstone returns to starting in
Lesson 11.

## Key terms

| Term | Meaning |
|---|---|
| Target architecture | The documented end state a project is building toward, distinct from the current state it starts from |
| Allow-list | A rule set that denies everything by default and only permits traffic that's been explicitly approved |
| Identity plane | The single authoritative layer where identity lifecycle events (joiners, movers, leavers) actually happen |
| Queryable inventory | A living, automatically refreshed record of access, as opposed to a point-in-time manual audit |

## Lab

1. Write the three pillars of the target architecture in your own words, in
   one sentence each, the way you'd want them to appear in a one-page
   document for Okonjo.
2. Explain, in writing, why segmentation has to come before the
   identity-consolidation work makes full sense.
3. Explain why the automated inventory (pillar three) is described as what
   makes the architecture "provable," not just "designed."

## Check yourself

You're ready for Lesson 5 when you can state all three pillars of the
target architecture from memory, explain why they're sequenced rather than
parallel, and explain why the automated inventory pillar matters beyond
just convenience.
