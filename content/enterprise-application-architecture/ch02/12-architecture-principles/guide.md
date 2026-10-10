# Lesson 12 — Architecture Principles

**Chapter 2 · Quality Attributes · Lesson 12 of 25**

## What you'll learn

- What an architecture principle is, and how it differs from a one-off design decision
- A set of durable principles that recur across well-run Salesforce application architectures
- How principles help resolve disagreements faster than re-litigating every decision from scratch
- Why principles need to stay few, written down, and genuinely enforced to be worth having

## A principle is a decision you don't have to make twice

An **architecture principle** is a standing rule, agreed in advance, that guides many future decisions consistently — as distinct from a one-off decision made for a single feature. "We default to declarative solutions unless a specific factor justifies code" (Lesson 5) is a principle. "This particular Flow should run before that particular Flow" is just a decision. Principles exist because re-deriving the right answer from first principles every single time a similar question comes up is slow, inconsistent across different people making the call, and prone to whoever's in the room that day winning the argument rather than what's actually right for the application.

## Principles that recur across sound application architectures

- **Prefer the platform's native capability over a custom-built equivalent**, unless a specific, articulated gap justifies building custom (echoes Lesson 7's build/configure/buy spectrum).
- **Bulkify everything, by default, with no exceptions** for "it'll probably only ever run on one record" — because that assumption is exactly the one that tends to get violated by a future data load or integration nobody anticipated.
- **One trigger per object, logic lives in handler/service classes** (Lesson 6) — not re-debated project by project, just followed.
- **Externalize configuration, don't hardcode values that might change** (Lesson 9) — a standing rule, not a case-by-case judgment call.
- **Document the "why" behind non-obvious decisions**, not just the "what" — so a future reviewer isn't left reconstructing the reasoning from scratch (this connects directly into Lesson 22).
- **New capabilities get evaluated for application boundary fit before being bolted onto an existing app** (Lesson 4) — a standing check, not an afterthought.

None of these is unique to one project; they're meant to travel with the architect (or the organization's engineering standards) across many projects, which is exactly what makes them principles rather than decisions.

## Principles resolve disagreements faster

When two reasonable people disagree about whether a new feature should be a Flow or an Apex trigger, re-arguing the general merits of declarative versus programmatic tools from scratch, every time, wastes time that an agreed principle ("default declarative unless X") already settles — the conversation can go straight to "does this specific case meet the bar for X" instead of restarting the whole philosophical debate. This is the practical value of principles: they move disagreements from "what do we believe in general" (settled once) to "does this specific case meet the agreed bar" (a much narrower, faster question).

## Principles only work if they're few, written, and enforced

A list of thirty "principles" that nobody can recall without looking them up isn't actually guiding anyone's daily decisions — it's decoration. Effective architecture principles tend to be few enough to remember, written down somewhere the team actually consults (not buried in a slide deck from a kickoff meeting eighteen months ago), and genuinely enforced in design review (Lesson 20) rather than quietly ignored under deadline pressure. A principle that's violated routinely without consequence isn't a principle anymore — it's a suggestion, and the team should either genuinely commit to it or honestly retire it rather than let it linger as nominal, unenforced guidance.

## Key terms

| Term | Meaning |
|---|---|
| Architecture principle | A standing rule, agreed in advance, that consistently guides many future design decisions |
| One-off decision | A choice made for a single specific feature or situation, not meant to generalize |
| Design review | The process (Lesson 20) where a design is checked against the team's architecture principles before or during build |

## Lab

Draft a short list of three to five architecture principles you'd propose for a hypothetical team building multiple applications on the same Salesforce org over several years. For each principle, write one sentence explaining what kind of repeated disagreement or decision it's meant to settle in advance, and one sentence describing what it would look like for the principle to be violated without consequence (so you can recognize if it's quietly becoming "decoration" rather than a real standard).

## Check yourself

Can you explain the difference between an architecture principle and a one-off decision, with an original example of each? Can you explain why a long list of unenforced principles is functionally the same as having no principles at all?
