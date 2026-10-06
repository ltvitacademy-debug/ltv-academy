# Script — Credit Memos for Returns

## Segment 1 (title)

The invoice finally exists, but there's one loose end from chapter three: the twenty damaged units Harborview returned. They were billed on that invoice, and Harborview shouldn't have to pay for goods that arrived damaged. Let's fix that with a credit memo.

## Segment 2 (steps)

Remember, once those twenty units were received and inspected, the RMA line moved to awaiting billing. Because the return references the original sales order, and now the original invoice, Receivables can generate a credit memo tied directly back to that invoice - not a disconnected, manually calculated adjustment.

## Segment 3 (code)

Here's the math. Fifty-five thousand, one hundred dollars divided by four hundred units is one hundred thirty-seven dollars seventy-five cents per unit, net of the discount. Twenty returned units at that same price: two thousand, seven hundred fifty-five dollars. That's the credit memo amount - the same discounted price they were originally billed at.

## Segment 4 (steps)

Because this credit memo references the original invoice directly, it's an applied credit memo - Receivables already knows which invoice it offsets, so the open balance drops right away. That's different from an on-account credit, which just sits available on the account until someone applies it to something.

## Segment 5 (outro)

Harborview's balance drops from fifty-five thousand, one hundred dollars to fifty-two thousand, three hundred forty-five dollars. Chapter four is complete. Up next, chapter five, lesson eighteen: the receivable that's sitting open now, and the cash receipt that will eventually close it.
