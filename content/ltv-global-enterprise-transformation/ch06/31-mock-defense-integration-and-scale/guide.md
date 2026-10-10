# Lesson 31 — Mock Defense: Integration and Scale

**Chapter 6 · Defense · Lesson 31 of 33**

## What you'll learn

- A second full mock Q&A exchange, this time covering integration and large data volume questions
- How to defend a design decision that sounds, at first, like a limitation (LedgerPoint's batch-only integration)
- How to handle a hostile or skeptical follow-up question without getting defensive
- Why consistency with earlier answers (not just correctness) is something boards actively check for

## Mock board question 1: the LedgerPoint "gap"

**Board member:** "Your financial integration is just a nightly batch file. Isn't that a significant gap in an otherwise modern architecture?"

**Strong answer:** "It's a deliberate design decision, not a gap we didn't get to. LedgerPoint is a legacy mainframe system with no API of any kind — that's a fixed constraint, not something this transformation's scope includes fixing, since modernizing core financial infrastructure was explicitly out of scope. Given that constraint, nightly batch with reconciliation is the correct engineered answer: idempotency isn't the concern here since it's file-based, but we built a reconciliation step that compares record counts and totals after every batch cycle specifically to catch a dropped or malformed record quickly. We also made this a documented nonfunctional requirement — an accepted tolerance window of up to one business day — so it's a known, agreed behavior, not a surprise a finance user discovers in production."

**Why this works:** it reframes "gap" without being defensive, states the actual constraint, names the specific mitigation mechanism (reconciliation), and connects to the NFR that makes the tradeoff a documented decision rather than an oversight.

**Weaker answer pattern to avoid:** apologizing for the batch design ("we wanted to do better but ran out of time/budget") — this invites the board to treat it as an unresolved weakness rather than a deliberate, defensible choice, even though the underlying design is identical either way. How you frame a decision changes how it's evaluated.

## Mock board question 2: a hostile follow-up

**Board member:** "You keep saying 'deliberate decision.' Isn't that just a nice way of saying you avoided the hard problem?"

**Strong answer:** "No — avoiding the hard problem would mean pretending LedgerPoint could do real-time and hoping it works out. We did the opposite: we designed specifically around the real constraint, with reconciliation to catch what batch processing can miss, and we documented the resulting tolerance window as an NFR so no one downstream is surprised by it. If LTV Global later funds a LedgerPoint modernization project, this integration design would be the first thing revisited — but that's a future decision, not evidence this one was wrong today."

**Why this works:** it doesn't get rattled by the pointed framing, restates the actual reasoning calmly, and explicitly acknowledges the decision's scope (it's right *for now*, not claimed to be permanent truth) without conceding the underlying design was a mistake.

## Mock board question 3: ownership skew at scale

**Board member:** "Walk me through what happens to Parts Order ownership if you'd just used the Meridian integration user as owner, like a simpler design would."

**Strong answer:** "At LTV Global's volume — tens of thousands of orders a day — that one user would end up owning tens of millions of records, which is a severe case of ownership skew. Sharing-recalculation and visibility checks involving that user's records would become dramatically more expensive, and because this object's OWD is Private, that cost shows up constantly, not just during bulk operations. We use queue-based ownership instead, split by region and business unit, which keeps that calculation cost manageable and gives regional parts teams a natural work queue as a side benefit."

## Why consistency matters as much as correctness

A board doesn't only check whether a single answer is correct in isolation — it checks whether your answers to different questions stay consistent with each other across the whole session. If your answer to the LedgerPoint question implied Salesforce stores full ledger detail, but your data-architecture answer earlier said Salesforce only stores summarized AR status, a board member will catch that contradiction and trust the rest of your answers less. This is exactly why Lesson 25's ADRs and this capstone's scenario bible exist — consistency isn't an accident, it's the product of the same facts being used throughout.

## Key terms

| Term | Meaning |
|---|---|
| Reframing without being defensive | Acknowledging a question's framing while restating the actual design reasoning calmly |
| Hostile follow-up | A skeptical or pointed question testing whether an answer holds up under pressure |
| Cross-answer consistency | Whether an architect's answers to different questions remain factually consistent with each other |

## Lab

Write your own strong answer (60-100 words) to this hostile follow-up: "If a single org concentrates governor-limit risk across four business units, isn't that just a ticking time bomb you're hoping doesn't go off?" Use the reframing technique modeled above — acknowledge the real risk, then state the actual mitigation this capstone already designed (Lesson 19's packaging and CAB) without being defensive.

## Check yourself

Can you explain, in your own words, why apologizing for the LedgerPoint batch design would be a weaker move than defending it as deliberate, even if the underlying design is unchanged either way? Can you explain what "cross-answer consistency" means, and why a board specifically watches for it across an entire defense session, not just within one answer?
