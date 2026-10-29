# Lesson 27 — Getting Budget and Buy-In for a Zero Trust Program

**Chapter 7 · Building a Zero Trust Roadmap · Lesson 3 of 4**

## What you'll learn

- Why a zero trust program is uniquely hard to fund compared to a
  project with a visible feature or launch date
- How to frame security investment in terms executives already use
  for every other budget decision: risk reduction and cost avoidance
- The real structure of a business case that survives a budget
  committee, not just a slide that sounds confident
- How to answer the question every sponsor eventually asks: "what do
  we get if this works?"

## Why this is harder than funding a normal project

A new CRM feature has a demo. A new product has a launch date and a
revenue number attached. A zero trust program, especially in its
foundational year (Lesson 25), mostly produces things that are
invisible when they work: no outage, no breach, no headline. That
invisibility is a funding problem, not a technical one — you're asking
for recurring budget and staff time to make something *not happen*,
and "nothing happened" is a hard thing to put a dollar value on in a
slide deck, even when it's exactly the outcome you were paid to
produce.

## Translate into the language budget committees already use

Executives fund risk reduction and cost avoidance constantly —
insurance, disaster recovery, compliance programs — they just don't
always recognize a zero trust initiative as belonging to that same
category unless you frame it that way explicitly. Three framings do
that work:

**Incident cost avoidance.** Instead of "we need micro-segmentation,"
the framing is closer to: "if a compromised account currently has a
path to every system on this network, the blast radius of a single
incident includes [the specific systems], and segmentation reduces
that blast radius to [a smaller, named set]." You're not promising
zero incidents — you're quantifying how much smaller and cheaper the
ones that still happen become.

**Risk reduction tied to what the business already tracks.** If the
organization already reports on downtime hours, customer records in
scope, or audit findings, connect the initiative to those existing
numbers instead of inventing new security metrics nobody outside the
team recognizes.

**Cost of the status quo.** Standing privileged access that never
expires, a flat network with no segmentation — these aren't free just
because no incident has used them yet. Naming the ongoing cost of
carrying that exposure (cyber insurance premium impact, audit finding
remediation cost, the hours spent on manual access reviews that
automation would remove) gives a budget committee something to compare
against the cost of the fix.

## The structure of a business case that holds up

A business case that survives scrutiny names: the specific gap, in
business terms, not just technical ones; the realistic cost of leaving
it as-is, including things already being paid for today (manual
reviews, audit remediation, insurance terms); the cost and timeline of
the fix, using the phased roadmap from Lesson 25 so it isn't an
all-or-nothing ask; and the maturity or metric evidence (Chapter 6)
that will prove the fix actually worked, not just that it shipped.
That last point matters most, because a sponsor who approves budget
wants to know, a year later, what to point to.

## Key terms

| Term | Meaning |
|---|---|
| Cost avoidance | Framing an investment by the cost of the bad outcomes it prevents, not a revenue number it generates |
| Blast radius | The scope of systems/data an incident could reach, which a control like segmentation is sized to reduce |
| Status quo cost | The ongoing, already-being-paid cost of an unaddressed gap, distinct from the one-time cost of fixing it |
| Business case | A funding request structured around gap, status-quo cost, fix cost/timeline, and proof-of-success metric |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
is "we need zero trust" a weak budget pitch, and what specific numbers
would you put in its place for a segmentation initiative?
