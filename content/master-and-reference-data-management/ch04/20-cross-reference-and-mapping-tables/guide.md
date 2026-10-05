# Lesson 20 — Cross-Reference and Mapping Tables

**Chapter 4 · Reference Data · Lesson 20 of 25**

## What you'll learn

- Why different systems almost never agree on the same codes for the same concept
- What a cross-reference (mapping) table is, and the shape it takes
- Many-to-one and many-to-many mapping patterns, and why they're harder than they look
- What happens — and what should happen — when a value shows up with no mapping

## The problem: same concept, different codes

Two systems can both have a perfectly good, perfectly governed status code list (Lesson 18) for "order status," and still disagree completely about how to represent it. System A, an older order management platform, uses "01," "02," "03." System B, a newer CRM, uses "ACT," "PEND," "CLSD." Both lists are internally consistent. Neither is wrong. They simply weren't designed together — which is the normal state of affairs in any organization with more than one system of record, especially after a merger or an acquired company's systems get integrated.

Forcing one system to adopt the other's codes outright is sometimes possible, but often isn't — the "losing" system might have thousands of integrations and reports already built against its own codes. The practical answer is a **cross-reference table** (also called a mapping table): a table whose entire job is to translate between two (or more) code lists without requiring either one to change.

## What a cross-reference table looks like

A cross-reference table is structurally simple: for each pairing of systems, it holds the code from system A, the equivalent code from system B, and usually the date the mapping became effective (the same effective-dating idea from Lesson 18 applies here too). Below is an illustrative example mapping two systems' country codes — one using two-letter codes, the other using a legacy three-digit numeric scheme.

```
system_a_code   system_b_code   mapped_description   effective_from
US              840             United States         2018-01-01
GB              826             United Kingdom        2018-01-01
DE              276             Germany               2018-01-01
FR              250             France                2018-01-01
```

Any integration moving data between System A and System B looks up the incoming code in this table and translates it, rather than either system needing to know anything about the other's internal scheme.

## Many-to-one and many-to-many mappings

The simple case is **one-to-one**: each code in System A maps to exactly one code in System B. Real mappings are often messier. A **many-to-one** mapping happens when System A has a finer-grained code list than System B — three different "cancelled" sub-reasons in System A might all collapse into one generic "CANCELLED" in System B, because System B was never designed to capture that detail. That's a lossy mapping, and it should be documented as lossy, not treated as equivalent.

A **many-to-many** mapping is harder still: a code in System A could validly correspond to more than one code in System B depending on context (a product category code that splits differently depending on which region's catalog is being matched). These require more than a flat lookup table — often a set of mapping rules with conditions, reviewed carefully, because ambiguity here means two different consumers of the same mapping table could legitimately translate the same input differently.

## The unmapped value problem

The failure mode every cross-reference table eventually hits: a new code appears in System A that has no row in the mapping table yet — maybe System A added a new status and nobody updated the mapping. What happens next matters enormously. Silently passing the unmapped code through, or silently defaulting it to some generic value, hides the gap until a downstream report quietly produces wrong numbers. The better pattern is to make an unmapped value a loud, visible failure — an error, an alert to the reference data steward (Lesson 19) — so the mapping gets added deliberately instead of the gap persisting unnoticed.

## Key terms

| Term | Meaning |
|---|---|
| Cross-reference table | A table that translates codes between two or more systems' code lists without changing either one |
| One-to-one mapping | Each code in one system maps to exactly one equivalent code in another |
| Many-to-one mapping | Multiple distinct codes in one system collapse into a single, less granular code in another (a lossy mapping) |
| Unmapped value | A code with no corresponding row in a cross-reference table — should fail loudly, not pass silently |

## Lab

Think of two apps or systems you've used that both track the same kind of status (a to-do app and a project-management tool, for instance, both tracking "done" versus "not done" in their own way). Sketch a four-row cross-reference table mapping one system's status values to the other's, and identify whether your mapping is one-to-one or many-to-one.

## Check yourself

Explain why a many-to-one mapping is described as "lossy" in this lesson, and why that should be documented explicitly rather than treated as if the two code lists were fully equivalent.
