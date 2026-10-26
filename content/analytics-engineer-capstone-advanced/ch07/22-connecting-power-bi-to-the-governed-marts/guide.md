# Lesson 22 — Connecting Power BI to the Governed Marts

**Chapter 7 · The Power BI Layer, Incident, and Wrap-Up · Lesson 22 of 26**

## What you'll learn

- Why Power BI connects to Snowflake's `PROD` schema specifically —
  never `RAW`, never `DEV`
- The real connection settings: the `ANALYST` role and
  `reporting_wh` warehouse from Chapter 2, used here for the first
  time
- Why this one connection-string decision is itself a governance
  control, not an afterthought
- What a business user actually sees once this is wired up

## The connection, as a deliberate choice

Opening Power BI Desktop's **Get Data → Snowflake** connector, the
real settings this platform uses are:

| Setting | Value |
|---|---|
| Server | The Snowflake account identifier |
| Warehouse | `reporting_wh` (Lesson 3 — never `transforming_wh`) |
| Database | `jaffle_shop_db` |
| Schema | `prod` (Lesson 5 — never `raw`, never `dev`) |
| Role | `analyst` (Lesson 3 — read-only) |

Every one of these five values was decided back in Chapter 2, before
a single Power BI report existed. This lesson doesn't introduce new
Snowflake objects — it's where the roles and schemas already built get
used for the first time by an actual BI tool.

## Why PROD, specifically

`PROD` contains only `customers` and `orders` — the two marts that
have already passed every test from Chapter 4 and the CI gate from
Chapter 6. Connecting to `DEV` instead would mean a business user
could see a developer's half-finished, untested model mid-edit.
Connecting to `RAW` would mean exposing unprocessed source data with
none of the renaming, type-fixing, or business logic this whole
capstone built. `PROD` is the only schema where "what Power BI shows"
and "what's been verified" are guaranteed to be the same thing.

## Why ANALYST, specifically

The `analyst` role (Chapter 2) can `SELECT` from `prod` and nothing
else — it cannot write to any schema, cannot see `raw` or `dev`, and
runs on its own warehouse (`reporting_wh`) so a Power BI refresh never
competes with a `dbt build` for compute. If Power BI's credentials
were ever compromised, the blast radius is "read access to two
already-verified marts" — not "write access to the whole platform."

## What a business user actually sees

Once connected, `customers` and `orders` show up in Power BI's field
list exactly like any other table — a business user building a
visual doesn't see (or need to see) any of Chapters 2 through 6. The
governance is invisible from inside Power BI, which is the entire
point: the complexity lives in the platform, not in the report author's
daily workflow.

## Tying this back to the five-layer architecture

Lesson 2 planned Power BI as Layer 5, deliberately last, depending on
everything below it. This lesson is where that dependency becomes
real: Power BI's connection is only meaningful because `PROD` (Layer
1), the marts (Layer 2), and the CI gate guaranteeing their
correctness (Layer 4) already exist.

## Key terms

| Term | Meaning |
|---|---|
| `reporting_wh` | The warehouse Power BI and analysts use, isolated from dbt's build compute |
| `analyst` role | Read-only on `prod` — Power BI's actual connection identity |
| Connection-string governance | Restricting which schema a BI tool can even see as a deliberate control, not an afterthought |

## Lab

1. Write out the five real connection settings Power BI uses to
   connect to this platform, and where each one was originally decided.
2. Explain, in one sentence each, why `PROD` and not `DEV`, and why
   `analyst` and not `transformer`.
3. Describe what a compromised Power BI credential could and couldn't
   do under this setup.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking
anything up, why Power BI's connection settings were actually decided
back in Chapter 2 — not in this lesson.
