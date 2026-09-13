# Lesson 30 — dbt Packages

**Chapter 6 · Jinja & Macros · Lesson 30 of 45**

## What you'll learn

- What a dbt package is: someone else's dbt project — models, macros,
  tests — installed into yours
- Declaring one in `packages.yml` and installing it with `dbt deps`
- The `dbt_packages/` folder the pilot lesson's own screenshot already
  shows in the file explorer
- Why almost nobody writes a `generate_surrogate_key` macro from
  scratch anymore

## A package is someone else's dbt project, installed into yours

Lesson 29 covered writing your own macros. A **package** is the same
idea at project scale: a whole set of macros (and sometimes models,
tests) written by dbt Labs or the community, versioned, and installed
into your project so you don't rewrite common patterns from scratch.
The most-installed package by far is `dbt-labs/dbt_utils` — covered in
full next lesson — but there are packages for everything from date
spines to auditing to codegen.

## Declaring a package

```yaml
# packages.yml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]
```

`packages.yml` sits at the project root, next to `dbt_project.yml`. A
range like `[">=1.1.0", "<2.0.0"]` pins to a major version — accepting
patch and minor updates, but not a breaking major-version bump you
haven't reviewed.

## Installing with `dbt deps`

```bash
dbt deps
```

This downloads every package listed in `packages.yml` into a
`dbt_packages/` folder at the project root — the exact folder you can
already see sitting next to `models/` and `macros/` in the pilot
lesson's dbt Cloud IDE screenshot from Lesson 1. Nothing mysterious
about it: it's just more Jinja and SQL, downloaded from the package's
repository and dropped into your project's file tree so its macros
become callable from your own models.

## Calling a macro from an installed package

Once installed, a package's macros are called with the package name
as a namespace prefix:

```sql
select
    {{ dbt_utils.generate_surrogate_key(['customer_id', 'order_date']) }}
        as order_key,
    customer_id,
    order_date,
    order_total
from {{ ref('stg_orders') }}
```

Same calling convention as your own macros from Lesson 29 — the only
difference is the `dbt_utils.` prefix telling dbt which package's
macro to use.

## Why this matters: don't rebuild what's already solved

A macro that generates a consistent surrogate key from multiple
columns, or safely casts a string to a date across warehouses, is a
problem thousands of dbt projects have already solved — correctly,
with edge cases handled, and tested against real production use. A
package installs that solved version instead of you writing your own
(likely subtly buggier) copy from scratch. This is the same reasoning
behind reaching for a well-maintained library in any other language
instead of reimplementing `left-pad`.

## Key terms

| Term | Meaning |
|---|---|
| Package | A versioned, installable dbt project (macros, models, tests) written by dbt Labs or the community |
| `packages.yml` | Declares which packages a project depends on, and at what version range |
| `dbt deps` | Downloads declared packages into `dbt_packages/` |
| `dbt_packages/` | The folder holding installed packages — visible in the project's file explorer |

## Lab

1. Add `packages.yml` declaring `dbt-labs/dbt_utils` at a pinned
   version range.
2. Run `dbt deps` and confirm `dbt_packages/dbt_utils` now exists in
   your project.
3. Call one `dbt_utils` macro (e.g. `generate_surrogate_key`) from a
   model and run `dbt compile` to confirm it renders real SQL.

## Check yourself

You're ready for Lesson 31 when you can explain what `dbt deps` does
and doesn't do — it downloads packages, but a package still has to be
declared in `packages.yml` first, and its macros still need the
package-name prefix when you call them.
