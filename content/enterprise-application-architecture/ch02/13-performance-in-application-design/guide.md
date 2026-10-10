# Lesson 13 — Performance in Application Design

**Chapter 2 · Quality Attributes · Lesson 13 of 25**

## What you'll learn

- How performance differs from scalability, even though the two are closely related
- Where perceived performance (what the user experiences) diverges from measured performance
- Specific design-time decisions that most commonly cause slow pages and slow transactions
- Why performance has to be designed for, not just tuned after a complaint comes in

## Performance is about this transaction, right now

Lesson 8 covered **scalability** — how a design holds up as volume and concurrency grow over time. **Performance** is a related but distinct quality: how fast a specific page loads or a specific transaction completes, right now, for the user experiencing it. A design can be perfectly scalable (it'll still work fine at 10 million records) and still have poor performance today (a record page takes six seconds to load because of how it's built), and the reverse is also possible — fast today, but headed for trouble at scale. An Application Architect has to evaluate both, because a stakeholder experiencing a slow page doesn't care whether the underlying cause is a scalability time-bomb or a performance problem that exists regardless of volume.

## Perceived performance is not the same as measured performance

A page that takes four seconds to fully load, but shows the user meaningful content (a skeleton layout, the record's key fields) within the first half-second, is often experienced as faster than a page that takes three seconds but shows nothing at all until everything is ready. This matters architecturally: Lightning pages built from many separately-loading components, each independently fetching its own data, can feel slower than they measure, or faster than they measure, depending entirely on load order and what appears first. Designing which components load first, and what a user sees while the rest of the page catches up, is a genuine design decision — not purely a developer's implementation detail to be left unexamined.

## Common, avoidable causes of poor performance

- **Too many components on one Lightning page, each independently querying data.** A record page with a dozen components, each running its own query, multiplies round-trips in a way that a single, well-designed aggregate query (or a handful of well-chosen components) avoids.
- **Non-selective SOQL on large objects.** A query that can't use an index effectively gets slower as the underlying object grows — this is the same mechanism covered in Lesson 8, but it shows up here as a today problem the moment the object is already large, not just a future scalability risk.
- **Formula fields that reference long chains of cross-object formulas.** Each additional link in a formula chain adds real evaluation cost every time the record is viewed or saved; a formula that reaches across five related objects is meaningfully more expensive than one that reaches across one.
- **Synchronous automation doing work that could be deferred.** Automation that performs a slow external callout or a heavy calculation synchronously, blocking the user's save, when that same work could run asynchronously after the save completes, turns an architecture choice directly into user-perceived lag.

## Performance is a design-time responsibility

Performance problems discovered after launch, via a user complaint, are far more expensive to fix than the same issue caught during design review — partly because the fix often means restructuring a page or a data model that real users and real data are already depending on. The practical habit this lesson argues for: when reviewing a Lightning page design or an automation design, explicitly ask "what will this feel like to load, and what's doing the most expensive work in the critical path" before it ships, the same way Lesson 8 asks "how will this behave at real volume."

## Key terms

| Term | Meaning |
|---|---|
| Performance | How fast a specific page or transaction completes right now, for the user experiencing it |
| Perceived performance | How fast a page feels to a user, which can diverge from its actual measured load time depending on what loads first |
| Non-selective query | A SOQL query that can't effectively use an index, slowing down as the underlying object grows |
| Critical path | The sequence of work that must complete before a user sees a result or a transaction finishes |

## Lab

A Lightning record page for the Case object has eleven components, each independently querying related data (related Contacts, related Orders, a custom activity timeline, a knowledge-article recommender, and seven more), and users report the page "feels slow" even though no single component is individually doing anything wrong. Propose two concrete design changes — one about component count/data-fetching strategy, one about perceived-performance sequencing (what loads first) — that would plausibly improve how this page feels to use, without necessarily reducing every component's own measured query time.

## Check yourself

Can you explain the difference between scalability and performance, with an example of a design that could be strong on one and weak on the other? Can you name at least two specific, avoidable design-time causes of poor performance from this lesson?
