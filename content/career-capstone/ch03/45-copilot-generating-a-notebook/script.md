# Script — Using Copilot to Generate a Notebook

## Segment 1 (title)

Here's a worked example: describing a transformation in plain language to Copilot's chat pane, and watching what the first draft actually gets wrong. The point isn't that Copilot is unreliable — it's that a first draft is a draft, and reading it matters.

## Segment 2 (code: the prompt and first draft)

The prompt asks for revenue by region, excluding cancelled orders. The generated code reads the file and groups by region and sums revenue — and it runs without error. But it never filters out cancelled orders. The prompt's exclusion clause silently disappeared, and the code still produces a real, wrong number.

## Segment 3 (steps: review checklist)

Catching this means reading the generated code against the actual ask: does every clause in the prompt show up in the code, do column names match the real schema, are nulls handled the way the business rule expects, and did you run it on a small sample to check the actual numbers.

## Segment 4 (code: the fix)

Once the missing filter is caught, the fix is small — filter out cancelled orders before grouping, alias the result column, and now the transformation actually matches the original ask instead of just running successfully.

## Segment 5 (outro)

Plausible and running successfully isn't the same as correct — that's the review habit Lesson 58 turns into a repeatable practice later in this chapter. Next up: the same review habit, applied to a KQL query instead of PySpark.
