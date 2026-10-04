# Lesson 20 — Data Standards

**Chapter 4 · Policies and Standards · Lesson 20 of 30**

## What you'll learn

- What a data standard is, and how it differs from the policy Lesson 19 covered
- A real example of a data standard
- The main categories of thing a standard typically specifies
- Why standards, not policies, are where most day-to-day governance friction actually lives

## What a data standard actually is

A **data standard** offers the technical detail for executing a policy effectively. Where a
policy states *what* is required and *why*, a standard defines the specific, concrete rules
that make that requirement consistently achievable: exact formats, structures, terminologies,
and quality thresholds.

## A real example

Following directly from Lesson 19's example policy ("customer financial information is
confidential, need-to-know access only"), a companion standard might state:

> "All customer account numbers must be 10 digits, starting with two letters identifying the
> region."

That standard doesn't restate *why* account numbers need structure — the policy already
covered that. It specifies the one concrete rule that makes account numbers interoperable,
checkable, and consistent across every system that touches them.

## What standards typically cover

1. **Format standards** — exact structure for a field (date formats, ID formats, phone
   number formats)
2. **Terminology standards** — the approved term for a concept, so "customer," "client," and
   "account holder" aren't all floating around meaning slightly different things (Lesson 21
   goes deep on this)
3. **Quality standards** — the specific threshold a dataset must meet (e.g., "no more than
   0.5% of records may have a missing required field")
4. **Security standards** — the specific technical control that satisfies a policy's security
   requirement (e.g., which encryption standard, which access control model)

## Standards and policies, working together

Neither works well alone. A data governance policy might point to a standard specifying a
list of trusted data sources an application is allowed to use — the policy sets the "why
trust matters," the standard makes "trusted" checkable. Or a policy might require sensitive
data to meet certain security criteria, while a companion standard specifies exactly what
protection satisfies that criteria. A policy with no standard is too vague to apply
consistently across teams; a standard with no policy has no stated reason to exist and will
be the first thing cut when it's inconvenient.

## Where the friction actually lives

In practice, most of the day-to-day arguments inside a governance program aren't about
policy — almost nobody disputes "customer data should be confidential." They're about
standards: whose date format wins when two systems disagree, what the *exact* quality
threshold should be, which team's naming convention becomes the organization's. That's not a
flaw in the standard-setting process — it's exactly what stewards and the governance
committee (Chapter 3) exist to work through, because these are real, consequential decisions
dressed up as small technical ones.

## Key terms

| Term | Meaning |
|---|---|
| Data standard | Concrete, technical specification that implements a policy's requirement |
| Format standard | Exact structure required for a field or value |
| Quality standard | Specific measurable threshold data must meet |

## Lab

Take the policy statement you wrote in Lesson 19's lab. Write one companion standard for it —
a concrete, checkable rule (a format, a threshold, or a specific control) that would let
someone actually verify whether the policy is being followed in practice.

## Check yourself

Can you explain, in your own words, why "customer account numbers must be 10 digits starting
with two region letters" is a standard and not a policy — and name the four typical
categories of thing a standard specifies?
