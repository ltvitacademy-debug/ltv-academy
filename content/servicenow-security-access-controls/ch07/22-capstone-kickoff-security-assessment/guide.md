# Lesson 22 — Capstone Kickoff: Security Assessment

**Chapter 7 · Capstone: Securing a Real Instance · Lesson 22 of 24**

## What you'll learn

- The organization this three-lesson capstone follows: a regional bank's ServiceNow instance with four years of accumulated security debt
- How to run a real security assessment — naming each gap as a specific finding, not a vague impression
- How role sprawl actually looks on a live instance, and why it's a Chapter 1 finding, not just clutter
- Why inconsistent field-level ACLs on similarly sensitive fields is a Chapter 2 finding with real evidence
- Why "local accounts only" next to an enterprise SSO standard is a Chapter 3 finding, not a convenience

## The organization: Meridian Trust Bank

Meridian Trust Bank is a mid-sized regional bank — roughly 40 branches, 1,800 employees, a ServiceNow instance that went live four years ago to run IT service management and has since grown to cover HR case management and a handful of custom banking-operations apps. Nobody has done a full security review of that instance since it launched. New roles, new ACLs, and new integrations have been added one request at a time, by different admins, under deadline pressure, with no one looking at the instance as a whole. That's not a hypothetical — it's the single most common state a working ServiceNow security architect walks into on a new engagement, and it's exactly the instance this capstone assesses, redesigns, and documents across these three lessons.

An assessment isn't a vague "this seems insecure" impression. It's a list of specific, named findings, each one tied to a concrete platform mechanism and the course chapter that explains why it's wrong. That discipline — citing the mechanism, not just the symptom — is what turns an assessment into something an engineering team can actually act on. Below are the first four findings from Meridian's instance, pulled from a real walk-through of its roles, ACLs, and authentication configuration.

## Finding 1 — Role sprawl (Chapter 1: Roles, Contains Roles & Role Design)

Querying `sys_user_role` turns up 162 custom roles on an instance with 1,800 users — roughly one custom role for every eleven users, when a well-designed instance this size should need a few dozen at most. Digging into how they were created tells the real story: `itil_l2_temp`, `itil_l2_temp_v2`, and `incident_approver_backup` are three separate roles doing nearly the same job, each created by a different admin solving the same request without checking whether a role already existed. None of them use `contains_roles` to inherit from a shared base role — each was built from scratch, so when the bank's access-review policy changed last year, three separate roles had to be hand-edited instead of one parent role.

The access-review angle matters more than the clutter. A quarterly access review that's supposed to confirm "does this person still need this access" is unreadable when one person holds nine or ten functionally overlapping roles. The reviewer can't tell which role is actually load-bearing, so the review becomes a rubber stamp — exactly the role-design failure this course's Chapter 1 named directly: role sprawl doesn't just look messy, it quietly defeats the access reviews meant to catch inappropriate access in the first place.

## Finding 2 — Inconsistent field-level ACLs on sensitive fields (Chapter 2: Field-Level Security Design Patterns)

Meridian's `customer` table holds two comparably sensitive fields — `ssn` and `annual_income` — protected by two completely different ACL patterns, written by two different admins at two different times:

```javascript
// ACL: table = customer, field = ssn, operation = read
// Written by Admin A, 2023 — scripted condition, checks a specific role
answer = gs.hasRole('customer_pii_view');
```

```javascript
// ACL: table = customer, field = annual_income, operation = read
// Written by Admin B, 2024 — role-only ACL, no script at all,
// "requires role" set directly to itil with no scripted check
// (no scripted condition exists for this ACL at all)
```

Both fields are sensitive financial data on the same table, but one is gated by a dedicated, purpose-built role checked in a script, and the other is gated by the generic `itil` role that over a thousand employees already hold — meaning any service desk agent can read a customer's annual income with no additional access decision ever made. This is precisely the design-pattern failure Chapter 2 warned about: field-level security that isn't driven by a consistent, table-wide pattern produces exactly this outcome, where the sensitivity of the data has no relationship to the strength of the control protecting it. A later audit finds the gap only by comparing fields side by side — which almost never happens until an assessment like this one forces it.

## Finding 3 — Local authentication only, despite an enterprise SSO standard (Chapter 3: Local vs. SSO Authentication)

Meridian's broader IT organization standardized on Okta as its enterprise identity provider three years ago, with SAML-based SSO and mandatory multi-factor authentication enforced for every other line-of-business application — email, the HR system, the loan-origination platform. ServiceNow was never migrated. All 1,800 users still authenticate with local ServiceNow usernames and passwords, set through the platform's own password policy, with no MFA step at all. That's a direct contradiction of the bank's own authentication standard, and it means the one instance holding privileged IT, security, and HR case data is the one application still relying on the weakest authentication path available on the platform — exactly the local-vs-SSO gap this course's Chapter 3 distinguished in detail: local accounts remain a real, usable authentication path on ServiceNow even after SSO is configured elsewhere, and "elsewhere" doesn't help an instance that was never pointed at it.

## Finding 4 — No formal audit logging on sensitive fields (Chapter 6: Audit Logging & Change Tracking)

Neither `ssn` nor `annual_income` on the `customer` table has the `Audit` flag enabled in its dictionary entry, so neither field's read or write history is captured in `sys_audit` at all. If a customer disputes a change to their income record, or a regulator asks who accessed SSNs in a given quarter, Meridian has no record to produce — not because the data wasn't accessed, but because nothing was ever configured to log it. Combined with Finding 2's weak ACL on `annual_income`, this is the worst pairing possible: a sensitive field that's both under-protected and unmonitored, exactly the gap Chapter 6 covered as the second half of a real security posture — a correct ACL answers "who could read this," but only audit logging answers "who actually did," and Meridian currently cannot answer either question for its most sensitive customer data.

## Key terms

| Term | Meaning |
|---|---|
| Role sprawl | Many overlapping, undocumented roles accumulating over time, each solving one request instead of reusing or extending an existing role |
| Field-level security design pattern | A consistent approach to protecting similarly sensitive fields, so sensitivity and control strength actually match |
| Authentication debt | A gap between an organization's stated authentication standard (e.g. enterprise SSO + MFA) and what a specific instance actually enforces |
| Audit flag | The dictionary-level setting that makes a field's read/write history get recorded in `sys_audit` |

## Check yourself

Before moving to Lesson 23, write down, in your own words, all four findings above as a security architect would present them to Meridian's CIO: one sentence per finding, naming the specific mechanism (role, ACL, authentication method, or audit setting) and which course chapter explains why it's a real risk — not just that something "looks off."
