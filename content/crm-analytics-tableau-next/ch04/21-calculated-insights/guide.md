# Calculated Insights

By now Data Cloud (now branded Data 360) has ingested your sources, mapped them to the data model, and resolved identities into unified profiles. The next question is the one analysts always end up asking: what should we measure? **Calculated insights** are how Data 360 stores reusable metrics, such as lifetime value, order count, or days since last purchase, so that every team calculates them the same way once, rather than each rebuilding them separately.

## What you'll learn

- What a calculated insight is, and how it differs from a segment or a raw field
- The four ways to create one
- How the SQL option is structured, using measures and dimensions
- Where the finished insight can be used afterward

## A calculated insight is a governed aggregate

A calculated insight is a metric computed over data model objects and stored as its own queryable object. Think of a scheduled aggregate view in T-SQL: a `GROUP BY` query whose results you materialize so everyone reads the same numbers. Two words matter here. **Measures** are the aggregated values (a sum of order totals, a count of cases). **Dimensions** are the attributes you group by (customer, region, month). Together they define the grain of the result.

The reason this feature exists is consistency. If one team defines "lifetime value" with refunds and another without, dashboards disagree and trust erodes. Defining it once, centrally, is a small version of a theme this course returns to in its semantic-layer chapters.

## Four ways to create one

The New Calculated Insight screen offers four options:

- **Create with Builder**: a visual builder where you add nodes such as joins, aggregates, filters, transforms, and arithmetic expressions. Good for analysts who prefer clicking to coding.
- **Create with SQL**: write SQL expressions against mapped objects and fields.
- **Create from a Package**: start from an insight that came with an installed Salesforce package.
- **Create Streaming Insights**: compute metrics across dimensions from real-time data sources, rather than on a batch schedule.

## The SQL option

The SQL editor gives you a field browser on the left (Fields, Insights, and Functions tabs), an expression area, and a Check Syntax button. The expression follows a familiar shape: a `SELECT` of attributes and aggregated measures, a `FROM` a data model object, optional `JOIN` and `WHERE` clauses, and a `GROUP BY` on the dimensions. If you completed the T-SQL course, you can read it immediately. The differences are in the details: objects are referenced by their Data 360 API names, and output columns must follow the platform's naming conventions for measures and dimensions. Confirm the exact rules in the current documentation rather than guessing.

One warning appears right in the editor: a calculated insight can affect data protection and privacy compliance. A metric derived from personal data is still personal-data processing, so involve whoever owns governance when in doubt.

## Where you use the result

A finished insight is stored as a calculated insight object. You can browse it in Data Explorer, use it as a criterion when building segments (the next lesson), and expose it to analytics tools. Tableau Next can pick calculated insight objects as a data source, and CRM Analytics can query them directly, as the lessons ahead show. Because insights are computed on a schedule rather than on every query, dashboards reading them tend to be far cheaper than recomputing from raw objects.

## Key terms

| Term | Meaning |
|---|---|
| Calculated insight | A reusable, stored metric computed from data model objects |
| Measure | An aggregated value, such as a sum or count |
| Dimension | An attribute you group the measure by |
| Streaming insight | A metric computed from real-time sources |

## Recap

A calculated insight is a governed, reusable aggregate. Build it with the builder or SQL, define measures and dimensions deliberately, and reuse it everywhere instead of recomputing definitions in every dashboard.
