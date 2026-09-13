# Script — schema.yml & Column-Level Documentation

## Segment 1 (title)

Descriptions live in the exact same file as tests, on the exact same column. A future reader gets what this column means and what's guaranteed to be true about it in one place, instead of a wiki for one and a test file for the other.

## Segment 2 (code: real YAML example)

This is dbt Labs' own published example. event_id carries both a description and its data_tests in the same block — unique, not_null, and a one-line description, together.

## Segment 3 (steps: three ways to write a longer description)

A folded block with > collapses line breaks into one paragraph — the default for prose. A literal block with | preserves line breaks, for structure like a list inside the description. Docs blocks reference a separate Markdown file when a description is long enough to be its own document.

## Segment 4 (steps: you don't have to document everything)

Undocumented columns still show up in the generated docs site with whatever dbt can introspect from the warehouse — name and type — just without a human description. The honest move is documenting what actually needs explaining, not writing 'the customer ID' under a column already named customer_id.

## Segment 5 (outro)

Next lesson: Generating and Reading dbt Docs — where every one of these descriptions and tests becomes a real, browsable site.
