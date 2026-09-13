# Lesson 22 — Exposures: Connecting Models to Downstream BI

**Chapter 4 · Testing & Documentation · Lesson 22 of 45**

## What you'll learn

- What an exposure is: a way to tell dbt "a real dashboard depends on
  this model," in code
- The real YAML syntax for declaring one, including `depends_on` and
  `owner`
- What an exposure actually gets you in return — both in the docs site
  and on the command line
- Where exposures show up inside the generated docs site, with real
  screenshots

## The problem exposures solve

Every model in this chapter's marts layer eventually feeds *something*
— a Power BI dashboard, a notebook, someone's ad hoc analysis. Without
exposures, that connection lives only in someone's memory, or in a
dashboard's own connection string, invisible to dbt and to anyone else
reading the project. An **exposure** makes that dependency a real,
version-controlled fact inside the project itself: "this Power BI
dashboard depends on `fct_orders` and `dim_customers`," declared once,
in YAML, right next to everything else.

## Real YAML syntax

```yaml
exposures:
  - name: weekly_jaffle_metrics
    label: Jaffles by the Week
    type: dashboard
    maturity: high
    url: https://bi.tool/dashboards/1
    description: >
      Did someone say "exponential growth"?
    depends_on:
      - ref('fct_orders')
      - ref('dim_customers')
      - source('gsheets', 'goals')
      - metric('count_orders')
    owner:
      name: Callum McData
      email: data@jaffleshop.com
```

This is dbt Labs' own real published example. `name`, `type`
(`dashboard`, `notebook`, `analysis`, `ml`, or `application`), and
`owner` are required. `depends_on` — the part that actually creates
the connection — takes any real `ref()`, `source()`, or `metric()`, the
same functions you've been using inside models all along. Notice an
exposure can depend on a source directly, not just a model: "this
dashboard also reads a Google Sheet" is a fact worth declaring too.

## What you get back for declaring it

Once an exposure exists, it's a first-class citizen on the command
line, selectable exactly like a model:

```bash
dbt run -s +exposure:weekly_jaffle_metrics
dbt test -s +exposure:weekly_jaffle_metrics
```

The `+` means "and everything upstream of it" — so before shipping a
change to `fct_orders`, you can run and test the entire chain that
actually feeds this specific dashboard, not the whole project.

## Where exposures show up in the docs site

Back in Lesson 21's generated docs site, exposures get their own real
estate. dbt Catalog gives every exposure a dedicated section, listed
under the project name:

![The dbt Catalog's dedicated Exposures section, listing each declared exposure in a real project under the project name.](/courses/dbt/ch04/22-exposures/exposures-in-catalog.png)
*Every exposure declared in YAML shows up here — a real, browsable list of "who actually consumes this project."*
Source: [dbt Docs — Exposures](https://docs.getdbt.com/docs/build/exposures)

And an exposure also appears as its own node in the lineage graph
itself, marked with a distinctive orange **EXP** indicator so it reads
differently from a model at a glance:

![An exposure appearing as a node in the dbt Catalog DAG, with an orange 'EXP' indicator distinguishing it from a regular model node.](/courses/dbt/ch04/22-exposures/exposure-in-dag.png)
*The lineage graph now shows exactly where the DAG ends and a real downstream consumer begins.*
Source: [dbt Docs — Exposures](https://docs.getdbt.com/docs/build/exposures)

## Why this closes the loop on the chapter

Testing (Lessons 18–19) makes sure a model's data is trustworthy.
Documentation (Lessons 20–21) makes sure a model's meaning is legible.
Exposures answer the one remaining question neither of those covers:
who's actually depending on this, and would they notice if it broke?
That's the same question a good analytics engineer asks before
changing anything in production — exposures just make the answer a
fact in the project instead of a guess.

## Key terms

| Term | Meaning |
|---|---|
| Exposure | A YAML declaration that a downstream consumer (dashboard, notebook, app) depends on specific dbt resources |
| `depends_on` | The exposure property listing the `ref()`, `source()`, or `metric()` calls it actually relies on |
| `dbt run -s +exposure:name` | Runs everything upstream of a named exposure — the exact chain that feeds it |
| EXP indicator | The orange badge marking an exposure node in the dbt Catalog lineage graph, distinct from a model |

## Lab

1. Pick one Chapter 3 mart you've built and write an exposure for it,
   imagining a real dashboard that would consume it.
2. Fill in `type`, `owner`, and a `depends_on` list referencing that
   mart (and any other model or source a real dashboard might also
   read from).
3. Run `dbt run -s +exposure:your_exposure_name` and confirm it builds
   exactly the upstream chain you expect — nothing more.

## Check yourself

You're ready for Chapter 5 when you can explain, in one sentence, the
one question exposures answer that neither testing nor documentation
covers on their own.
