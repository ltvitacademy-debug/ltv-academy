# Lesson 16 — Why This Source Needs a Python Ingestion Script

**Chapter 5 · Python Ingestion Layer · Lesson 16 of 26**

## What you'll learn

- The real new source this platform needs to ingest, and why dbt
  can't do it alone
- Why "one-off CSV, no native connector" is a genuinely common real
  scenario, not a contrived one
- The two Python tools this job actually needs — `pandas` and
  `snowflake-connector-python` — introduced honestly as new ground
- How this fits into the five-layer architecture from Lesson 2

## The new source: a marketing platform's CSV export

Jaffle Shop's marketing team now runs occasional email campaigns
through a third-party platform. That platform can export a CSV of
campaign sends and opens, but it has no native Snowflake connector,
no API this platform has already built against, and no guarantee the
export lands in exactly the same shape every time. Someone — or
something — has to get that file into Snowflake's `RAW` schema, on a
schedule, reliably.

## Why dbt can't do this part

dbt's entire job starts from data that is **already inside Snowflake**
— every model in Chapters 2 and 3 reads from a `source()` or a
`ref()`, never from a file sitting on a laptop or in a folder
somewhere. Getting a brand-new external file into Snowflake in the
first place is a different job, upstream of anything dbt does. That's
the real gap this chapter closes.

## Two new, real tools — introduced honestly

This path's own Python course doesn't cover
`snowflake-connector-python` specifically — it's a genuinely new
library for this capstone, and it gets introduced here the same way
any new real tool shows up mid-career: by name, with real
documentation, used for exactly the job it's built for.

- **`pandas`** — already familiar from this path's data work — reads
  the CSV and cleans it: `pd.read_csv()`, `.dropna()`, basic type
  fixes, before anything touches Snowflake.
- **`snowflake-connector-python`** — a real, standard, well-documented
  Python package from Snowflake itself, used here specifically to open
  a connection and load the cleaned data: `import
  snowflake.connector`, `snowflake.connector.connect(...)`, and a
  cursor's `.execute()` calls.

Lesson 17 writes the real script combining both.

## Where this fits in the five-layer architecture

Lesson 2 planned five layers: Snowflake, dbt, Python ingestion, CI/CD,
Power BI. This chapter is Layer 3 — sitting between Snowflake (which
already has the role and `RAW` schema this script will load into) and
dbt (which will eventually build staging models on top of whatever
this script lands, the same way it already does for the three
jaffle_shop tables).

## Why "one-off, no connector" is realistic, not contrived

Real companies accumulate exactly this kind of source constantly: a
vendor's CSV export, a partner's manual file drop, a legacy system
with no modern API. A production-grade platform has to have an answer
for this case specifically, because it comes up far more often than a
textbook's list of clean, API-connected sources would suggest.

## Key terms

| Term | Meaning |
|---|---|
| One-off CSV source | A file-based source with no native Snowflake connector or existing API integration |
| `pandas` | Used here to read and clean the CSV before any Snowflake call |
| `snowflake-connector-python` | Snowflake's own real Python library for connecting and loading data programmatically |
| Layer 3 | This chapter's place in the five-layer architecture planned in Lesson 2 |

## Lab

1. Describe, in your own words, why a CSV export with no native
   connector is a realistic source for a real company to have.
2. List the two Python libraries this chapter will use and the one
   job each is responsible for.
3. Explain in one sentence why dbt itself cannot be the tool that gets
   this file into Snowflake in the first place.

## Check yourself

You're ready for Lesson 17 when you can explain why this source needs
a Python script specifically, and you can name which of the two
libraries handles cleaning versus loading.
