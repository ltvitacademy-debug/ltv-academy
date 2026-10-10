# Lesson 6 — Comparing Integration Designs

**Chapter 2 · Reviewing Designs · Lesson 6 of 14**

## What you'll learn

- A concrete set of criteria for comparing two candidate integration designs against each other
- Why "which design is better" is the wrong question until you've named what you're optimizing for
- How to build a comparison that a review board can actually evaluate, not just a list of pros and cons
- How to apply this method to a design you didn't build, not just one you're defending

## Two designs for the same problem

Go back to Meridian Fixtures from Lesson 1. There, the course landed on a hybrid design: a real-time callout for inventory and credit hold, and a batch sync for catalog and price. But that wasn't the only option on the table. A simpler alternative — call it **Design A** — would have been to make every field, including catalog and price, a real-time callout. It's a reasonable instinct: if live data is good for inventory, why not make everything live and skip maintaining a separate batch job?

Call the hybrid approach from Lesson 1 **Design B**. This lesson isn't about re-deriving which one is correct — it's about building the comparison itself, the artifact a review board actually wants to see, so the choice is demonstrably reasoned rather than just asserted.

## Five criteria that actually matter

A useful comparison isn't a vague gut check. It scores each design against named criteria:

- **Latency.** Design A adds a live callout to every quote-screen field, including ones that rarely change — meaning every quote line now waits on a network round trip for data that was almost certainly already correct a minute ago. Design B only pays that latency cost where it's actually needed.
- **Coupling and blast radius.** Design A makes Salesforce's core quoting screen fully dependent on the ERP being reachable for even the most stable data. If the ERP has a bad afternoon, quoting itself goes down. Design B's batch-synced fields keep working from cache even during an ERP outage; only the two genuinely volatile fields are exposed to that risk.
- **Load on the shared system.** Design A multiplies ERP query volume by however many times a quote screen is opened across the whole sales team, for data that changes a few times a week. Design B concentrates that load into one predictable nightly job.
- **Operational cost.** Design A has one integration pattern to build and monitor, which sounds simpler — but it concentrates all the risk above into every single field. Design B costs slightly more to build (two patterns instead of one) but spreads risk according to where it actually belongs.
- **Correctness under the actual data's volatility.** This is the criterion that decides it: fields that rarely change get no real correctness benefit from being real-time, while fields that change constantly get a real benefit. A single uniform pattern can't optimize for both at once.

## Why "pick the simpler design" is a trap

Design A looks simpler on a slide: one pattern, one thing to explain. But simplicity measured in "number of patterns" is not the same as simplicity measured in "risk the organization actually carries." A reviewer who's seen this trade-off before will ask exactly this: *simpler for whom, and simpler by which measure?* Lesson 1's hybrid design is more complex to build, and that complexity is the entire point — it's buying a real reduction in blast radius and load that the uniform design can't.

## Turning this into something presentable

A comparison a review board can actually use states, for each criterion, which design wins and why — not just an adjective like "better." The strongest version of this comparison doesn't hide Design A's advantage (it genuinely is easier to build and maintain one pattern instead of two) — it names that advantage honestly and then explains why the other criteria outweigh it for this specific case. A comparison that only lists reasons for the design you already picked, with no honest accounting of the alternative's real strengths, reads as biased rather than reasoned, and an experienced reviewer will notice.

## Key terms

| Term | Meaning |
|---|---|
| Comparison criteria | The named dimensions (latency, coupling, load, cost, correctness) a design choice is actually scored against |
| Blast radius | How much of the system fails or degrades when one dependency fails |
| Coupling | How much one system's availability or behavior depends on another system's |
| Uniform pattern | Applying the same integration pattern to every field regardless of its individual characteristics |

## Lab

Return to Lesson 3's Cascade Outfitters warehouse case study. Build a comparison, using this lesson's five criteria, between (1) a design that uses Change Data Capture as described in Lesson 3, and (2) an alternative design that instead makes the warehouse call a Salesforce REST API on a tight five-minute polling schedule for every tracked object. State which design wins on each criterion and name at least one real advantage of the polling design, even if you'd still recommend CDC overall.

## Check yourself

Can you list this lesson's five comparison criteria from memory and explain what each one actually measures? Can you explain why picking the design with the fewest moving parts isn't automatically the right call, using Meridian's Design A versus Design B as your example?
