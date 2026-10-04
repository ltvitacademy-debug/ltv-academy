# Lesson 19 — Data Policies

**Chapter 4 · Policies and Standards · Lesson 19 of 30**

## What you'll learn

- What a data policy is, and the level it operates at (vision, not implementation detail)
- A real example of a data policy statement
- Who writes and approves policies, using Chapter 3's roles and committee structure
- How policy relates to the standards Lesson 20 covers next

## What a data policy actually is

A **data policy** provides high-level vision and direction for how an organization manages
data — it articulates how data should be ethically and legally collected, stored, accessed,
analyzed, and deleted. A policy answers "what is required and why," not "exactly how to
implement it." That second question belongs to a **standard**, which Lesson 20 covers in
full — policies and standards are a deliberate pair, not two words for the same thing.

## A real example

A data policy for a bank's customer data might read:

> "All customer financial information is highly confidential and may only be accessed on a
> need-to-know basis for legitimate business purposes."

Notice what this statement does and doesn't do. It states a clear rule and the reasoning
behind it (confidentiality, need-to-know access). It does **not** specify which encryption
algorithm to use, which system roles map to "legitimate business purposes," or what the
access request process looks like — those are standards, procedures, and technical controls
that implement the policy's intent.

## Who writes and approves a policy

This is where Chapter 3's structure does real work:

- **Data owners** typically propose policy for their domain, since they hold the business
  context and the Accountable role (Lesson 13)
- **Stewards** often draft the detailed language, since they do the day-to-day work the
  policy will govern (Lesson 14)
- **The governance committee** reviews and formally approves policy, especially anything that
  crosses more than one domain (Lesson 16)
- **The executive sponsor** backs policies that need organization-wide weight — particularly
  ones tied to regulatory obligations (Lesson 18, and Lesson 24's regulatory overview)

A policy that nobody with real authority formally approved isn't a policy — it's a
suggestion, and it will be treated as one the first time it's inconvenient.

## What makes a good policy statement

- **States the rule clearly** — no ambiguity about what's required
- **States the reasoning** — people follow rules they understand better than rules handed
  down without context
- **Stays implementation-agnostic** — a policy that mandates a specific tool or technique
  ages badly the moment that tool changes; let standards and procedures carry that detail
- **Names who it applies to** — a policy that doesn't say whose behavior it governs isn't
  enforceable (Lesson 23 covers enforcement directly)

## Policy and standard, working together

A data governance policy might include a standard specifying a list of trusted sources an
application is allowed to pull data from, or a policy might require sensitive data to meet
security criteria while a companion standard specifies the exact storage protections that
satisfy that criteria. Neither works well without the other: a policy with no standard is too
vague to implement consistently; a standard with no policy has no stated reason to exist.

## Key terms

| Term | Meaning |
|---|---|
| Data policy | High-level, implementation-agnostic statement of what is required and why |
| Policy approval | Formal sign-off, typically by the governance committee and/or sponsor |

## Lab

Write one real data policy statement (2–3 sentences) for a domain in your own organization,
following the structure above: state the rule, state the reasoning, stay implementation-
agnostic, and name who it applies to. Then note who — using Chapter 3's roles — would need to
approve it before it's real.

## Check yourself

Can you explain the difference between what belongs in a policy versus what belongs in a
standard, using the bank example above — and name who typically proposes, drafts, and
approves a policy?
