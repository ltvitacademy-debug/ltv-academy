# Lesson 21 — Exam-Style System Architecture Scenarios

**Chapter 4 · Practice · Lesson 21 of 22**

## What you'll learn

- How System Architect-style exam scenarios are typically structured, and what they're actually testing
- A worked scenario applying integration pattern selection and systems-of-record reasoning together
- A worked scenario applying identity and availability reasoning together
- How to structure a defensible answer under exam conditions, not just arrive at a correct one

## What these scenarios actually test

Architecture-level certification scenarios are deliberately different from the single-fact recall questions earlier, more junior Salesforce exams lean on. A System Architect-style scenario typically describes a messy, realistic business situation — several systems, some conflicting requirements, some ambiguous details — and asks the candidate to recommend and justify an approach, not just pick the one technically correct fact. The skill being tested isn't "do you know what Platform Events are," it's "given this situation, can you reason your way to the right combination of concepts and defend why." That's exactly the skill this course's labs have been building, lesson after lesson.

## Worked scenario 1: the order visibility problem

**Scenario.** A distribution company's field sales reps use Salesforce and need to see a customer's current order status. Order status actually changes inside the ERP as orders move through fulfillment, several times a day. The ERP's integration team says they can expose a live read API, or alternatively feed a nightly batch export — they don't want to build push notifications into Salesforce. Reps need reasonably current information, but a few hours' staleness is tolerable; what's not tolerable is Salesforce holding a stale, duplicated copy of order status that quietly drifts from the ERP's own number over time.

**Reasoning.** The "don't want a stale duplicated copy that drifts" requirement is this course's systems-of-record warning (Lesson 3) applied directly — the ERP should clearly remain the system of record for order status, and Salesforce shouldn't take on a second, independently-maintained copy. Between the two integration mechanisms the ERP team offered, a live read API maps to data virtualization (Lesson 4/13) — Salesforce reads the ERP's order status live, at query time, rather than storing anything. A nightly batch export would technically work for the "few hours of staleness is tolerable" requirement, but it reintroduces exactly the duplicated-copy risk the requirement explicitly rules out, since a batch copy is, by definition, a second copy that can drift between refreshes. **The defensible recommendation is the live read API via virtualization, specifically because it satisfies the no-duplicate-copy requirement that batch cannot.**

## Worked scenario 2: the contractor offboarding gap

**Scenario.** A healthcare company's Salesforce org uses SSO through a corporate identity provider. An internal audit discovers a contractor's Salesforce access remained active for four months after their contract ended, because deactivating the identity provider account didn't automatically deactivate the separately-provisioned Salesforce user record. The company wants a System Architect's recommendation to prevent this from recurring.

**Reasoning.** This is squarely Lesson 14's enterprise identity territory: SSO handles authentication, but provisioning — and critically, *de*-provisioning — is a separate problem SSO alone doesn't solve. The gap described is exactly what an ongoing synchronization mechanism (Identity Connect or SCIM, depending on the company's directory system) is built to close, by keeping the Salesforce user record's active/inactive status synchronized with the authoritative HR or directory system of record, rather than relying on someone remembering to manually deactivate a second, separate account. **The defensible recommendation names the specific gap (deprovisioning wasn't automated) and recommends the specific mechanism (an ongoing sync tool) that closes it — not just "improve your offboarding process" in the abstract.**

## The structure that makes an answer defensible

Both worked scenarios follow the same shape, and it's a shape worth deliberately reusing under exam conditions: name the specific requirement or constraint that rules out the tempting-but-wrong option, name the specific concept or mechanism from this course that fits what's left, and state the recommendation in a way that's traceable back to the scenario's own stated facts — not a generic best practice that happens to also be true.

## Key terms

| Term | Meaning |
|---|---|
| Architecture scenario question | An exam question style presenting a realistic, ambiguous business situation requiring a justified recommendation, not a single recalled fact |
| Defensible recommendation | A recommendation explicitly traceable back to the scenario's own stated facts and constraints |

## Lab

Write your own exam-style scenario, in the style of the two worked examples above, combining at least two concepts from different chapters of this course (for example: multi-org strategy plus governance, or legacy constraints plus enterprise roadmaps). Then write out your own worked reasoning and defensible recommendation, following the same shape: name the ruling-out constraint, name the fitting concept, state the traceable recommendation.

## Check yourself

Can you explain, in your own words, what a System Architect-style exam scenario is actually testing, as distinct from a simple recall question? Can you walk through either worked scenario above from memory, including why the tempting alternative option was wrong?
