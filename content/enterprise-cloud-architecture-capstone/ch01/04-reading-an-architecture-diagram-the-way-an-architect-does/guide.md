# Lesson 4 — Reading an Architecture Diagram the Way an Architect Does

**Chapter 1 · Enterprise Cloud Architecture Principles · Lesson 4 of 4**

## What you'll learn

- The three things an architect looks for first on any unfamiliar
  architecture diagram, before reading a single label
- How to trace data flow direction and spot where it silently crosses a
  trust boundary
- How to identify failure domains on a diagram, and why a box drawn
  around components doesn't guarantee they fail independently
- How to turn what you see on a diagram directly into pillar-anchored
  review language from Lessons 2 and 3

## A diagram is a claim, not a guarantee

By this point in your training you've drawn plenty of architecture
diagrams yourself, in Terraform module layouts and Kubernetes topology
sketches. This lesson flips that around: given someone *else's* diagram,
cold, in a design review, how do you read it the way a senior architect
does — fast, skeptically, and in a way that produces real pillar findings
within the first few minutes?

The habit to build is this: **a diagram is a claim about how the system is
supposed to behave, not proof that it behaves that way.** A box labeled
"Load Balancer" doesn't guarantee traffic is actually balanced across
healthy instances; an arrow doesn't guarantee that connection is encrypted
or that it's the only path data takes. Reading a diagram well means
constantly asking what the picture is *not* telling you.

## First pass: follow the data, not the boxes

Don't start by reading every label. Start by picking one request — a
customer placing an order — and tracing it, arrow by arrow, from entry
point to data store and back. This single pass usually surfaces more real
findings than reading the whole diagram top to bottom, because it forces
you to notice:

- **Where direction changes or fans out.** A single inbound arrow that
  fans out to five internal services, each of which can independently
  fail the whole request, is a reliability concern worth flagging on sight.
- **Where the arrow disappears into a box you can't see inside.** If a
  diagram shows "API → Database" with nothing in between, ask what's
  actually there — connection pooling? A cache? Retry logic? The absence
  of detail is itself information.
- **Dead ends and missing return paths.** If write traffic is shown but
  there's no visible path for a failure response or a retry, that's worth
  a question, not an assumption that it's handled.

## Second pass: find every trust boundary

A **trust boundary** is any line a diagram crosses where the level of
trust changes — public internet into a VNet/VPC, an unauthenticated
request becoming an authenticated one, a general-purpose subnet into a
database subnet, one Azure/AWS account into another. Good diagrams draw
these boundaries explicitly as dashed lines or shaded regions; many real
diagrams don't, which means part of your job is drawing them back in
mentally as you read. For every boundary crossing, ask the same two
questions every time: *what enforces this boundary* (a network security
group, a private endpoint, an identity check, a firewall rule), and *is
that enforcement visible on the diagram, or just assumed?* An arrow
crossing from "public subnet" to "data subnet" with no NSG, no private
endpoint, and no identity check shown is a security-pillar finding you can
raise before anyone opens the actual Terraform code.

## Third pass: find the real failure domains

A **failure domain** is a boundary within which one failure stays
contained — but a box drawn around several components on a diagram does
not, by itself, prove they share or don't share a failure domain. The real
question is what underlying infrastructure those components actually sit
on. Two services drawn as separate boxes that both depend on the same
single-region database, the same shared message queue, or the same
availability zone are in the *same* failure domain in practice, regardless
of how the diagram's boxes are arranged. This is exactly the gap from
Lesson 2's reliability finding — the diagram can make a system look
resilient by drawing components apart visually while they still fail
together underneath.

## Turning diagram-reading into review language

Once you've traced data flow, marked every trust boundary, and identified
real failure domains, you already have the raw material for pillar
findings without reading a single config file: "this inbound arrow fans
out to five services with no visible retry path — reliability"; "this
boundary crossing has no NSG or private endpoint shown — security"; "these
two boxes share a failure domain through one database — reliability
again." That's the entire skill this chapter has been building toward:
turning a picture into the same specific, pillar-anchored language you
practiced in Lessons 2 and 3.

## Key terms

| Term | Meaning |
|---|---|
| Trust boundary | A line on a diagram (explicit or implied) where the level of trust changes — public to private, unauthenticated to authenticated, one account to another |
| Failure domain | The actual scope within which a single failure is contained, determined by shared underlying infrastructure, not by how boxes are visually arranged |
| Data flow trace | Following one real request through a diagram, arrow by arrow, rather than reading every label in isolation |
| Diagram as claim | The principle that a diagram shows intended behavior, not verified behavior — every arrow and box should be read skeptically |

## Check yourself

You're ready to move into Chapter 2 when you can take any architecture
diagram you've never seen before, trace one request through it, mark
every trust boundary, and identify at least one place where the visual
layout might be hiding a shared failure domain.
