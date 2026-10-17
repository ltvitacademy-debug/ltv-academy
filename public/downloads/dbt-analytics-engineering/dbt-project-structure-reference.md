# dbt Project Structure & Naming Conventions Reference

From Chapters 2-3. The decisions a new project has to make on day one.

## Folder structure

```
models/
├── staging/
│   ├── stg_orders.sql
│   ├── stg_customers.sql
│   └── schema.yml
├── intermediate/
│   ├── int_orders_enriched.sql
│   └── schema.yml
└── marts/
    ├── fct_orders.sql
    ├── dim_customers.sql
    └── schema.yml
```

## The three layers, and why each exists

| Layer | Purpose | Rule of thumb |
|---|---|---|
| **Staging** | Light cleanup only — renaming, typing, one model per source table | Never join two sources here |
| **Intermediate** | Business logic that needs testing on its own, not yet final | Not queried directly by BI tools |
| **Marts** | The only layer anything downstream is allowed to query | One clear grain per model, documented |

## Naming prefixes

| Prefix | Layer | Example |
|---|---|---|
| `stg_` | Staging | `stg_orders` |
| `int_` | Intermediate | `int_orders_enriched` |
| `fct_` | Marts — fact table | `fct_orders` |
| `dim_` | Marts — dimension table | `dim_customers` |

## Rules worth keeping

- One staging model per source table — never fewer, never combined.
- Intermediate models are never queried directly by a BI tool — only
  marts are.
- A mart's grain (what one row represents) goes in its `schema.yml`
  description, every time, no exceptions.
- `ref()` everything downstream of a source — never hardcode a schema/
  table name once a staging model exists for it.
