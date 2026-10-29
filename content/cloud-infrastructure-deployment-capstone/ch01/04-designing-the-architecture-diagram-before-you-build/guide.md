# Lesson 4 — Designing the Architecture Diagram Before You Build

**Chapter 1 · Planning a Real Deployment · Lesson 4 of 32**

## What you'll learn

- Why sketching the architecture on paper comes before opening a cloud console, not after
- What actually belongs in a real architecture diagram: network layout, compute tiers, and data
  flow
- Why catching a design problem on paper is far cheaper than catching it after deployment
- How that same diagram becomes real documentation later, not a sketch you throw away

## Draw it before you build it

Everything gathered so far in this chapter — the requirements brief, the provider choice, the
sizing numbers — comes together on paper before any of it comes together in a console. A sketch of
the architecture, even a rough one on a whiteboard or in a simple diagramming tool, forces you to
work through how the pieces actually connect before you've committed real resources, real money,
and real time to building it. Finding out on paper that two tiers can't talk to each other the way
you assumed costs you an eraser mark. Finding it out after deployment costs you a rebuild.

## What a real architecture diagram actually shows

A useful diagram for a real deployment isn't decoration — it answers three questions clearly
enough that someone else could follow it:

- **Network layout** — what network and subnets exist, what's public-facing and what's isolated,
  and where the boundaries between them sit.
- **Compute tiers** — what actually runs where: a web/application tier, a database tier, maybe a
  separate tier for background jobs, each shown as its own box rather than one undifferentiated
  blob labeled "the app."
- **Data flow** — how a request actually moves through the system, from the user, through each
  tier, to storage, and back. This is the piece most often skipped, and the piece most likely to
  reveal a real design problem (a tier that needs direct access to something it shouldn't, or a
  dependency that creates a bottleneck).

A diagram that's missing any one of these three isn't really an architecture diagram yet — it's a
box with an arrow.

## Why paper is cheaper than production

Every mistake a diagram catches is a mistake that never gets built. Realizing on paper that the
database tier was about to be placed on a public subnet, or that a background job tier has no
realistic path to the data it needs, costs nothing but a conversation. The same mistake discovered
after deployment means tearing down and rebuilding live infrastructure — possibly with real user
data already in it, possibly during a maintenance window nobody budgeted for. The diagram's entire
job is to move that discovery to the cheapest possible moment.

## The diagram doesn't get thrown away

A diagram drawn only to plan and then discarded wastes half its value. The same diagram, kept and
updated as the environment changes, becomes the first page of real documentation — the thing a new
engineer looks at to understand what's actually running, and the thing Chapter 6 of this course
builds directly on when it covers documentation and handoff. Treat it as a living artifact from the
start, not a planning exercise you delete once the real build begins.

## Key terms

| Term | Meaning |
|---|---|
| Architecture diagram | A sketch showing network layout, compute tiers, and data flow for a planned deployment |
| Network layout | What networks/subnets exist and which are public-facing vs. isolated |
| Compute tier | A distinct layer of a system (web, database, background jobs) shown as its own component |
| Data flow | The path a request actually takes through the system, from user to storage and back |

## Check yourself

Before writing this down, you assumed the background job tier could reach the database directly.
Sketching the diagram shows it actually has to go through the application tier first. Why is
catching that on paper, right now, better than catching it after the environment is already live?
