# Lesson 30 — Mock Defense: Data and Security

**Chapter 6 · Defense · Lesson 30 of 33**

## What you'll learn

- A full mock Q&A exchange covering LTV Global's data and security architecture
- How a strong answer is structured: direct answer, reasoning, rejected alternative, evidence
- Where a weaker, common answer pattern fails against the same questions
- How to self-score your own answer against the pattern this lesson demonstrates

## Mock board question 1: ownership

**Board member:** "You've chosen a single global org. Walk me through why, and what you gave up."

**Strong answer:** "We chose a single global org because LTV Global's target-state vision commits to a unified customer view across four business units and three regions — a dealer who buys equipment, orders parts, and opens a service case needs to appear as one customer with one history. A multi-org estate can't deliver that natively; no Salesforce report spans two orgs without a separate integration layer doing the work. What we gave up is real: all four business units now share governor limits and one release process, so a bad customization in one business unit is a shared-platform risk for every other one. We manage that cost through per-business-unit packaging and a Change Advisory Board for shared changes, which we'll cover in the delivery strategy."

**Why this works:** it states the decision, the specific requirement driving it, the specific cost accepted, and where that cost is managed — all without being asked for the follow-up.

**Weaker answer pattern to avoid:** "Single org is just the best practice for most companies." This fails every evaluation domain at once — it doesn't trace to a requirement, names no rejected alternative, and asserts a universal rule the architect's own courses have already established isn't true (Lesson 7 made clear this is a genuine tradeoff, not a default).

## Mock board question 2: EMEA and GDPR

**Board member:** "EMEA has real GDPR exposure. Why doesn't EMEA get its own org?"

**Strong answer:** "No single control carries that weight alone — it's a combination. The Private organization-wide default plus a region-first role hierarchy already limits EMEA personal data's default visibility to EMEA roles. Field-level security and Shield Platform Encryption protect the most sensitive fields regardless of region. And our nonfunctional requirements formally address data residency for where EU personal data is processed. Splitting EMEA into its own org would solve data residency in isolation but would break the unified customer view that's the entire reason we're on a single org in the first place — so we solved it with layered controls instead of a structural split."

**Weaker answer pattern:** Treating this as a single yes/no question ("No, because our security is good") without naming the specific combination of controls — this invites exactly the kind of follow-up drilling that reveals the architect hasn't actually thought through which control does what.

## Mock board question 3: the financing data

**Board member:** "A sales rep has full Account access. Can they see a customer's credit score?"

**Strong answer:** "No — field-level security is evaluated independently of record-level access. Even with full Account visibility through the role hierarchy, the credit-score and financing-terms fields are restricted to Equipment Financing profiles specifically. Object and record access answer 'can you see this record at all'; field-level security answers a separate question, 'which fields on a record you can see, can you actually see.' Those are two different gates, and this design uses both deliberately."

## Self-scoring your own answers

Score any answer you draft against four checks, the same four a real board implicitly uses: did it give a direct answer first (not buried after three sentences of preamble)? Did it state the actual reasoning, not just the conclusion? Did it name what was rejected and why, where relevant? And did it point to concrete evidence (a specific lesson's mechanism, a specific NFR) rather than a vague assurance?

## Key terms

| Term | Meaning |
|---|---|
| Direct answer | Stating the conclusion first, before the supporting reasoning |
| Mock defense | Rehearsed Q&A practice simulating live board questioning |
| Self-scoring | Checking your own answer against the direct-answer/reasoning/rejected-alternative/evidence standard |

## Lab

Write your own strong answer (in the style modeled above, 60-100 words) to this question: "Your Parts Order object uses a lookup to Equipment Asset instead of master-detail. Isn't that less connected, less safe?" Then self-score it against the four checks in this lesson.

## Check yourself

Can you reproduce, in your own words (not verbatim), the strong answer to the single-org question above? Can you explain why the "weaker answer pattern" examples in this lesson fail specifically, not just that they're shorter?
