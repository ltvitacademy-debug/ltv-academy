# Lesson 31 — Working With Data Teams as a Governance Analyst

**Chapter 2 · Career Preparation · Lesson 31 of 35**

## What you'll learn

- Who a governance analyst actually works with day to day, beyond the
  job title's own team
- What collaboration with data owners and data stewards looks like in
  practice, versus the formal definitions from earlier in this path
- What collaboration with data engineers, analysts, and BI developers
  looks like, and where governance work ends and their work begins
- A few habits that make a governance analyst someone data teams want
  to work with, rather than someone they route around

## The role sits in the middle, by design

A governance analyst rarely builds the pipeline, owns the business
process, or writes the report. What the role does is coordinate across
the people who do — translating policy into something concrete enough
for a data owner to approve, an engineer to implement, and an analyst
to trust. That middle position is the job, not a sign you're not doing
"real" technical work. It only works well if you understand what each
of these other roles actually needs from you.

## Working with data owners and data stewards

Earlier courses in this path defined data owners (accountable for a
domain) and data stewards (responsible for day-to-day data quality and
definitions) formally. In practice, working with them day to day looks
like:

- **Bringing them a specific decision, not an open question.** "Should
  `CustomerStatus` include a 'Dormant' value, or is that covered by
  'Inactive'?" gets answered faster than "can you review our customer
  status values?"
- **Respecting that they have a full-time job that isn't governance.**
  A data owner is usually a business leader first — scheduling a
  30-minute review, not a recurring hour-long meeting, respects that.
- **Following up in writing after a verbal decision.** A quick email
  or glossary-tool comment confirming "per our conversation, X means
  Y, approved by [owner] on [date]" protects everyone, including the
  owner, if the decision gets questioned later.

## Working with data engineers

Data engineers implement the pipelines and systems governance policy
depends on. The collaboration that works well treats them as
implementation partners, not as a compliance checklist to hand off to:

- **Give them the "why," not just the "what."** "This field needs
  row-level masking because it's classified as restricted PII" lands
  better than "mask this field" with no context — an engineer who
  understands the reason makes better implementation calls when edge
  cases come up.
- **Ask what's actually feasible before finalizing a policy.** A
  retention policy that assumes a capability the current pipeline
  doesn't have yet isn't a policy — it's a wish. Check feasibility
  with engineering before publishing a rule you can't yet enforce.
- **Don't treat a failed data quality check as a blame exercise.**
  Engineers are more likely to flag issues early if raising one
  doesn't trigger a hunt for who to blame.

## Working with analysts and BI developers

Analysts and BI developers are often the people most directly affected
by governance decisions, because they're the ones answering business
questions with the data every day:

- **Explain classification and access rules in terms of what they can
  and can't do**, not just the policy's name — "you can query this
  table, but exports are blocked because it's classified confidential"
  is actionable; "this is Tier 2 data" on its own is not.
- **Ask them where the glossary and reality disagree.** Analysts
  often know first when a business definition has quietly drifted from
  how a term is actually used in a live report — that's valuable
  signal for the glossary curation this path's earlier courses
  covered.

## Habits that make the collaboration work

- **Be the person who makes other people's jobs easier**, not the
  person who adds a review step with no visible value. A governance
  gate that clearly prevents a real problem gets respected; one that
  feels like pure process gets worked around.
- **Show up with context already gathered.** Asking a data owner a
  question you could have answered yourself from the data dictionary
  wastes their time and your credibility.
- **Default to explaining the reasoning, not just the rule.** People
  comply with rules they understand far more consistently than rules
  handed down without explanation.

## Key terms

| Term | Meaning |
|---|---|
| Data owner | The accountable business leader for a data domain — typically a decision-maker, not a full-time governance role |
| Data steward | The role responsible for day-to-day data quality and definitions within a domain |
| Implementation partner | The framing this lesson recommends for working with engineers — collaborators, not a compliance checklist recipient |

## Lab

Think of (or imagine) one governance decision — a classification call,
a glossary definition, an access rule. Write three short messages
communicating it: one to the data owner (framed as a specific
decision), one to a data engineer who'd implement it (including the
"why"), and one to an analyst affected by it (framed as what they can
and can't do). Notice how differently each one reads even though the
underlying decision is identical.

## Check yourself

You're ready for Lesson 32 when you can describe, in your own words,
what a governance analyst needs from a data owner, a data engineer,
and an analyst/BI developer respectively, and explain why "being easy
to work with" is itself a governance skill, not a soft add-on to it.
