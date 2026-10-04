# Lesson 25 — Assessing Governance Readiness

**Chapter 5 · Getting Started · Lesson 25 of 30**

## What you'll learn

- Why you assess *before* you design a program, not after
- Six concrete dimensions a readiness assessment actually looks at
- Who needs to be in the room for the assessment to mean anything
- How to turn the assessment into a prioritized gap list instead of a
  pile of observations

## Why assess before you build

Chapter 2 covered maturity models — the DAMA-DMBOK view and Gartner's
five-level scale (Aware, Reactive, Proactive, Managed, Optimized) that
describe *where an organization sits* on a governance continuum.
A readiness assessment is the practical, close-up companion to that
model: it's the structured exercise that actually tells you *where
your organization sits right now*, before you pick an operating model
(Chapter 2), staff roles (Chapter 3), or write a single policy
(Chapter 4).

Skipping this step is the single most common reason governance
programs stall in year one. A team buys a data catalog, writes a
charter, and announces a council — and six months later nothing has
changed, because nobody checked whether there was executive
sponsorship, whether anyone had capacity to own the work, or whether
the business even agreed data quality was a problem worth solving.
Technology was never the gap. Readiness was.

## Six dimensions worth actually assessing

A readiness assessment isn't a single survey question ("are we
ready?") — it's a structured look across several independent
dimensions, because an organization can be strong in one and weak in
another.

1. **Current data practices** — do people already know who owns key
   data, or does every analysis start with "where do I even get the
   real number"?
2. **Executive sponsorship** — is there a named leader who will spend
   political capital on this (Lesson 18), or just general enthusiasm?
3. **Organizational structure** — do stewardship-shaped roles already
   exist informally (the person everyone calls about customer data),
   or would owners and stewards (Chapter 3) need to be invented from
   scratch?
4. **Existing policy and standards** — is there *anything* written
   down (even an outdated wiki page), or a completely blank slate
   (Chapter 4)?
5. **Technology and tooling** — what's already in place for cataloging,
   access control, and quality monitoring, and what would a program
   actually need?
6. **Regulatory and risk pressure** — is there a compliance deadline or
   recent incident creating urgency, or is this purely proactive?

Rate each dimension independently — Low / Medium / High is usually
enough resolution. An organization can be High on regulatory pressure
and Low on everything else; that combination tells you something very
different than High sponsorship and Low pressure does.

## Who needs to be in the room

A readiness assessment run entirely by IT produces a technology
inventory, not a readiness assessment. The dimensions above are
mostly about people and process, so the inputs have to come from
people who aren't in the data team:

- The prospective **executive sponsor** (or whoever would become one)
- A handful of **business data owners** — finance, sales, operations —
  who can speak to real pain points, not hypothetical ones
- **IT and data engineering**, for the technology-and-tooling dimension
- **Compliance or legal**, for the regulatory-pressure dimension
- A few **frontline data consumers** — the people who'll notice
  immediately if nothing actually changes

Fifteen minutes with each of these groups, asking "where do you go
today for a trusted answer, and what happens when that's wrong,"
surfaces more real signal than a formal survey circulated by email.

## From observations to a gap list

The assessment only pays for itself if it produces something
actionable. The standard output is a simple gap list: each dimension,
its current rating, the rating a credible first program needs, and
one line describing the gap. That list becomes the direct input to
Lesson 26's business case — the gaps *are* the justification — and to
Lesson 27's pilot selection, since the pilot usually targets the
dimension where the gap is smallest and the pain is highest.

## Common readiness traps

- **Mistaking tooling for readiness.** A shiny catalog tool doesn't
  create sponsorship or fix broken ownership.
- **Skipping business engagement.** An assessment that never leaves
  the IT org will always rate "current practices" more generously
  than the business actually experiences them.
- **Treating it as a one-time event.** Readiness changes — reassess
  after a leadership change, a merger, or a new regulation; don't
  treat the first assessment as permanent.

## Key terms

| Term | Meaning |
|---|---|
| Readiness assessment | A structured check of an organization's current state across governance-relevant dimensions, done before designing a program |
| Gap list | The prioritized output of an assessment — current state, target state, and the gap, per dimension |
| Readiness dimension | One independently-rated area of the assessment (sponsorship, practices, structure, policy, technology, regulatory pressure) |

## Lab

Pick the six dimensions above and rate your own organization (or a
team/department you know well) Low / Medium / High on each, in one
sentence per dimension explaining the rating. Then write one more
sentence naming the single dimension with the biggest gap between
where you are and where a credible first governance effort would need
you to be. Keep the whole exercise to one page — the discipline of
forcing a one-line justification per dimension is the actual skill,
not the length of the writeup.

## Check yourself

You're ready for Lesson 26 when you can list the six readiness
dimensions from memory, explain why a technology-only assessment
misses the point, and describe what a "gap list" is used for next.
