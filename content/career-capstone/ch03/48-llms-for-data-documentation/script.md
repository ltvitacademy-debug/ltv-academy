# Script — LLMs for Automated Data Documentation

## Segment 1 (title)

Table and column documentation is necessary, not urgent, and tedious to write from scratch for forty columns — exactly the kind of task that gets postponed forever. It's also one of AI's genuinely strong spots, if you give it the right inputs.

## Segment 2 (code: the prompt)

A useful documentation prompt needs schema and real sample rows together, not just column names alone. Status could mean an order status, a shipment status, a data-quality status — the sample values are what actually disambiguate it.

## Segment 3 (code: where the draft goes wrong)

The draft describes total_amount as the total dollar amount charged for the order — plausible, and wrong for the cancelled row, where total_amount is zero. The column almost certainly means the amount actually charged, not the original order value. The sample rows contained the evidence; the one-sentence draft glossed over it.

## Segment 4 (steps: the review)

Catching this means checking whether the draft holds for every sample row, not just the typical-looking ones, asking whether a teammate could draw the wrong conclusion, and checking with whoever actually owns the table's business meaning.

## Segment 5 (outro)

A subtle documentation error like this looks fine until someone builds a revenue report on top of it. Next up: concrete prompting patterns that make these first drafts more reliable to begin with.
