# Lesson 7 — Assumptions and Constraints

**Chapter 2 · From Requirements to Blueprint · Lesson 7 of 19**

## What you'll learn

- The difference between a constraint (fixed, not up for debate) and an assumption (believed true, but unverified)
- Why undocumented assumptions are one of the most common causes of a design failing later
- A simple habit for surfacing assumptions before they become expensive surprises
- How to write both down so a design review can actually interrogate them

## Two different things that get confused constantly

A **constraint** is something fixed about the problem that the design has to work within, whether or not the architect likes it: a go-live date set by a board commitment, a budget ceiling, a legal requirement that data stay in a specific country, an existing system that can't be replaced this year. Constraints aren't negotiated away by good design — they're the walls of the room the design has to fit inside.

An **assumption** is different: it's something the design currently depends on being true, that hasn't actually been confirmed. "The integration partner's API can handle 500 requests per minute" is an assumption until someone has actually checked the partner's documentation or tested it — at which point it either becomes a confirmed fact the design can rely on, or turns out to be false and the design needs to change. Treating an assumption as if it were already a confirmed constraint is the mistake this lesson is about.

## Why undocumented assumptions are so expensive

A design built on five unstated assumptions looks exactly as solid as a design built on five verified facts, right up until one of the assumptions turns out to be wrong — usually well after the design has already been built, sometimes after it's in production. "We assumed the source system's customer ID was always unique" is a sentence nobody wants to say after a data migration has already run and created duplicate records. The expense isn't the assumption itself; every design has to make some assumptions to move forward at all. The expense is making them silently, so nobody had the chance to question them while questioning them was still cheap.

## A habit for surfacing assumptions

A practical habit: at the point a design is otherwise finished, deliberately ask "what does this design need to be true that I haven't actually checked?" and write down every honest answer, even the ones that feel obviously safe. Some will turn out to be trivially verifiable in five minutes (checking a setting, reading a line of documentation). Some will turn out to need a real conversation with another team. A few, occasionally, will turn out to be false, which is exactly the outcome this habit exists to catch while there's still time to redesign cheaply.

A second habit worth pairing with it: distinguish an assumption you're making because you believe it's true, from an assumption you're making because verifying it is inconvenient right now. The second kind is the dangerous one — it's easy to tell yourself "I'm sure that's fine" specifically because checking would slow you down, which is precisely when an assumption deserves the most scrutiny, not the least.

## Writing them down for review

A design document or blueprint (Lesson 10 covers building one in full) should carry an explicit list of both constraints and assumptions, kept separate from each other, because a reviewer needs to treat them differently. A constraint review asks "is this constraint still accurate, and does the design actually respect it?" An assumption review asks a sharper question: "has this actually been verified, and what happens to the design if it turns out false?" A reviewer who can see "assumption: the partner's sandbox environment mirrors production API behavior" written down explicitly has something concrete to challenge. A reviewer who only sees the finished design, with that assumption baked silently into a diagram, has nothing to push on — the assumption is invisible until it fails.

## Key terms

| Term | Meaning |
|---|---|
| Constraint | A fixed condition the design must work within, not up for negotiation |
| Assumption | Something the design depends on being true, that hasn't yet been verified |
| Undocumented assumption | An assumption that was never written down or surfaced for review, discovered only when it fails |
| Assumption surfacing | The deliberate habit of asking what a finished design needs to be true but hasn't checked |

## Lab

You're designing an integration that syncs order data nightly from an e-commerce platform into Salesforce. Write down two real constraints this project likely faces (things genuinely fixed, not up for debate) and two real assumptions the design is probably making (things believed true but not yet verified) — and for each assumption, write one sentence describing what would have to happen to actually verify it before relying on it.

## Check yourself

Can you explain the difference between a constraint and an assumption, with your own example of each? Can you describe why an undocumented assumption is dangerous specifically because it looks identical to a verified fact until it fails? Can you walk through the habit of asking "what does this design need to be true that I haven't checked" and apply it to a design of your own choosing?
