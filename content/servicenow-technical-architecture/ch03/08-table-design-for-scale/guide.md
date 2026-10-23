# Lesson 8 — Table Design for Scale

**Chapter 3 · Data Architecture · Lesson 8 of 32**

## What you'll learn

- A one-sentence recap of tables, the dictionary, and field types from course 2 — and why that's not enough at architecture scale
- Why field count and table width have a direct, measurable effect on query performance
- The real architectural decision: extend an existing base table, or create a new, unrelated table
- How to design a table today with ten million records in mind, not just the thousand you're testing against
- Why "it performs fine in the demo" is not evidence a table design is sound

## The one-sentence recap

Course 2 covered the mechanics: every table is built from the dictionary, every field has a type, and you can extend an existing table (like `task`) to inherit its fields instead of starting from nothing. That's the *how*. This lesson is about the *should* — because the same mechanics that work cleanly at a thousand records can become a real production problem at ten million, and nobody notices until the table is already too big to easily fix.

## Field count and table width actually matter

Every field on a table adds a column to its underlying database table. A table with 40 reference fields, 15 of them rarely populated, is still a wider row than a table with 15 purposeful fields — and width isn't free. Course 12 covered how indexes and query plans determine how fast a query runs; what that lesson didn't dwell on is that a wider table means more data the database has to read per row, even for a query that only touches three of those 40 fields, because row storage and I/O don't care which columns your query actually asked for.

This shows up concretely in two ways an architect has to watch for:

- **List views and reports slow down** as more fields get added over the years, especially if those fields are seldom filtered or sorted on but still get dragged into every `SELECT` a view triggers.
- **Index maintenance gets heavier.** Every indexed field is maintenance overhead on every insert and update. A table that accumulated 12 indexes over six years of "just add one more field, just add one more index" requests pays that cost on every single record write, forever — not just once.

None of this is visible in a dev instance with 500 test records. It's only visible in production, years later, which is exactly why it's an architect's problem and not just a developer's.

## Extend an existing table, or build a new one?

Course 2 taught table extension as a mechanic: extend `task` and you inherit `short_description`, `state`, `assignment_group`, and the rest, instead of re-building them. At architecture scale, that same choice carries real, long-term weight in both directions.

**Extend an existing base table when:**
- The new data genuinely *is* a kind of the thing the base table represents (a new catalog task type really is a `task`)
- You want the new table to automatically pick up every future platform capability built against that base table (SLAs, workflows, reporting that already understands `task`)
- You're willing to accept that the base table — and every table extended from it — gets a little wider and a little busier every time you add a field here

**Build a new, unrelated table when:**
- The data doesn't semantically belong under that base table's own meaning, even if the fields happen to look similar
- You don't want this table's growth or its field additions to add any weight to the shared base table's width or query load
- The record volume you're expecting is large enough that you'd rather isolate it from `task`'s and `cmdb_ci`'s own volume rather than add to tables other teams already depend on

There's no universally "correct" answer — it's a genuine tradeoff an architect weighs, and the wrong call is expensive to undo once a dozen reports, business rules, and integrations have been built assuming the current table structure.

## Designing for ten million records, not a thousand

The actual discipline is to ask, at design time: *what does this table look like after eight years of real production use?* A field that seems harmless to add when the table has a thousand records can become the field that forces a painful redesign once the table holds ten million. Concretely:

- Prefer reference fields over long free-text fields where the data is genuinely categorical — a reference field indexes and filters far better at volume than a string field ever will.
- Resist adding a field "just in case it's useful later" — every field is permanent width the table carries for every record, forever, whether or not it ends up used.
- Ask who queries this table and how, before it's built — a table designed around how it'll actually be filtered and reported on ages far better than one designed around what fields seemed natural to include.

## Key terms

| Term | Meaning |
|---|---|
| Table width | How many fields/columns a table carries — more width means more data read per row, even on narrow queries |
| Table extension | Building a new table that inherits an existing base table's fields and behavior (course 2's mechanic, now an architecture decision) |
| Index maintenance overhead | The cost every indexed field adds to every insert/update on a table, not just to reads |
| Design-time volume projection | Designing a table against its expected multi-year record volume, not its current test-data volume |

## Check yourself

A team wants to add 18 new fields to the `task` table to support a new process, rather than creating a new extended table. As the architect reviewing this, what two questions from this lesson would you ask before approving it?
