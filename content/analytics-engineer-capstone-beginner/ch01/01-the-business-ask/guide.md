# Lesson 1 — The Business Ask: One Trustworthy Customer List

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 1 of 10**

## What you'll learn

- Why "clean up the customer data" is never actually one task until you ask follow-up questions
- The four things every analytics-engineering request needs before you touch a keyboard: source, scope, grain, and definition of "correct"
- How to turn a frustrated hallway complaint into a one-paragraph requirement you could hand to anyone

## The ask

You're the analytics engineer at **Jaffle Shop**, a small but real sample e-commerce
business (the same one dbt Labs itself uses to teach analytics engineering — you'll
recognize `raw_customers`, `raw_orders`, and `raw_payments` from the dbt course earlier
in this catalog). The Ops Manager stops by on a Monday morning, visibly annoyed:

> "Our customer data is a mess. Finance has one spreadsheet, support has another, and
> nobody agrees on how many customers we actually have. I just want ONE list I can
> trust — can you make that happen?"

No ticket, no spec, no existing dbt project to extend yet. One stakeholder, one frustrated
sentence, and a real but vague problem. This is exactly how most real analytics-engineering
work starts — not as a fully scoped project, but as a complaint that sounds obvious and
isn't, yet.

## Why "one list I can trust" is a trap

"One list I can trust" is doing a lot of hiding in that sentence. If you start building
before asking anything, you'll guess wrong on at least one of these, and you won't find
out until the Ops Manager opens the result:

- **"Our customer data"** — where does it actually live right now? It turns out Jaffle
  Shop already has raw tables sitting in Snowflake — `raw_customers`, `raw_orders`,
  `raw_payments` — loaded by an earlier process. The complaint isn't "we have no data,"
  it's "nobody has turned the data we already have into something trustworthy."
- **"One list"** — one list of what, exactly? Every person who ever placed an order?
  Every row in `raw_customers`, even ones with no orders at all?
- **"I can trust"** — trust means something specific and checkable here: no duplicate
  customer IDs, no missing names. "Trust" isn't a feeling, it's a testable guarantee.
- **Scope** — is this request about customers only, or does it quietly also want order
  history and payment totals bundled in? (Spoiler: that's the Intermediate project. This
  one stays scoped to customers alone — see "What you're NOT building" below.)

None of these are hard questions. They're just questions nobody asked yet.

## Turning a vague complaint into a specific requirement

The skill this lesson teaches isn't SQL or dbt — it's **requirements clarification**,
and it's the single most valuable five minutes you'll spend on this whole project. A
short follow-up conversation gets you concrete answers:

- **Source**: the raw data already sitting in Snowflake as `raw_customers` — no new data
  collection needed, just real transformation work on what already exists.
- **Scope**: customers only, for this project. One clean, deduplicated, tested customer
  list — not orders, not payments, not revenue. (The Intermediate capstone picks up
  orders next.)
- **Grain**: one row per customer, keyed by a single, reliable customer ID.
- **Definition of "trust"**: two concrete guarantees — every customer has a non-null
  customer ID, and every customer ID is unique. These become real dbt tests in Lesson 7,
  not vague promises.
- **Audience and format**: a table other people at Jaffle Shop (finance, support) can
  query directly and get the same answer every time — not a one-off spreadsheet export.

Written down, the real ask becomes:

> *"Build a single, tested customer table in Snowflake, sourced from the existing
> `raw_customers` data, with one row per customer and a guaranteed non-null, unique
> customer ID — something finance and support can both query and get the same answer
> from."*

That one sentence is now something you could hand to a teammate and get the same result
back. That's the test for whether a requirement is actually specific.

## What you're NOT building

Scoping also means saying what's out of bounds. This beginner project does not need:

- Order history or payment totals joined in — that's the Intermediate capstone's job.
  This project stays at exactly one clean customer table.
- A full data warehouse or a multi-table mart — this is one dbt project with one staging
  model and one mart model, nothing more.
- Automated scheduling, CI/CD, or production deployment — those are real analytics-
  engineering concerns, just not this lesson's. Matching effort to the actual ask is part
  of professionalism, not a shortcut.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague request into a specific, answerable question before building anything |
| Scope | What is, and explicitly is not, included in the deliverable |
| Grain | The level of detail a table is built at — here, one row per customer |
| Data trust | A testable guarantee (non-null, unique), not a feeling — made concrete with real dbt tests later in this project |

## Lab

Before writing any code, write your own one-paragraph requirement statement for the
Jaffle Shop Ops Manager's ask, in your own words, covering: source, scope, grain, and what
"trustworthy" will concretely mean. Compare it against the example above — did you make
the same assumptions, or different ones? Either is fine, as long as you can defend the
choice if the stakeholder asks.

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the four questions you need
answered before writing a single model: what source, what scope, what grain, and what
"trustworthy" concretely means — and explain why a frustrated one-sentence complaint
almost never means "skip asking."
