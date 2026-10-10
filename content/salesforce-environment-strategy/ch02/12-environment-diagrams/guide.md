# Lesson 12 — Environment Diagrams

**Chapter 2 · Managing Environments · Lesson 12 of 14**

## What you'll learn

- Why an environment strategy needs to be documented as a diagram, not just understood informally
- What a real environment diagram needs to show, beyond just a list of environment names
- How to represent the promotion path and refresh relationships visually
- Who actually reads and relies on this diagram
- How this lesson sets up the case studies in Chapter 3

## Why this needs to be a diagram, not just a shared understanding

Every lesson in this chapter so far has described rules an architect carries in their head: which sandbox type for which tier, how often each refreshes, who has access, where masking applies. None of that is useful to anyone else if it only exists in one architect's head. An **environment diagram** is the artifact that makes an org's environment strategy a shared, reviewable, onboarding-ready fact instead of institutional memory that walks out the door when one person leaves. It's one of the concrete deliverables a Salesforce architect is expected to produce and keep current — not a nice-to-have, but part of the job.

## What a real environment diagram shows

A genuinely useful environment diagram goes well beyond a list of box labels. At minimum, it should make these things visible at a glance:

- **Every environment that exists**, named consistently with how the team actually refers to them.
- **The promotion path** — which environment's changes flow into which next, using arrows that show direction, not just a loose grouping.
- **Each environment's type and purpose** — a scratch org vs. a Developer sandbox vs. a Partial Copy vs. a Full sandbox, and in one line, what each one is actually for.
- **Refresh relationships** — which environment is refreshed from which source (usually production), and roughly how often.
- **Data posture** — whether an environment carries real data, masked data, or no data at all, since that's exactly the risk surface Lessons 9 and 10 covered.

A diagram missing any of these isn't wrong, exactly — it's just answering a smaller question than the one a real environment strategy needs answered.

## A simple example, in text form

For a small team using the promotion path established earlier in this chapter, a diagram's content (described here in words, since this is a conceptual lesson) might read:

```
[Scratch Org / Dev Sandbox] --(promote)--> [Partial Copy — Testing]
                                                   |
                                          (promote, after sign-off)
                                                   v
                                          [Full — Staging] --(promote)--> [Production]

Refreshes: Testing <- refreshed from Production (template sample)
           Staging <- refreshed from Production (full copy)
Data posture: Dev = no data · Testing = masked sample · Staging = masked full copy · Production = real data
```

The actual diagram an architect produces would render this as labeled boxes and directional arrows — the point here is the *content* a diagram needs to carry, which doesn't change whether it's drawn by hand, in a diagramming tool, or described in a document.

## Who actually relies on this

An environment diagram isn't just documentation for documentation's sake — specific people depend on it: a new developer needs it to know where to even start building; a release manager needs it to know the correct promotion order before a deployment; a security reviewer needs the data-posture layer to assess real risk without having to interview the architect directly; and the architect themselves needs it as the artifact that gets revisited and updated whenever the strategy changes, rather than trusting memory to stay accurate as the org grows.

## Setting up Chapter 3

Chapter 3's two case studies — a small team and an enterprise with multiple pipelines — are, underneath everything else, exercises in producing exactly this kind of diagram for two very different scales of organization. Everything this chapter covered (sandbox types, refresh cadence, data posture, access scoping) is the content that eventually has to show up on one of these diagrams; this lesson is the one that ties it together into a single artifact.

## Key terms

| Term | Meaning |
|---|---|
| Environment diagram | A visual artifact documenting every environment, the promotion path, refresh relationships, and data posture |
| Promotion path (diagrammed) | The directional arrows showing which environment's changes flow into which next |
| Data posture | Whether a given environment carries real, masked, or no data — a key risk-communication element of the diagram |

## Lab

Using the five elements this lesson lists (environments, promotion path, type/purpose, refresh relationships, data posture), sketch — in plain text, the same way the example above is written — an environment diagram for an org with: one shared Developer sandbox for two admins, one Partial Copy sandbox refreshed weekly for testing, and production. Be explicit about data posture for each environment, and mark where masking (Lesson 10) would need to apply.

## Check yourself

Can you list, from memory, the five things a real environment diagram needs to show? Can you explain why documenting environment strategy as a diagram matters beyond just "it looks professional" — specifically, name one role (besides the architect) who depends on it and why?
