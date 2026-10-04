# Lesson 23 — Policy Enforcement

**Chapter 4 · Policies and Standards · Lesson 23 of 30**

## What you'll learn

- Why an unenforced policy is functionally a suggestion
- The difference between organizational and technical enforcement mechanisms
- What "policy-as-code" means, in plain terms
- Why audit trails matter even when enforcement is working perfectly

## The gap between written and real

A policy that's drafted, reviewed, approved, and published (Lesson 22's full lifecycle) still
hasn't actually changed anyone's behavior until it's enforced. Enforcement is the set of
mechanisms — organizational and technical — that make sure a policy's rule is what actually
happens, not just what's written down. Without it, a policy is a statement of intent that
competes with whatever's more convenient in the moment, and convenience usually wins.

## Organizational enforcement

Some enforcement is procedural, not technical:

- **Training and acknowledgment** — people are told the rule and formally confirm they've
  read it
- **Manager accountability** — a data owner's performance includes whether their domain
  follows the policies they're accountable for
- **Audits and spot checks** — periodic human review of whether practice matches the policy
- **Escalation paths** — a clear route (back to Chapter 3's committee) for reporting and
  resolving violations

Organizational enforcement is necessary but, on its own, inconsistent — it depends on people
remembering to check, and on checks actually happening on schedule rather than slipping.

## Technical enforcement

Modern data governance increasingly backs policy with automated, technical controls that
apply the rule at the point data is actually touched, rather than relying only on someone
noticing after the fact:

- **Access control (RBAC/ABAC)** — role-based or attribute-based rules that block
  unauthorized access automatically, rather than relying on someone remembering to check
- **Automated classification** — rules or models that tag sensitive data (so a policy like
  "customer financial data is confidential" has something that actually marks which fields
  that applies to)
- **Real-time monitoring and alerts** — dashboards and automated alerts that flag a policy
  violation as it happens
- **Audit trails** — an immutable log of who accessed or changed what, so enforcement is
  verifiable after the fact, not just assumed

## Policy-as-code

A term worth recognizing: **policy-as-code** means writing governance rules as executable
logic embedded directly into data pipelines, rather than as a document someone has to
separately remember to consult. Instead of a policy saying "only approved systems may read
this table" and hoping every engineer remembers to check, a policy-as-code control blocks the
unapproved read attempt automatically, the moment it's tried. This is the same underlying
idea as software "tests" or "guardrails" — turning a rule into something the system itself
checks, not something that depends entirely on human memory.

## Why audit trails matter even when everything's working

It's tempting to think an audit trail only matters when something goes wrong. In practice,
tamper-proof logs of enforcement actions matter continuously — satisfying regulatory
requirements (Lesson 24 covers several that specifically require this), proving compliance
during an audit, and letting a steward investigate a data quality issue by actually seeing
what happened rather than guessing.

## Key terms

| Term | Meaning |
|---|---|
| Enforcement | Mechanisms that make a policy's rule actually happen, not just stated |
| Policy-as-code | Governance rules written as executable logic inside data pipelines |
| Audit trail | Immutable log of enforcement actions, verifiable after the fact |

## Lab

Take the policy you drafted in Lesson 19's lab. Write one paragraph proposing: one
organizational enforcement mechanism and one technical enforcement mechanism that, together,
would make that policy more than just a document people are supposed to remember.

## Check yourself

Can you explain why a policy with no enforcement mechanism is "functionally a suggestion" —
and describe, in your own words, what policy-as-code means?
