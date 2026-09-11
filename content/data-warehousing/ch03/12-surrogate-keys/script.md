# Script — Surrogate Keys

## Segment 1 (title)

Every dimension table you've looked at so far has had a surrogate key quietly sitting on it. Let's talk about what that key actually is, and why it's there.

## Segment 2 (code: generating one)

A surrogate key is a system-generated, meaningless identifier — and IDENTITY is the easiest way to generate one in T-SQL. Here, ProductKey auto-increments on every insert, it's the primary key, and its value means nothing outside this one table. ProductCode, right below it, is the natural key — the identifier that actually has business meaning.

## Segment 3 (steps: four benefits)

Why bother, when a natural key already exists? Four real reasons. It consolidates multiple source systems under one clean numbering scheme. It's narrower and faster to join on than a long text key. It's what actually enables Type 2 historical tracking, which we'll get to in Chapter 4. And it insulates your warehouse — if a source system changes its own ID format, your surrogate keys never have to change to match.

## Segment 4 (outro)

We've been treating "surrogate" and "natural" as opposites this whole lesson. Next lesson, we put them side by side and look at exactly where each one belongs.
