# Lesson 2 — Planning the Architecture

**Chapter 1 · Scoping the Production Analytics Platform · Lesson 2 of 26**

## What you'll learn

- The five-layer architecture this entire capstone builds, in order
- What each layer's one job is, and what it explicitly does *not* do
- How data and trust flow from raw CSVs all the way to a Power BI
  report, and where each governance control sits in that flow
- Why the order of these layers isn't arbitrary — each one depends on
  the one before it existing first

## The five-layer architecture

Jaffle Shop's governed platform is five layers, stacked in a specific
order, each one depending on the last:

```
1. Snowflake (warehouses, roles, RAW/DEV/PROD schemas)
2. dbt (staging -> intermediate -> marts, snapshots, tests, docs)
3. Python ingestion (new raw source -> Snowflake, on a schedule)
4. CI/CD (GitHub Actions: dbt build gates every pull request)
5. Power BI (connects to PROD marts only)
```

This isn't a random list — it's the order things actually have to
exist in for the next layer to have something to stand on.

## Layer 1 — Snowflake: where everything lives and who can touch it

Snowflake is the warehouse platform itself: compute (warehouses),
storage (databases/schemas/tables), and access control (roles). Before
a single dbt model runs, this capstone needs a `TRANSFORMER` role dbt
runs as, an `ANALYST` role Power BI connects as, and a `RAW` schema to
land data in. Chapter 2 builds this.

## Layer 2 — dbt: where raw data becomes trusted marts

dbt reads from `RAW`, builds staging models on top of `source()`,
intermediate and mart models on top of `ref()`, a snapshot tracking
customer status changes over time, and governs itself with tests and
generated documentation. This is the layer most of this capstone's
teaching time goes into, because it's where "ad hoc SQL" actually turns
into "a governed platform" — Chapters 3 and 4.

## Layer 3 — Python: the one gap dbt can't close by itself

dbt transforms data that's already in Snowflake. It doesn't *load* a
one-off CSV from an external system that has no native Snowflake
connector. That's a real, separate job — a Python script using
`pandas` to read and clean the file and `snowflake-connector-python` to
load it, run on a schedule. Chapter 5.

## Layer 4 — CI/CD: the gate between a laptop and production

Every layer above produces changes someone will eventually want to
merge: a new dbt model, a new test, a tweak to the Python script. CI/CD
is the layer that makes sure `dbt build` — models and tests together —
passes before any of those changes reach the `main` branch, using the
exact `profiles.yml`-via-`env_var()` pattern this path's own
Git/CI-CD course already taught. Chapter 6.

## Layer 5 — Power BI: the layer business users actually see

Power BI never touches `RAW` and never touches a developer's personal
`DEV` schema — it connects only to `PROD`'s marts, the ones that have
already passed every test in Chapter 4 and every CI check in Chapter
6. That one connection-string decision is itself a governance control,
not an afterthought. Chapter 7.

## Why the order matters

Each layer is load-bearing for the one after it:

| Layer | Depends on |
|---|---|
| dbt | A role to run as, and a schema to read from (Snowflake) |
| Python ingestion | A role and a `RAW` schema to load into (Snowflake) |
| CI/CD | A dbt project with real models and tests to run `dbt build` against |
| Power BI | A `PROD` schema whose marts CI has already verified |

Skip a layer, and the one after it has nothing real to stand on — this
is why Chapter 2 comes before Chapter 3, not after.

## Key terms

| Term | Meaning |
|---|---|
| Layer | One piece of the platform with a single clear job and a clear boundary |
| TRANSFORMER role | The Snowflake role dbt runs as — can read RAW, write DEV/PROD |
| ANALYST role | The Snowflake role Power BI (and people) connect as — read-only on PROD |
| Governance control | A deliberate boundary (a role, a test, a gate) that limits what can go wrong and how far |

## Lab

1. Draw (on paper or in a text file) the five-layer diagram from this
   lesson, labeling each layer with its one job.
2. For each layer, write one sentence naming what it depends on from
   the layer above it in the stack.
3. Explain, in your own words, why Power BI connecting to `PROD` only
   — never `RAW`, never `DEV` — is itself a governance decision.

## Check yourself

You're ready for Chapter 2 when you can draw this five-layer
architecture from memory and explain, for each layer, exactly one thing
it depends on from the layer before it.
