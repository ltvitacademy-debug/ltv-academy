# Lesson 12 — Choosing an Operating Model

**Chapter 2 · Frameworks and Models · Lesson 12 of 30**

## What you'll learn

- A practical, five-question decision framework for choosing a model
- Why "it depends" is the right answer, and what it actually depends on
- A worked example applying the framework to a realistic scenario
- How this closes out Chapter 2 and sets up Chapter 3's roles

## There is no universally correct model

Lesson 11 covered the three types — centralized, decentralized, federated — and their tradeoffs. This lesson is about actually choosing, for a specific, real organization, rather than defaulting to whichever model sounds most sophisticated (usually federated) or whichever one requires the least immediate work (usually decentralized, by inertia). The honest answer to "which model should we use" is "it depends" — but it depends on specific, answerable questions, not vague judgment.

## Five questions that actually determine the answer

1. **How many meaningfully distinct business units does the organization have?** One or two similar ones lean centralized. Several genuinely different ones (different products, different customers, different data) lean federated or decentralized.
2. **How much cross-cutting data actually needs to be consistent?** If regulatory reporting, financial consolidation, or company-wide metrics require one shared definition, that pulls toward federated (centralize just that) rather than full decentralization.
3. **What's the current governance maturity (Lesson 9)?** An organization at the earliest maturity levels often can't yet support a fully federated model's complexity — a simpler, more centralized starting point, with a deliberate plan to federate later, is often more realistic.
4. **Is there genuine executive sponsorship (Lesson 18) to back a centrally-enforced standard?** Federated and centralized models both require real authority to enforce the "centrally governed" parts. Without that sponsorship, a nominally federated model quietly degrades into decentralized in practice.
5. **How fast does the organization need to move, and in which parts?** Parts of the business that need to move fast with full local context (a scrappy new product line) argue for local authority; parts that need absolute consistency (financial reporting) argue for central authority over that specific data.

## A worked example

Picture a mid-size healthcare company with three business units: a hospital network, a telehealth platform, and a medical billing subsidiary. Distinct business units with different data (three, leaning federated). But all three touch patient data subject to HIPAA — a strong cross-cutting consistency need (reinforcing federated, with privacy/compliance centrally governed). Maturity is low — first real governance effort (suggesting a staged rollout, not full federation on day one). There's a new Chief Data Officer with real executive backing (sponsorship is present). The answer this framework points to: start federated, but scope the centrally-governed piece narrowly to patient-data compliance first, and expand central scope only as maturity grows — not a from-scratch big-bang federated rollout on day one.

## Closing Chapter 2

Chapter 2 has covered the vocabulary (DMBOK), the named frameworks beyond it (DCAM, COBIT, ISO 38505), how to measure where you stand (maturity models), and how governance actually gets structured and chosen (operating models). Chapter 3 moves from structure to people: who specifically holds these roles — owners, stewards, custodians, councils — and how authority and accountability map onto real job titles.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | A structured set of questions used to choose an operating model deliberately, not by default |
| Staged rollout | Starting with a narrower, more centralized scope and expanding governance's reach as maturity grows |
| Cross-cutting data | Data that needs one consistent definition across multiple business units (e.g., for regulatory reporting) |

## Lab

Apply the five-question framework from this lesson to your own organization (or one you know well). Write a short paragraph answering each of the five questions, and state which operating model the framework points to — and whether that matches what's actually running today (per Lesson 11's "signals" test).

## Check yourself

Without looking back, can you list the five questions this lesson's decision framework asks, and walk through how they applied to the worked healthcare example?
