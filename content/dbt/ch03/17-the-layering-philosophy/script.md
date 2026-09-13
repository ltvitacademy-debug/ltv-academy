# Script — The Layering Philosophy: Why Three Layers

## Segment 1 (title)

Every layer this chapter added is overhead — a file to write, review, and understand. The bet is that overhead pays for itself once a project has real complexity, and below that size, fewer layers is genuinely the right call.

## Segment 2 (steps: why one big model fails)

Fold staging's renaming, the order-items aggregation, and every join into one file and it runs, and it's even correct the first time. Then a source column gets renamed, and the fix happens inside a giant tangled file — every change now requires understanding everything, because nothing was ever separated.

## Segment 3 (steps: why five layers fails too)

The opposite mistake is adding layers because more structure sounds safer. Five layers for a business with twelve models doesn't multiply clarity — it multiplies the files you open before understanding one number in a dashboard. Narrow the DAG, widen the tables, still applies.

## Segment 4 (steps: the actual test)

Staging's job never disappears. Intermediate exists only when marts would otherwise need it — skipping it on a small project is correct, not incomplete. Marts exists because someone eventually has to query something. The real test: does this model do one clear job the layer above or below it can't do as well?

## Segment 5 (outro)

Next chapter: Testing & Documentation — starting with the four generic tests every dbt project ships with.
