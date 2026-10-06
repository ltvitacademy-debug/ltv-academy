# Script — Common Template Mistakes

## Segment 1 (title)

So far we've covered how templates are supposed to work. This lesson is about how they actually fail — the small, specific mistakes behind most rejected FBDI rows, well before we reach formal troubleshooting in Chapter 5.

## Segment 2 (steps)

Structural mistakes break the template itself. Inserting, deleting, or reordering columns breaks the mapping to the interface table, silently. Leaving sample rows in place gets them exported as if they were real data. And working in the wrong tab — entering line-level data where header data belongs — produces a well-formed file that's still structurally wrong.

## Segment 3 (steps)

Data-entry mistakes put the wrong value in the right place. Typing a lookup label like "US Dollars" instead of the code USD. A date that converts silently to the wrong date because of regional formatting. A supplier number like zero-zero-four-five-two losing its leading zeros in a numeric cell. Trailing spaces or invisible characters pasted in from another system.

## Segment 4 (steps)

Here's the trap: none of this stops a file from uploading or loading into an interface table. Those steps only check that the file is a valid CSV, not that its business content makes sense. The mistakes above only surface later, during the actual import process — which is why "the upload worked" and "the data loaded" are two very different claims.

## Segment 5 (outro)

Before generating your CSV files, run a quick pass: no columns added or reordered, no sample rows left behind, data on the right tab, codes instead of labels, consistent dates, no stray blanks. Up next, lesson nine: a complete worked example — loading suppliers with FBDI, start to finish.
