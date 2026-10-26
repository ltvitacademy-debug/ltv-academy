# Lesson 10 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 10 of 10**

## What you'll learn

- A recap of the full Thornbury Cycle Supply Co. project, start to finish
- Which real, transferable skills this project actually demonstrated
- Where the Intermediate project picks up, and how it raises the stakes

## What actually happened, start to finish

Nine lessons ago, this project started with a single sentence from the Merchandising Manager:
*"Can you show me how our product categories are doing this quarter? I want one dashboard I
can pull up in the pricing review."* Here's everything that sentence turned into:

1. **Lesson 1** — turned the vague ask into a specific, written requirement.
2. **Lesson 2** — planned the T-SQL query in plain English before writing SQL: five tables, four
   join keys (including two hierarchy hops from product up to category), one filter, one
   grouping.
3. **Lesson 3** — wrote the real query: a join across `SalesOrderDetail`, `SalesOrderHeader`,
   `Production.Product`, `Production.ProductSubcategory`, and `Production.ProductCategory`,
   filtered to the current quarter, grouped by category.
4. **Lesson 4** — connected Power BI to that query as a native query, in Import mode, and
   checked column names, types, and row counts in Power Query.
5. **Lesson 5** — sketched a report layout before building it: two KPI cards, a bar chart, one
   table.
6. **Lesson 6** — wrote three DAX measures: `Total Sales`, `Order Count`, and `Average Order
   Value`.
7. **Lesson 7** — added a `CategoryName` slicer and formatted every measure and title for a
   non-technical reader.
8. **Lesson 8** — published the report to the Power BI Service and shared it directly with the
   stakeholder.
9. **Lesson 9** — practiced presenting it inside the pricing review: headline first, supporting
   detail second, honest answers for anything out of scope.

## The real skills, underneath the tools

None of these lessons were really "about" SQL or Power BI alone — each one used those tools to
practice a transferable skill:

| Lesson(s) | Tool skill | Underlying real skill |
|---|---|---|
| 1 | — | Requirements clarification |
| 2–3 | T-SQL joins across a hierarchy, filtering, grouping | Translating a question into correct, efficient data retrieval |
| 4 | Power Query | Data validation before trusting a number |
| 5–7 | Power BI visuals, DAX, formatting | Designing for a specific reader, not a generic audience |
| 8 | Power BI Service | Delivering work in a form someone else can actually use |
| 9 | — | Communicating results, not just producing them |

A hiring manager — or a real stakeholder — cares about this right-hand column far more than
which menu item you clicked. The T-SQL and Power BI skills are the vehicle; requirements
clarification, data validation, and clear communication are what actually made this project
succeed.

## What this project deliberately left out

This Beginner project was scoped smaller than the full capstone sequence on purpose: no
subcategory-level drill-down, no multi-quarter trend, no pricing recommendations, one
stakeholder instead of many. That wasn't a limitation to apologize for — it was the correct
scope for the actual request, and knowing how to scope down is as real a skill as knowing how
to scope up.

## Where the Intermediate project picks up

The next project in this capstone sequence raises the stakes in the direction this Beginner
project deliberately avoided: more stakeholders, a comparison across time rather than a single
quarter, and a report that needs to hold up under more scrutiny than a few minutes inside a
bigger meeting. The skills from this project don't get replaced — requirements clarification,
correct T-SQL across a real schema, and clear presentation are still the foundation — but now
they get applied to a harder, more ambiguous ask.

## Key terms

| Term | Meaning |
|---|---|
| Transferable skill | A capability (like requirements clarification) that matters independent of which specific tool is used |
| Scope discipline | Deliberately choosing what *not* to build, to match effort to the actual request |

## Lab

Write a short project summary, as if for a resume or portfolio, describing this Beginner
capstone in two or three sentences — focused on the skills demonstrated, not the tool names.

## Check yourself

You're ready to move on when you can list, from memory, all nine lessons' real skill (not just
the tool used), and explain in one sentence what the Intermediate project adds that this one
deliberately left out.
