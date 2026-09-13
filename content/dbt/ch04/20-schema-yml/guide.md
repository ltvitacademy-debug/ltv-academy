# Lesson 20 — schema.yml & Column-Level Documentation

**Chapter 4 · Testing & Documentation · Lesson 20 of 45**

## What you'll learn

- Why descriptions and tests live in the exact same YAML file, not two
  separate systems
- The real `description:` key syntax for models, sources, and columns
- The three ways to write a longer description, and when to reach for
  each
- Why you don't have to document every single column to get value
  from this

## One file, two jobs

By Lesson 18 you were already writing YAML like this for tests. The
part this lesson adds is that **descriptions live in the exact same
file**, on the exact same column, right next to the test that
validates it:

```yaml
models:
  - name: events
    description: This table contains clickstream events from the marketing website
    columns:
      - name: event_id
        description: This is a unique identifier for the event
        data_tests:
          - unique
          - not_null
      - name: user-id
        quote: true
        description: The user who performed the event
        data_tests:
          - not_null
```

This is dbt Labs' own real published example. Notice `event_id` carries
both a `description:` and its `data_tests:` in the same block — a
future reader gets "what this column means" and "what's guaranteed to
be true about it" in one place, instead of hunting through a wiki for
the description and a separate test file for the guarantee.

## Three ways to write a longer description

A one-line description fits inline. Anything longer has three real
options:

- **`>` (folded block)** — interior line breaks are removed, so it
  reads as one continuous paragraph; Markdown still renders. The
  right default for a normal paragraph of prose.
- **`|` (literal block)** — interior line breaks are *preserved*,
  useful when the description itself needs structure, like a Markdown
  list or headings inside the description.
- **Docs blocks** — for descriptions long enough to be their own
  document, reference a separate Markdown file instead of inlining
  everything into the YAML.

```yaml
models:
  - name: customers
    description: >
      A wide, denormalized mart. Storage is cheap, so this table
      intentionally repeats data that could be normalized elsewhere.
```

## You don't have to document every column

Undocumented columns don't disappear from the generated docs site
(next lesson) — they still show up, with whatever metadata dbt can
introspect directly from the warehouse (name, type), just without a
human-written description. That matters practically: documentation
debt on a sixty-model project is real, and the honest move is
documenting the columns that actually need explaining — a cryptic
abbreviation, a business rule embedded in a boolean flag — rather than
writing "the customer ID" as a description for a column already named
`customer_id`.

## Why this pairing matters

Descriptions and tests answer two different questions that a reader
asks back to back: "what does this mean?" and "what's guaranteed to be
true about it?" Splitting those into separate systems — a wiki for one,
a test file for the other — guarantees they drift apart over time,
because nothing forces them to be updated together. Keeping them in the
same YAML block, on the same column, is what makes it likely a change
to one gets noticed alongside the other.

## Key terms

| Term | Meaning |
|---|---|
| `description:` | The YAML key for documenting a model, source, or column — supports Markdown |
| Folded block (`>`) | Multi-line YAML description where line breaks collapse into one paragraph |
| Literal block (`\|`) | Multi-line YAML description where line breaks are preserved |
| Docs block | A separate Markdown file referenced from schema.yml, for descriptions too long to inline |

## Lab

1. Go back to a model you added tests to in Lesson 18 and add a
   `description:` to the model itself and to each tested column.
2. Pick one column whose meaning genuinely isn't obvious from its name
   and write a real, useful description for it — skip the columns that
   don't need one.
3. Try a `>` description and a `|` description on two different
   models, and note the practical difference once rendered.

## Check yourself

You're ready for Lesson 21 when you can explain why keeping
descriptions and tests in the same YAML block is more than a
convenience — what it actually prevents.
