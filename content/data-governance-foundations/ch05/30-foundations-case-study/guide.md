# Lesson 30 — Foundations Case Study

**Chapter 5 · Getting Started · Lesson 30 of 30**

## What you'll learn

- How every chapter of this course fits together on one timeline, not
  as five separate topics
- A worked walkthrough of a fictional company applying the full
  sequence — readiness, business case, pilot, roadmap, communication
- The synthesis exercise this lesson ends on: applying the same
  sequence to a scenario of your own
- Where the Data Governance career path goes from here

**A note before we start:** everything that follows about "Meridian
Fulfillment Co." is a fictional, illustrative company invented for
this lesson. It is not a real business, and nothing in it is a real
case study — it exists only to show how the pieces of this course fit
together in sequence.

## The company

Meridian Fulfillment Co. is a fictional mid-size logistics and
e-commerce fulfillment company — a few hundred employees, a handful
of warehouses, and a customer-facing ordering platform. Three
operations leaders have, independently, raised the same complaint in
the last quarter: shipments are going to the wrong address often
enough that it's showing up in customer complaints, and nobody can
agree on which system holds the "real" customer address.

That single, concrete pain point is the thread this walkthrough
follows through every chapter of this course.

## Chapter 1 — naming what's actually happening

Chapter 1 distinguished data governance from data management and data
quality, and it named the cost of poor data in general terms —
rework, bad decisions, risk. At Meridian, the wrong-address problem is
a data quality symptom with a governance root cause: three systems
(the e-commerce platform, the CRM, and the warehouse management
system) each hold a "customer address" field, nobody owns the
question of which one is authoritative, and no standard exists for
how an address gets corrected once a customer reports one wrong. This
is a governance drivers situation in Lesson 5's sense — trust and
operational cost, not yet a compliance mandate.

## Chapter 2 — picking a shape, not a label

Meridian doesn't need to adopt DAMA-DMBOK wholesale on day one (Lesson
7) or write a maturity-model self-assessment longer than the problem
itself. What it needs, per Lesson 12, is an operating-model decision:
centralized enough that one group can actually declare which system
wins when the three addresses disagree, federated enough that each
business unit keeps day-to-day stewardship of its own data. A
lightweight federated model, not a fully centralized governance
office, fits a few-hundred-person company with one concrete problem
to solve.

## Chapter 3 — naming actual people

Chapter 3's roles stop being abstract the moment there's a real
problem to assign them to:

- A **data owner** for customer address data — the operations director
  whose team already fields the complaints, given formal accountability
  (Lesson 13)
- A **data steward** — a senior CRM analyst who already unofficially
  knows which records are suspect, now given the role on paper
  (Lesson 14)
- A **RACI** (Lesson 17) that says explicitly: the steward is
  Responsible for flagging mismatches, the owner is Accountable for
  deciding the authoritative source, warehouse and e-commerce teams
  are Consulted, and customer support is kept Informed when a record
  changes
- An **executive sponsor** — the VP of Operations, who raised the
  complaint pattern to leadership in the first place (Lesson 18)

## Chapter 4 — one real policy, not a library

Meridian does not need the full regulatory-landscape treatment from
Lesson 24 for this problem — there's no specific regulation driving
it. What it needs is one data policy (Lesson 19) naming the CRM as the
authoritative source for customer address, one data standard (Lesson
20) defining what a "valid" address record requires, and a short
policy-enforcement step (Lesson 23): the e-commerce platform and
warehouse system sync from the CRM nightly instead of each maintaining
their own independent copy.

## Chapter 5 — the sequence this chapter actually teaches

This is where the chapter you just finished does its work, in order:

1. **Readiness (Lesson 25).** A quick assessment shows Meridian is
   High on pain (everyone feels this) and High on sponsorship (a VP
   already cares), but Low on existing policy and Low on tooling —
   a realistic, mixed profile, not uniformly ready or unready.
2. **Business case (Lesson 26).** The steward and owner draft a
   one-page case: the problem (misdelivered shipments and the
   complaint volume they generate), the scope (just customer address,
   just this quarter), the resources (the steward's time, no new
   tooling budget), and the anticipated value (a target reduction in
   address-related complaint tickets, tracked monthly).
3. **Pilot (Lesson 27).** Customer address data is the pilot domain —
   high value (it's costing real complaints), high pain (everyone
   already feels it), high feasibility (three systems, not thirty).
   Baseline: current monthly count of address-related complaints.
   Ninety-day window. Owner: the operations director.
4. **Roadmap (Lesson 28).** The pilot is Days 61-90 of a roadmap whose
   first sixty days were discovery and foundation — naming the owner
   and steward, writing the one policy. Months 3-6 would expand the
   same model to a second problem (say, product-return reason codes)
   only if the pilot's numbers justify it.
5. **Communication (Lesson 29).** The VP sponsor announces the pilot
   in a short note to the warehouse and e-commerce teams, framed as
   enabler, not constraint: "this is how we stop shipping to the wrong
   address" — not "here's a new policy you have to follow." Office
   hours run through the steward, not a company-wide town hall; this
   is a small, targeted pilot, not a program announcement.

## How this scenario would actually be judged

At the ninety-day mark, Meridian's scale-or-stop decision looks at one
number: did address-related complaints actually drop against the
baseline. If yes, the same five-step sequence — readiness read into a
business case, scoped into a pilot, sequenced into a roadmap,
announced with the right framing — repeats for the next domain. If
not, the team revisits which step broke down before trying again.
Nothing about the sequence changes; only the domain does.

## Key terms

| Term | Meaning |
|---|---|
| Synthesis | Applying every chapter's concepts together, in sequence, to one real (or realistic) problem, rather than studying each in isolation |
| Authoritative source | The one system or record formally designated as the "true" version when multiple copies disagree |
| Fictional scenario | An invented company or situation used for teaching, explicitly labeled as not real — never presented as an actual case study |

## Lab — the course-closing synthesis exercise

Invent your own clearly fictional company (name it something obviously
illustrative, the way this lesson used "Meridian Fulfillment Co.") —
or reuse Meridian if you'd rather work from the example. Write a
one-page synthesis, one short paragraph per chapter, same structure as
this lesson:

1. **Chapter 1** — name one specific data problem and its cost in
   business terms (not "bad data," something concrete)
2. **Chapter 2** — pick one operating model shape and say why it fits
   this company's size and problem
3. **Chapter 3** — name the owner, steward, and sponsor roles with
   actual (invented) titles, plus one RACI line
4. **Chapter 4** — name one policy and one standard that would
   actually fix the problem
5. **Chapter 5** — run the full sequence: a readiness rating, a
   one-paragraph business case, a scoped pilot with a baseline metric,
   where it sits on a roadmap, and how it gets communicated

Label the whole thing clearly as a fictional, illustrative exercise —
the same way this lesson did.

## Check yourself

You've finished Data Governance Foundations when you can take any
unfamiliar data problem — real or invented — and walk it through this
same five-chapter sequence without needing to look anything up:
what's actually going on, what shape of governance fits, who owns it,
what rule fixes it, and how you'd actually get it funded, piloted,
and heard.

---

**Congratulations — you've completed Data Governance Foundations.**
You now have the full vocabulary and sequence this course set out to
teach: what governance is and isn't, the frameworks and operating
models to choose from, the roles that make it real, the policies that
enforce it, and the practical playbook for actually getting a program
off the ground. The next course in the Data Governance career path is
**Data Quality Management** — where the "quality" side of the
governance-vs-management-vs-quality distinction from Lesson 3 gets
its own full treatment: measuring it, fixing it, and keeping it fixed.
