# Lesson 19 — Reference Data Governance

**Chapter 4 · Reference Data · Lesson 19 of 25**

## What you'll learn

- Why reference data needs its own governance process, separate from master data governance
- The reference data steward role, and what makes it different from a data owner
- What a reference data change request should contain before it's approved
- Centralized versus distributed reference data management, and the tradeoff between them

## Why reference data governance is its own discipline

Lesson 5 covered MDM governance broadly — roles, policy, stewardship over master data domains. Reference data needs the same seriousness, but the mechanics are different because the risk profile is different. A master data change (updating one customer's address) affects that one customer. A reference data change (redefining what status code "03" means) can silently affect every transaction system that stores "03" — which, as Lesson 17 established, is exactly why reference data's small size doesn't mean small risk.

Reference data governance, concretely, is the set of rules that decide: who can propose a change to a code list, who approves it, how the change gets communicated to every system that consumes that list, and how a mistake gets rolled back if one slips through.

## The reference data steward

A **reference data steward** is the role accountable for one or more code lists — not unlike a data owner for a master data domain (Foundations, Lesson 13), but narrower and more operational. Where a data owner answers "is this customer record correct," a reference data steward answers "is this code list internally consistent, synchronized with any external standard it tracks, and safe for every consuming system to use right now."

In practice, the steward is often someone close to the business process the list supports — a finance analyst for a chart-of-accounts code list, a logistics lead for a shipping-method code list — rather than a central data governance team member with no domain context. The central governance function (Foundations, Lesson 5) still sets the *process* every steward follows; the steward applies it to their specific list.

## What a change request needs

A reference data change shouldn't be a quick edit — it should go through a lightweight but real change request that documents: the specific code being added, deprecated, or modified; the business reason; which systems consume this code list and need to be notified; the effective date the change takes hold; and what happens to historical data already using the old value (Lesson 18's deprecation pattern, not deletion). Skipping any of these is how a reference data change becomes an incident instead of a routine update.

## Centralized vs. distributed management

Some organizations manage all reference data through one central repository and process — every code list, regardless of domain, goes through the same team and the same tooling. This maximizes consistency (one source of truth, one audit trail) but can become a bottleneck if that central team doesn't understand every domain's nuance.

Others distribute ownership — each business area governs its own code lists, following a shared process but without a single central gatekeeper. This scales better and keeps domain expertise close to the decision, but risks inconsistent rigor: one business area might follow the change-request process diligently while another treats it as optional. Most mature programs land on a hybrid: central tooling and a shared process, with distributed stewards who own the actual content decisions — the structure that, not coincidentally, echoes the hybrid MDM architecture style from Lesson 3.

## Key terms

| Term | Meaning |
|---|---|
| Reference data steward | The role accountable for a specific code list's accuracy, consistency, and safe use across systems |
| Change request | The documented proposal for adding, deprecating, or modifying a reference data value before it's approved |
| Centralized reference data management | One team and process governing every code list across the organization |
| Distributed reference data management | Each business area governs its own code lists under a shared process |

## Lab

Pick one reference data governance model from this lesson — centralized or distributed — and argue for it as the right fit for a mid-sized company with five business units that each use different core systems. Then argue the opposite case in two sentences. Which argument did you find more convincing, and why?

## Check yourself

What is the difference in scope between a reference data steward and a master data owner, and why does that difference matter for who typically fills each role?
