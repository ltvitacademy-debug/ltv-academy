# Lesson 4 — Migration Scope and Strategy

**Chapter 1 · Planning · Lesson 4 of 18**

## What you'll learn

- What "scope" actually has to define, beyond a list of object names
- How big-bang and phased migration strategies trade off risk, speed, and cost differently
- Why scope needs formal business sign-off before any design work starts
- How scope creep happens and why it's dangerous mid-project specifically

## Scope is more than a list of objects

It's tempting to think of migration scope as just "which Salesforce objects are we loading" — Accounts, Contacts, Opportunities. Real scope has to answer several more specific questions than that: which fields on each object are actually in scope (not every legacy field deserves a home in Salesforce); how far back historical data goes (all ten years of closed Opportunities, or just the last two?); and, just as importantly, what's explicitly being left behind — data the business has decided isn't worth the cost of migrating, which should be written down as a deliberate decision, not just quietly dropped and discovered missing later. Scope built from the profiling findings in Lesson 3 is far more defensible than scope built from a guess, since a known data-quality problem (say, 1,500 duplicate Accounts) is itself an input to a scope decision ("do we migrate the duplicates and clean them up after, or de-duplicate first?").

## Big bang vs. phased migration

Once scope is defined, the project has to choose a migration **strategy** — the shape of how that scope actually gets delivered.

- **Big bang**: the entire scope moves in a single event. Everything cuts over at once; the legacy system is retired (or frozen) immediately afterward. This is simpler to plan and reason about — there's one migration, one cutover, one rollback plan to design — but it concentrates all the risk into a single event and typically requires a longer, harder freeze window on the legacy system while the final load runs.
- **Phased (or trickle) migration**: scope is broken into stages — by object, by business unit, by geography — each with its own smaller cutover. This spreads risk across multiple smaller events, each easier to validate and rehearse, and lets the business start getting value from Salesforce earlier for whichever stage lands first. The cost is complexity: for a period of time, both systems may need to coexist and possibly stay in sync with each other, and relationships that span a stage boundary (a Contact already migrated whose Opportunity hasn't been yet) need deliberate handling.

Neither strategy is objectively correct — the right choice depends on the business's tolerance for a long freeze window, the technical feasibility of running two systems side by side temporarily, and how cleanly the scope can actually be split along stage boundaries without breaking relationships across them.

## Sign-off has to happen before design starts

Scope and strategy are business decisions dressed up as technical ones, and they need the same kind of formal sign-off a contract would get — written approval from the people accountable for the data and the project outcome, not just a verbal "sounds good" in a meeting. The reason this matters so much is sequencing: Chapter 2's mapping and transformation design, and Chapter 3's validation criteria, are both built directly on top of whatever scope was agreed here. If scope shifts later without going back through a sign-off process, that downstream design work has to be redone, often under worse time pressure than the original planning had.

## Scope creep is dangerous specifically because of when it happens

**Scope creep** — scope quietly expanding after it was supposed to be locked, usually one small "can we also include..." request at a time — is dangerous less because any single addition is unreasonable and more because of *when* it happens: mid-project, after mapping and transformation work has already started against the original scope. Each addition doesn't just add its own work; it risks invalidating mapping decisions, sequencing plans, and even rehearsal results that were built assuming the smaller, original scope. A disciplined project treats any post-sign-off scope change as a formal change request that gets evaluated for its real downstream cost, not as a free favor granted because it sounds small in the moment.

## Key terms

| Term | Meaning |
|---|---|
| Migration scope | The specific objects, fields, and historical date range formally agreed to be migrated — and what's explicitly excluded |
| Migration strategy | The overall shape of how scope gets delivered — big bang vs. phased/trickle |
| Big bang migration | Moving the entire scope in a single cutover event |
| Phased (trickle) migration | Breaking scope into stages, each with its own smaller cutover |
| Scope creep | Scope quietly expanding after sign-off, usually in small increments, each with real downstream cost |

## Lab

A retail company's migration scope was signed off as: Accounts, Contacts, and Opportunities from the last 3 years, big-bang strategy, single cutover weekend. Four weeks into design work, a regional sales director asks for all 8 years of historical Opportunities "since it's probably not that much more data," and separately, the support team asks to add Cases, which weren't part of the original scope at all. Write a short response (as the architect) addressing both requests: what you'd actually need to know before agreeing to either, and what process each request should go through before it's accepted or rejected.

## Check yourself

Can you name the three things migration scope has to define beyond a bare list of object names? Can you explain, in your own words, the core trade-off between big-bang and phased migration strategies, and name one risk specific to each?
