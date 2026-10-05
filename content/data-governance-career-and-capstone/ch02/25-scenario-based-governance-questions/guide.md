# Lesson 25 — Scenario-Based Governance Questions

**Chapter 2 · Career Preparation · Lesson 25 of 35**

## What you'll learn

- A structure for answering open-ended governance scenario questions
- Four realistic scenarios, each mapped to a specific concept from earlier in this path
- Example strong answers you can adapt and practice
- What interviewers are actually listening for underneath the specific scenario

## A structure for answering

Four moves, every time: **clarify** the ambiguous parts, **name** the governance concept or process this actually is, **walk through** the decision step by step, and **state** the outcome along with what you'd watch for next. Interviewers are testing whether you reach for a real process instead of guessing out loud.

## Scenario 1: Two systems define "customer" differently

**Question:** "Marketing says we have 50,000 customers; Finance says 38,000. Both numbers are technically correct by their own definition. How do you handle it?"

**Strong answer:** This isn't a data bug — it's a missing or competing business-glossary term (Metadata Management and Business Glossary, Lesson 6). I'd get both definitions in writing first, then find the named owner for the Customer domain (Data Governance Foundations, Lesson 13). If no owner exists, that's the real root problem to raise. I'd bring both definitions to that owner, or to the governance committee if ownership itself is contested, and get agreement on one authoritative term. If both numbers turn out to be legitimately different concepts — say, "Active Customer" versus "Billed Account" — I'd document them as two separate, clearly named glossary terms instead of forcing one number to win, and have every downstream report cite the approved term rather than re-deriving its own count.

## Scenario 2: Nobody can say who owns a data element

**Question:** "Nobody can tell you who owns the 'Customer Risk Score' field. How do you assign ownership?"

**Strong answer:** I'd start by identifying which business function the element actually serves — in this case, probably credit or collections — and find the named business leader who already has authority over that function (Data Governance Foundations, Lesson 13: ownership requires business context, not just technical familiarity). I'd propose them as the Accountable owner, with whoever maintains the scoring logic as steward or custodian, and confirm with a quick RACI check (Lesson 17) that exactly one role ends up Accountable. If the element is used in regulatory reporting, I'd also flag it as a critical data element with a stricter review cadence (Metadata Management, Chapter 4).

## Scenario 3: A VP wants an exception to the access policy

**Question:** "A VP wants broad access to PII for a one-off analysis, outside the agreed access model. What do you do?"

**Strong answer:** I wouldn't just say no, and I wouldn't just grant it because of seniority. I'd route it through the documented exception process: scope the request to the minimum data actually needed for the analysis (least privilege), time-box the access instead of granting it permanently, consider masking fields that aren't strictly required, log the grant, and get sign-off from the data owner — not just the requester's own authority (Data Security, Privacy and Classification, Chapter 3: Access Governance, Least Privilege). The VP's seniority doesn't change who's accountable for that data domain.

## Scenario 4: An executive dashboard shows a wrong number

**Question:** "The executive revenue dashboard shows a number 8% below Finance's own figure. Leadership wants an answer today. How do you investigate?"

**Strong answer:** This is a root-cause-analysis walk, not a dashboard bug hunt (Data Lineage and Impact Analysis, Lesson 16). I'd start at the symptom — the exact field and value that's wrong — and walk upstream hop by hop through the documented lineage, checking at each hop whether the data was already correct coming in or became wrong at that step. I wouldn't assume the problem is in the dashboard just because that's where it was noticed; the break is often several hops further upstream, in a transformation rule or a source system that silently changed.

## What's underneath every scenario

Interviewers rarely care about one "correct" one-line answer. They're listening for whether you reach for a named process instead of improvising, whether you can tell who should decide something versus who should just execute it, and whether you stay calm and structured with an ambiguous, unresolved situation instead of rushing to a premature fix.

## Key terms

| Term | Meaning |
|---|---|
| Scenario-based question | An open-ended "how would you handle..." interview question with no single fixed answer |
| Authoritative definition | The one glossary-approved meaning of a term that downstream reports are expected to cite |
| Exception process | A documented, logged path for granting a policy exception rather than an informal override |

## Lab

Pick one of this lesson's four scenarios. Before re-reading the strong answer, write your own answer from scratch, out loud if possible. Then compare it against the lesson's version and note what you'd add.

## Check yourself

Can you map each of this lesson's four scenarios to the specific earlier course and lesson it draws on, without looking back?
