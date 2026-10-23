# Lesson 9 — Indexes on the Platform

**Chapter 3 · Database & Query Performance · Lesson 9 of 25**

## What you'll learn

- What a database index actually is, and why it speeds up reads
- The real cost of an index: slower writes and extra storage, not a free lunch
- Where indexing lives in ServiceNow — tied to the dictionary, not a hidden database setting
- The practical rule for deciding which fields deserve an index
- Why over-indexing a table is a real mistake, not just a theoretical one

## What an index actually is

Underneath every ServiceNow table sits a real relational database, and that database stores
records the way any database does: as rows, in whatever order they happened to be written. Find
one record by its unique ID, and the database can jump straight to it. Ask instead "give me every
record where `assignment_group` equals Network Ops," and without help, the database has only one
option — look at every single row, check that one field, and keep the ones that match. An index is
a separate structure the database maintains alongside the table, built on one or more specific
fields, that lets it find matching rows directly instead of checking every row one at a time. Think
of it the way a book's index lets you jump straight to a page instead of reading the whole book
looking for a word.

## The cost nobody mentions on the way in

An index is not a free performance upgrade — it's a trade. Every time a record is inserted or
updated, the database doesn't just write the row; it also has to update every index that covers any
of the fields that changed, so the index stays accurate. More indexes on a table means more work on
every single write to that table. Indexes also consume real storage, separate from the table's own
data. Neither cost is dramatic for one or two well-chosen indexes — but it compounds. A table with
ten indexes, all maintained on every insert and update, pays that cost ten times over on every
write, whether or not most of those indexes are ever actually used by a query.

## Where this lives in ServiceNow

This isn't a hidden database-administrator setting out of reach of a ServiceNow admin. Indexing
ties directly back to the table's own Dictionary — the same Dictionary Entries you worked with
earlier in this path when defining a field's type, length, and validation. A field can be
configured as indexed at the dictionary level, and that configuration is exactly what tells the
underlying database to build and maintain that lookup structure for that field. Because it's
dictionary-level, it's table-specific and field-specific: you're not turning indexing "on" for the
whole instance, you're deciding, field by field, table by table, where the read benefit is worth
the write cost.

## The practical rule: index what you actually filter and sort on

The real guidance is narrower than "index anything that seems important," and it connects directly
to work you've already done. Course 2 and Course 3 in this path covered Encoded Queries and filter
conditions — the `field=value^ORfield=value`-style conditions behind every list filter, every
report, and every `GlideRecord` query's `addQuery()` call. A field is worth indexing when it
shows up often in those real conditions: the fields records actually get filtered by, or the
fields results actually get sorted by, especially on a table with a large number of records. A
field nobody filters or sorts on gains nothing from being indexed — it just adds write overhead
with no matching read benefit. This is why "index everything" is a real, common mistake: it looks
cautious, but it quietly taxes every write on that table for indexes that no query is actually
using.

## Key terms

| Term | Meaning |
|---|---|
| Index | A database structure built on specific fields that lets the engine find matching rows directly instead of checking every row |
| Read/write trade-off | Indexes speed up reads (queries) but slow down writes (inserts/updates), since every index must be updated too |
| Dictionary-level indexing | Configuring a field as indexed through the table's Dictionary Entry, not a separate database tool |
| Over-indexing | Adding indexes for fields that are rarely or never used in real filter/sort conditions, paying write cost for no read benefit |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why would indexing a field that
is almost never used in a filter condition or sort order actually make a busy table's performance
worse, not better?
